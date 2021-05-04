import { dataJsonType } from "./data";

/** Function which accepts a collection reference and reference to the crawl location in an object.
 *  Find all documents of current collection, saves their data to crawl point, and recurses
 *  on iteself for any further collections with new crawl points.
 *
 *  Returns a promise pending on the completion of a crawl from a current collection.
 */
const recurseClone = async (
  collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  currentDataRef: any
) => {
  const documents = await collectionRef.listDocuments();
  return Promise.all(
    documents.map(async (document) => {
      // saves the fields of the current documnet at the current crawl point
      const saveCurrentDocPromise = document.get().then((data) => {
        if (!currentDataRef[document.id]) {
          currentDataRef[document.id] = {};
        }
        if (!currentDataRef[document.id]["_data"]) {
          currentDataRef[document.id]["_data"] = {};
        }
        Object.assign(currentDataRef[document.id]["_data"], data.data());
      });

      // recurses and continues to crawl
      const newCollections = await document.listCollections();

      // keep crawling
      await Promise.all(
        newCollections.map(async (newCollection) => {
          if (!currentDataRef[document.id]) {
            currentDataRef[document.id] = {};
          }
          if (!currentDataRef[document.id][newCollection.id]) {
            currentDataRef[document.id][newCollection.id] = {};
          }
          return recurseClone(
            newCollection,
            currentDataRef[document.id][newCollection.id]
          );
        })
      );
      return saveCurrentDocPromise;
    })
  );
};

/** Traverse all collections and save Firestore data from there using recurseClone function.
 *  Returns entire Firestore database as a single object.
 *
 *  See data.ts for the structure of the resulting object for our database.
 *  In short, keys represent collection or document IDs which can contain further child keys of collections or docuemnts.
 *  The key _data is special because it signals the data field of a document.
 *  As long the keyword _data is not used for naming documents or collections, there will no collisions.
 */
const cloneDbAsJson = async (db: FirebaseFirestore.Firestore) => {
  const allCollections = await db.listCollections();
  const exportedData: any = {};
  await Promise.all(
    allCollections.map(async (collection) => {
      exportedData[collection.id] = {};
      return recurseClone(collection, exportedData[collection.id]);
    })
  );
  return exportedData as dataJsonType;
};

export { cloneDbAsJson };
