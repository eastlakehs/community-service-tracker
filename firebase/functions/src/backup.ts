import * as functions from "firebase-functions";
import * as firestore from "@google-cloud/firestore";
const client = new firestore.v1.FirestoreAdminClient();

const bucket = "gs://community-ser.appspot.com/firestore-backup";

/** Backs up database every 24 hours to cloud storage bucket */
export const dailyFirestoreBackup = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    const projectId = (process.env.GCP_PROJECT ||
      process.env.GCLOUD_PROJECT) as string;
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
      console.log(`Operation Name: ${response["name"]}`);
    } catch (err) {
      console.error(err);
      throw new Error("Export operation failed");
    }
  });
