import {runWith} from "firebase-functions";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { stringify } from "csv-stringify/browser/esm/sync";

import { runTimeOpts } from "./runsWith.js";
import { parseToCSVTotals } from "../../../report-generation/src/Object2SummaryCSV.js";
import { cloneDbAsJson } from "../../../report-generation/src/Firestore2Object.js";
import { profileCacheBuilder } from "../../../website/src/cache/profileCache.js";

/**
 * Builds awards summaries and saves to db
 * Saves cache of user list to db under one doc
 */
export const dailyCacheBuilders =
    runWith(runTimeOpts.dailyCacheBuilders)
  .pubsub.schedule("every 24 hours")
  .onRun(async (context: any) => {
      const db = getFirestore();

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
      lastUpdated: FieldValue.serverTimestamp(),
    });
    // save profile cache to db
    await db.collection("cache").doc("profileData").set(userProfileCache);
    console.log("Saved Report Successfully");
  });
