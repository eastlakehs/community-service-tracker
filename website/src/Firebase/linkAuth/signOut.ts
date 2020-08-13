import { firebase } from "../setup";

const signOut = async () => {
  const result = await firebase
    .auth()
    .signOut()
    .catch((error: firebase.auth.Error) => {
      return error.message;
    });
  if (result) return result;
  return null;
};

export { signOut };
