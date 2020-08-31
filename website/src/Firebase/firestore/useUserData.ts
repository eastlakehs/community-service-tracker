import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestoreDocumentType } from "./firestoreData.type";
import { db } from "../setup";
import { setDocument, deleteDocument } from "../../Redux/userDataSlice";
import { selectSignedInState } from "../../Redux/signedInSlice";

/** Handles updating the redux store with the data of the current signed in user */
const useSyncUserData = () => {
  const signedInstate = useSelector(selectSignedInState);
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe: null | (() => void) = null;
    if (signedInstate.signedIn) {
      unsubscribe = db
        .collection("users")
        .doc(signedInstate.userEmail)
        .collection("entries")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            const DocumentData = change.doc.data() as firestoreDocumentType;
            if (change.type === "added") {
              console.log("added");
              //  console.log(change.doc.data());
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
  }, [signedInstate, dispatch]);
};
export { useSyncUserData };
