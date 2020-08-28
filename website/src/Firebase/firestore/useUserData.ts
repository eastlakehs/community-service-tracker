import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firestoreDocumentType } from "./firestoreData.type";
import { useIsSignedIn } from "../linkAuth/useIsSignedIn";
import { db } from "../setup";

import { setDocument, deleteDocument } from "../../Redux/userDataSlice";

/** Handles updating the redux store with the data of the current signed in user */
const useSyncUserData = () => {
  const isSignedIn = useIsSignedIn();
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe: null | (() => void) = null;
    if (isSignedIn) {
      unsubscribe = db.collection("once").onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          const DocumentData = change.doc.data() as firestoreDocumentType;
          if (change.type === "added") {
            console.log("added");
            dispatch(
              setDocument({
                data: DocumentData,
                key: change.doc.id,
              })
            );
          }
          if (change.type === "modified") {
            console.log("modified");
            dispatch(
              setDocument({
                data: DocumentData,
                key: change.doc.id,
              })
            );
          }
          if (change.type === "removed") {
            console.log("removed");
            dispatch(deleteDocument(change.doc.id));
          }
        });
      });
    }
    if (unsubscribe) {
      return unsubscribe;
    }
  }, [isSignedIn, dispatch]);
};
export { useSyncUserData };
