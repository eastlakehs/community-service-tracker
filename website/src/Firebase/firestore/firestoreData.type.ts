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
  contactInfo: string;
}

const blankDocument: firestoreDocumentType = {
  Name: "",
  Description: "",
  Hours: "",
  Date: JSON.stringify({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }),
  KeyClub: "No",
  NHS: "No",
  NHSofficer: "",
  contactName: "",
  contactPhone: "",
  contactInfo: ""
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
