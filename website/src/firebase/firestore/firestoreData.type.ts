/** Holds the data of a firestore document */
export interface firestoreDocumentType {
  Name: string;
  Description: string;
  Hours: string;
  Date: string;
  KeyClub: "Yes" | "No";
  NHS: "Yes" | "No";
  NHSofficer: string;
  contactName: string;
  contactPhone: string;
  notes: string;
  pictures: string[];
}

const blankDocument: firestoreDocumentType = {
  Name: "",
  Description: "",
  Hours: "",
  Date: "",
  KeyClub: "No",
  NHS: "No",
  NHSofficer: "",
  contactName: "",
  contactPhone: "",
  notes: "",
  pictures: []
};

export interface userProfileData {
  firstName: string;
  lastName: string;
  graduationYear: string;
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

export { blankDocument };
