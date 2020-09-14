import { db } from "../setup";

/** Deletes an entry
 *
 * CurrentUser is the email adress of the user
 */
const deleteEntry = async (
    currentUser: string,
    entry: string
  ) => {
    const resp = await db
      .collection("users")
      .doc(currentUser)
      .collection("entries")
      .doc(entry)
      .delete()
      .catch((e) => {
        console.log(e);
        return null;
      });
    if (resp === null) {
      return null;
    }
    return true;
  };

  export {deleteEntry}
