import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsSignedIn } from "../linkAuth/useIsSignedIn";
import { db } from "../setup";
import { setCurrentProfile } from "../../Redux/profileScreenSlice";
import { userProfileData } from "./firestoreData.type";
import { selectSignedInState } from "../../Redux/signedInSlice";

/** Handles updating the redux store with the data of the current signed in user */
const useSyncUserProfile = () => {
  const signedInstate = useSelector(selectSignedInState);
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe: null | (() => void) = null;
    if (signedInstate.signedIn) {
      unsubscribe = db
        .collection("users")
        .doc(signedInstate.userEmail)
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
  }, [signedInstate, dispatch]);
};
export { useSyncUserProfile };
