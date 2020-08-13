import { firebase } from "../setup";

const signInWithLink = async () => {
  // Confirm the link is a sign-in with email link.
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt("Please provide your email for confirmation");
    }
    return await firebase
      .auth()
      .signInWithEmailLink(email!, window.location.href)
      .catch((e) => {
        return null;
      });
  }
  return null;
};

export default signInWithLink;
