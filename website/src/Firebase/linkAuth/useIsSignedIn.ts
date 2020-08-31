import { firebase } from "../setup";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setSignInSate } from "../../Redux/signedInSlice";
import signInwithLink from "./signInWithLink";
import { FirebaseError } from "firebase";

/** A hook for determining if a user is signed in or not. In addition, syncs sign in state in redux state
 * so pages dont have to wait to get auth state on each route change.
 *
 */
const useIsSignedIn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe: firebase.Unsubscribe = () => {};
    // Log in a user if window contains log in code
    signInwithLink().then((user) => {
      // set auth state emmediately if window comtains auth link then attach authChange listener
      if (user && user.user && user.user.email) {
        dispatch(
          setSignInSate({
            signedIn: true,
            userEmail: user.user.email,
          })
        );
      }
      // attach listener
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user && user.email) {
          dispatch(
            setSignInSate({
              signedIn: true,
              userEmail: user.email.toLowerCase(),
            })
          );
        } else {
          dispatch(
            setSignInSate({
              signedIn: false,
              userEmail: "",
            })
          );
        }
      });
    });
    // detach the listener
    return unsubscribe;
  });
};

export { useIsSignedIn };
export default useIsSignedIn;
