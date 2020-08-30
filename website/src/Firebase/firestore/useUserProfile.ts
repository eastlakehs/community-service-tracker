import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firestoreDocumentType } from "./firestoreData.type";
import { useIsSignedIn } from "../linkAuth/useIsSignedIn";
import { db } from "../setup";
import {
  selectProfileState,
  setCurrentProfile,
} from "../../Redux/profileScreenSlice";
import { userProfileData } from "./firestoreData.type";

/** Handles updating the redux store with the data of the current signed in user */
const useSyncUserProfile = () => {
  const isSignedIn = useIsSignedIn();
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe: null | (() => void) = null;
    if (isSignedIn && typeof isSignedIn === "string") {
      unsubscribe = db
        .collection("users")
        .doc(isSignedIn)
        .collection("profile")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            const DocumentData = change.doc.data() as userProfileData;
            if (change.type === "added" && change.doc.id === "info") {
              console.log("added profile");
              dispatch(setCurrentProfile(DocumentData));
            }
            if (change.type === "modified" && change.doc.id === "info") {
              console.log("modified profile");
              dispatch(setCurrentProfile(DocumentData));
            }
          });
        });
    }
    if (unsubscribe) {
      return unsubscribe;
    }
  }, [isSignedIn, dispatch]);
};
export { useSyncUserProfile };
