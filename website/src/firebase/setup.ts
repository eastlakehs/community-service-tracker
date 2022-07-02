import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const isDev = () => window.location.hostname === "localhost";

/** Configuration for firebase project. The apiKey is NOT private information. */
const firebaseConfig = isDev()
  ? {
      apiKey: "this-does-not-matter-but-it-crashes-without-it",
      projectId: "mock-firebase-backend",
    }
  : {
      apiKey: "AIzaSyClj1HmSNOVdGBsTVBceJvWU-YvobG9Oqc",
      authDomain: "community-ser.firebaseapp.com",
      databaseURL: "https://community-ser.firebaseio.com",
      projectId: "community-ser",
      storageBucket: "community-ser.appspot.com",
      messagingSenderId: "77950684711",
      appId: "1:77950684711:web:997100f34877ec7ae74802",
    };

/** Documentation at https://firebase.google.com/docs/auth/web/passing-state-in-email-actions#passing_statecontinue_url_in_email_actions */
const actionCodeSettings: firebase.auth.ActionCodeSettings = {
  // The redirect URL
  url: "https://ehs-service.org",
  handleCodeInApp: true,
  dynamicLinkDomain: undefined,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore();

/** Re-write backend calls to local emulator on dev environment */
if (isDev()) {
  db.useEmulator("localhost", 8080);
  firebase.auth().useEmulator("http://localhost:9099");
}

export { db, firebase, actionCodeSettings };
