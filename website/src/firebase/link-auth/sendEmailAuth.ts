import { actionCodeSettings, firebase } from "../setup";

const sendEmailAuth = async (email: string) => {
  // stub auth in development
  if (window.location.hostname === "localhost") {
    return new Promise<boolean>((resolve) => {
      // wait 100ms before signing in to simulate network authentication
      setTimeout(async () => {
        // create mock account
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            email,
            "random-test-password-dsalkijflskja"
          )
          // sign in to mock account if already created
          .catch(async (e) => {
            if (e.code === "auth/email-already-in-use") {
              await firebase
                .auth()
                .signInWithEmailAndPassword(
                  email,
                  "random-test-password-dsalkijflskja"
                );
              resolve(true);
            }
          });
        resolve(true);
      }, 100);
    });
  } else {
    // use actual auth in prod
    const result = await firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .catch((e) => {
        console.log(e);
        return null;
      });
    if (result === null) return null;
    // The link was successfully sent - store email.
    window.localStorage.setItem("emailForSignIn", email);
    return true;
  }
};

export default sendEmailAuth;
