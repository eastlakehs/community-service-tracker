import { firebase } from "../setup";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setSignInState, ISignedInState } from "../../Redux/signedInSlice";
import signInwithLink from "./signInWithLink";
import { isAdmin } from "../../Constants/isAdmin";

/** A hook for determining if a user is signed in or not. In addition, syncs sign in state in redux state
 * so pages dont have to wait to get auth state on each route change.
 *
 */
const useIsSignedIn = () => {
  const dispatch = useDispatch();
  const [localSignedInState, setLocalSignedInState] = useState<ISignedInState>({
    signedIn: null,
    userEmail: "",
    admin: false,
  });
  useEffect(() => {
    let unsubscribe: firebase.Unsubscribe = () => {};
    // Log in a user if window contains log in code
    signInwithLink().then((user) => {
      // set auth state emmediately if window comtains auth link then attach authChange listener
      if (user && user.user && user.user.email) {
        const stateToSet = {
          signedIn: true,
          userEmail: user.user.email,
          admin: isAdmin(user.user.email),
        };
        dispatch(setSignInState(stateToSet));
        setLocalSignedInState(stateToSet);
      }
      // attach listener
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user && user.email) {
          const stateToSet = {
            signedIn: true,
            userEmail: user.email.toLowerCase(),
            admin: isAdmin(user.email.toLowerCase()),
          };
          dispatch(setSignInState(stateToSet));
          setLocalSignedInState(stateToSet);
        } else {
          const stateToSet = {
            signedIn: false,
            userEmail: "",
            admin: false,
          };
          console.log("fired");
          dispatch(setSignInState(stateToSet));
          setLocalSignedInState(stateToSet);
        }
      });
    });
    // detach the listener
    return unsubscribe;
  }, [dispatch]);
  return localSignedInState;
};

export { useIsSignedIn };
export default useIsSignedIn;
