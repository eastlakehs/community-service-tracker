import { db } from "../setup";
import { userProfileData } from "./firestoreData.type";

export interface profileAndEmail extends userProfileData {
  email: string;
}
// TODO convert to single query rather than 300 seperate queries
export const getListOfCurrentUsers = async () => {
  // ~600 read ops. 2 read for each user
  const documents = await db.collection("users").get();
  /**
   * The forEach method has a custom implentation by Firebase SDK
   * Not sure why they they did this and we can't use map as it's not exposed
   * This is why we first push to array and then use map
   */
  const users: string[] = [];
  documents.forEach((user) => {
    users.push(user.id);
  });
  const userArrays = users.map(async (user) => {
    const result = await db
      .collection("users")
      .doc(user)
      .collection("profile")
      .doc("info")
      .get();
    const profileInfo = result.data() as userProfileData;
    const withEmail: profileAndEmail = {
      ...profileInfo,
      email: user,
    };
    return withEmail;
  });
  return await Promise.all(userArrays);
};
