import { firebase } from "../setup";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setSignInSate } from "../../Redux/signedInSlice";

/** A hook for determining if a user is signed in or not. In addition, syncs sign in state in redux state
 * so pages dont have to wait to get auth state on each route change.
 *
 * null : awaiting to determin auth state
 *
 * false: not signed in
 *
 * string: email adress of current signed in user
 */
const useIsSignedIn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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
    return unsubscribe;
  });
};

export { useIsSignedIn };
export default useIsSignedIn;
