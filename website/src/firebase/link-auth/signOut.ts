import { firebase } from "../setup";

/** Promps a user to sign out and then signs them out. Returns error code string or null if successfull */
const signOut = async () => {
  const confirmed = window.confirm("Are you sure that you want to sign out?");
  if (confirmed) {
    const result = await firebase
      .auth()
      .signOut()
      .catch((error: firebase.auth.Error) => {
        return error.message;
      });
    if (result) return result;
    return null;
  }
  return null;
};

export { signOut };
