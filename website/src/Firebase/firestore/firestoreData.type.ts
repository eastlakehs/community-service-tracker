/** Holds the data of a firestore document */
export interface firestoreDocumentType {
  activityName: string;
  allowToCountForKeyclub: string;
  contactInfo: string;
  contactPerson: string;
  date: string;
  description: string;
  graduationYear: string;
  hours: string;
  keyclub: "Yes" | "No";
  name: string;
  timestamp: string;
  verify: "Yes" | "No";
}

/** Holds both the data and the key value of a firestore Document.  */
export interface fireStoreDocumentSnapshot {
  data: firestoreDocumentType;
  key: string;
}

/** Holds the entirety of a users firestore data */
export interface fireStoreUserData {
  [key: string]: firestoreDocumentType;
}
