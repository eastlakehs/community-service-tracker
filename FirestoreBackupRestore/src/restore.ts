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

/** Restores Firestore database from an object. Restores all fields except subcollections (which we don't use)
 *
 *  Note: the restoreDB function does not clear firestore before pushing changes.
 *
 *  Data should be recurively deleted using the firestore cli: firebase firestore:delete --all-collections --project [projectID]
 *
 *  For very large datasets, the firestore cli for some reason does not delete all data in one go. You may have to run the function multiple times.
 *
 */
const restoreDB = async (restoreObj: { [key: string]: any }) => {
  try {
    const setDocumentPromises: Promise<any>[] = [];
    Object.keys(restoreObj).forEach((collectionID) => {
      Object.keys(restoreObj[collectionID]).forEach((documentID) => {
        const setDocument = new Promise(async (resolve, reject) => {
          await db
            .collection(collectionID)
            .doc(documentID)
            .set(restoreObj[collectionID][documentID])
            .catch((e) => {
              reject(e);
            });
          resolve(documentID);
        });
        setDocumentPromises.push(setDocument);
      });
    });
    await Promise.all(setDocumentPromises).catch((e) => {
      console.log(e);
      return null;
    });
  } catch (e) {
    console.log(e);
    return null;
  }
  return true;
};

/*
const main = async () => {
  const result = await restoreDB({
    root1: {
      sub1: {
        bar5: "bar6",
        bar3: "var4",
        bar1: "bar2",
      },
      sub2: {
        bar101: "bar120",
      },
    },
    root3: {
      sub3: {
        test: "test",
      },
      sub4: {
        test20: "test20",
      },
    },
  });
  if (result) {
    console.log("written sucessfully");
  } else {
    console.log("failed write");
  }
};

main();
*/

export { restoreDB, firebaseExit };
