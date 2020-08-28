import { db, admin } from "./setup";

/** Cleanly frees resources used by firebase */
const firebaseExit = () => {
  admin.apps.forEach((app) => {
    if (app)
      app
        .delete()
        .then(() => {
          console.log("done");
        })
        .catch((e) => {
          console.log(e);
        });
  });
};

const backupDB = async () => {
  try {
    /** Will store json of the entire firstore state. Stores everything except subcollections */
    let backupJson: any = {};
    const collections = await db.listCollections();
    /** Promises for resolving data fetching for each document. Allows fast async backup */
    const promises: Promise<any>[] = [];
    collections.forEach((collection) => {
      const getDocumentsPromise = new Promise(async (resolve, reject) => {
        const collectionData = await collection.get().catch((e) => {
          reject(e);
        });
        if (typeof collectionData === "undefined") {
          reject(undefined);
        }
        collectionData.forEach((document) => {
          /** Create fields for collection and data if needed */
          if (!backupJson[collection.id]) {
            backupJson[collection.id] = {};
          }
          if (!backupJson[collection.id][document.id]) {
            backupJson[collection.id][document.id] = {};
          }
          /** Deep copy data into collection/document.id */
          Object.assign(
            backupJson[collection.id][document.id],
            document.data()
          );
        });
        /** Data fetched sucessfully and imported */
        resolve(true);
      });
      promises.push(getDocumentsPromise);
    });
    await Promise.all(promises).catch((e) => {
      console.log(e);
      return null;
    });
    firebaseExit();
    return JSON.stringify(backupJson);
  } catch (e) {
    console.log(e);
    return false;
  }
};

/*
const main = async () => {
  const result = await backupDB();
  if (result) {
    console.log(result);
  }
};

main();
*/

export { backupDB, firebaseExit };
