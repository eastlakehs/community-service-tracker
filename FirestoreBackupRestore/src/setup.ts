import * as admin from "firebase-admin";
const serviceAccount = require("./community-ser-firebase-adminsdk-2i7wg-1fa9d77466.json");

/** Initialize the App */
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://community-ser.firebaseio.com",
  });
}
const db = admin.firestore();

export { db, admin };
