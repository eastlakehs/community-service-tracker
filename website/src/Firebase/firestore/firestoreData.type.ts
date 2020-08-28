/** Holds the data of a firestore document */
export interface firestoreDocumentType {
  Name: string;
  Description: string;
  Hours: string;
  Date: string;
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

export interface tableDataType {
  header: ["Name", "Description", "Hour", "Date"];
  data: {
    Name: string;
    Description: string;
    Hours: number;
    Date: string;
  }[];
}
