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
  // batch writes allow us to do the writes atomically
  const batch = db.batch();
  const userRef = db.collection("users").doc(currentUser);
  const infoRef = userRef.collection("profile").doc("info");
  /**
   * this is a workaround for an oversight in the web JS SDK
   * the user document must have some kind of data attached to it
   * Overwise, queries to get a list of documents in a collection return empty (this is needed for the admin view)
   * We fill the document with some useless data to make the queries return correctly
   */
  batch.set(userRef, { EXISTS: true });
  batch.set(infoRef, profileData);
  const resp = await batch.commit().catch((_e) => null);
  return resp === null ? null : true;
};

export { submitEdit, submitNewEntry, updateUserProfile };
