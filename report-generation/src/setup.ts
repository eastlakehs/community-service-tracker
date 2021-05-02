import * as admin from "firebase-admin";
const serviceAccount = require("./community-ser-firebase-adminsdk-8h8w0-ea45baaa4e.json");

/** Initialize the App */
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://community-ser.firebaseio.com",
  });
}
const db = admin.firestore();

export { db, admin };
