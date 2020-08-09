import firebase from "firebase";

let firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  databaseURL: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore();

export { db };
