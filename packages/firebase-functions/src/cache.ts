import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.initializeApp().firestore();
import stringify from "csv-stringify/lib/sync";

import { runTimeOpts } from "./runsWith";
import { parseToCSVTotals } from "../../../report-generation/src/Object2SummaryCSV";
import { cloneDbAsJson } from "../../../report-generation/src/Firestore2Object";
import { profileCacheBuilder } from "../../../website/src/cache/profileCache";

/**
 * Builds awards summaries and saves to db
 * Saves cache of user list to db under one doc
 */
export const dailyCacheBuilders = functions
  .runWith(runTimeOpts.dailyCacheBuilders)
  .pubsub.schedule("every 24 hours")
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
