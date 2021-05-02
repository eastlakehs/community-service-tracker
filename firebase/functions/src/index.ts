const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();
const bucket = "gs://community-ser.appspot.com";

import { parseToCSVTotals } from "../../../ReportGeneration/src/Object2SummaryCSV";
import { cloneDbAsJson } from "../../../ReportGeneration/src/Firestore2Object";
import { profileCacheBuilder } from "../../../website/src/Cache/profileCache";
import stringify = require("csv-stringify/lib/sync");
import admin from "firebase-admin";
const db = admin.initializeApp().firestore();

/** Backs up database every 24 hours to cloud storage bucket */
exports.scheduledFirestoreExport = functions.pubsub
  .schedule("every 24 hours")
  .onRun((context: any) => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, "(default)");

    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [],
      })
      .then((responses: any) => {
        const response = responses[0];
        console.log(`Operation Name: ${response["name"]}`);
        return;
      })
      .catch((err: any) => {
        console.error(err);
        throw new Error("Export operation failed");
      });
  });

/** Saves current hour summary report to Firestore
 *  Also save the cache for user profile info
 */
exports.saveSummariesToFirestore = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context: any) => {
    // clone the DB
    const dbObject = await cloneDbAsJson(db);
    // build cache for user profile info
    const userProfileCache = profileCacheBuilder(dbObject);
    // parse DB to arrays with csv data
    const csvDataSummary = parseToCSVTotals(dbObject, false);
    const csvDataAwardsList = parseToCSVTotals(dbObject, true);
    // convert arrays to csv string
    const outputSummary = stringify(csvDataSummary);
    const outputAwardsList = stringify(csvDataAwardsList);
    // save csv string to db
    await db.collection("reports").doc("latest").set({
      hourSummary: outputSummary,
      awardsList: outputAwardsList,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    });
    // save profile cache to db
    await db.collection("cache").doc("profileData").set(userProfileCache);
    console.log("Saved Report Successfully");
  });
