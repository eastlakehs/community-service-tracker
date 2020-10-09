import { db, admin } from "./setup";

const recurseClone = async (
  collectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >,
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

const cloneDbAsJson = async () => {
  const allCollections = await db.listCollections();
  const exportedData: any = {};
  await Promise.all(
    allCollections.map(async (collection) => {
      exportedData[collection.id] = {};
      return recurseClone(collection, exportedData[collection.id]);
    })
  );
  return exportedData;
};

export { cloneDbAsJson };
