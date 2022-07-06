import { dbType, fieldValueType } from "./dbType.js";

/**
 * Uses a visitor pattern to traverse an object representing the
 * firestore DB state
 */
export const traverseDbObject = (
  obj: dbType,
  visitor: (path: string[], documentData: fieldValueType) => void,
  path: string[] = []
) => {
  for (const [collectionName, collectionValue] of Object.entries(obj)) {
    path.push(collectionName);
    for (const [documentName, documentValue] of Object.entries(
      collectionValue
    )) {
      path.push(documentName);
      visitor([...path], documentValue.fieldValues);
      traverseDbObject(documentValue.subCollections, visitor, path);
      path.pop();
    }
    path.pop();
  }
};
