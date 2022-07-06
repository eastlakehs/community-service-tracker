import { Firestore, doc, setDoc } from "firebase/firestore";
import { dbType } from "./dbType.js";

/**
 * Takes an object representing the firestore DB state
 * and loads it to firestore.
 *
 * Assumes that the starting firestore state is completely empty.
 */
export const importToFirestore = async (
  obj: dbType,
  firestore: Firestore,
  path: string[] = []
) => {
  for (const [collectionName, collectionValue] of Object.entries(obj)) {
    path.push(collectionName);
    for (const [documentName, documentValue] of Object.entries(
      collectionValue
    )) {
      path.push(documentName);
      await setDoc(doc(firestore, path.join("/")), documentValue);
      await importToFirestore(documentValue.subCollections, firestore, path);
      path.pop();
    }
    path.pop();
  }
};
