import { db } from "../setup";
import { userProfileData } from "./firestoreData.type";

import {
  deserializeProfileCache,
  IProfileCache,
} from "../../cache/profileCache";

export interface profileAndEmail extends userProfileData {
  email: string;
}
/**
 * Returns list of all user profile data
 * Reads from 24 hour daily built cache and incurres only 1 read op
 */
export const getListOfCurrentUsers = async () => {
  const document = await db
    .collection("cache")
    .doc("profileData")
    .get()
    .catch((_e: any) => null);
  if (!document) return null;
  const data = document.data() as IProfileCache;
  return deserializeProfileCache(data);
};
