import { db } from "../setup";
import { firestoreDocumentType } from "./firestoreData.type";

const submitEdit = async (
  data: firestoreDocumentType,
  docID: string,
  currentUser: string
) => {
  const resp = await db
    .collection("users")
    .doc(currentUser)
    .collection("entries")
    .doc(docID)
    .set(data)
    .catch((e) => {
      console.log(e);
      return null;
    });
  if (resp === null) {
    return null;
  }
  return true;
};

const submitNewEntry = async (
  data: firestoreDocumentType,
  currentUser: string
) => {
  const resp = await db
    .collection("users")
    .doc(currentUser)
    .collection("entries")
    .add(data)
    .catch((e) => {
      console.log(e);
      return null;
    });
  if (resp === null) {
    return null;
  }
  return true;
};

export { submitEdit, submitNewEntry };
