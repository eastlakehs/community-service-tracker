import { Firestore } from "firebase-admin/firestore";
import { dbType, fieldValueType } from "./dbType.js";

/**
 * Crawls the live firestore DB and export it a local object
 * representing the DB state.
 *
 * Assumes that the firestore state is currently
 * not being modified for the duration of the export.
 *
 * For whatever reason, the web/client firestore sdk
 * does not support listing collections so we have to
 * use the admin sdk here.
 */
export const exportFromFirestore = async (
  firestore: Firestore,
  path: string[] = [],
  exportObj: dbType = {}
): Promise<dbType> => {
  let collections = !path.length
    ? await firestore.listCollections()
    : await firestore.doc(path.join("/")).listCollections();
  for (const collection of collections) {
    path.push(collection.id);
    for (const document of await collection.listDocuments()) {
      path.push(document.id);
      const docData = (await document.get()).data();
      exportObj[collection.id] ||= {};
      exportObj[collection.id][document.id] = {
        fieldValues: docData as fieldValueType,
        subCollections: {},
      };
      await exportFromFirestore(
        firestore,
        path,
        exportObj[collection.id][document.id].subCollections
      );
      path.pop();
    }
    path.pop();
  }
  return exportObj;
};
