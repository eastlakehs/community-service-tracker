import * as functions from "firebase-functions";
import firestore from "@google-cloud/firestore";
const client = new firestore.v1.FirestoreAdminClient();

import { runTimeOpts } from "./runsWith";

const bucket = "gs://backups.ehs-service.org";
const projectId = "community-ser";

/** Backs up database every 24 hours to cloud storage bucket */
export const dailyFirestoreBackup = functions
  .runWith(runTimeOpts.dailyFirestoreBackup)
  .pubsub.schedule("every 24 hours")
  .onRun(async () => {
    const databaseName = client.databasePath(projectId, "(default)");
    try {
      const responses = await client.exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [],
      });
      const response = responses[0];
      console.log(`Operation Name: ${response["name"]} completed backup`);
    } catch (err) {
      console.error(err);
      throw new Error("Export operation failed");
    }
  });
