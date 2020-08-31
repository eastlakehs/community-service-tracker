import { db } from "../setup";
import { firestoreDocumentType, userProfileData } from "./firestoreData.type";

/** Updates a student entry in firebase (using a document key and data) */
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

/** Creates a new user entry in firebase (automatic key generation)
 *
 * CurrentUser is the email adress of the user
 */
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

/** Updates a users profile with data in firebase
 *
 * CurrentUser is the email adress of the user
 */
const updateUserProfile = async (
  firstName: string,
  lastName: string,
  graduationYear: string,
  currentUser: string
) => {
  const profileData: userProfileData = {
    firstName: firstName,
    lastName: lastName,
    graduationYear: graduationYear,
  };
  const resp = await db
    .collection("users")
    .doc(currentUser)
    .collection("profile")
    .doc("info")
    .set(profileData)
    .catch((e) => {
      console.log(e);
      return null;
    });
  if (resp === null) {
    return resp;
  }
  return true;
};

export { submitEdit, submitNewEntry, updateUserProfile };
