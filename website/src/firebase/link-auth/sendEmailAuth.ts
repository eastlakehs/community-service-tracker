import { actionCodeSettings, firebase } from "../setup";

const sendEmailAuth = async (email: string) => {
  const result = await firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .catch((e) => {
      console.log(e);
      return null;
    });
  console.log(result);
  if (result === null) return null;
  // The link was successfully sent - store email.
  window.localStorage.setItem("emailForSignIn", email);
  return true;
};

export default sendEmailAuth;
