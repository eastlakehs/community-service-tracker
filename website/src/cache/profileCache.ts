import { ICacheBuilder } from "./cacheBuilder";
import { profileAndEmail } from "../firebase/firestore/getListOfAllUsers";

/** Builds a profile cache with emails as keys and profile info as data */
export type IProfileCache = Record<string, Omit<profileAndEmail, "email">>;

export const profileCacheBuilder: ICacheBuilder<IProfileCache> = (database) => {
  const profileCache: IProfileCache = {};
  for (const [userEmail, userDocumentData] of Object.entries(database.users)) {
    const profileData = userDocumentData.profile?.info._data;
    profileData && (profileCache[userEmail] = profileData);
  }
  return profileCache;
};
/** Converts profile cache into the format currently used by the admin component */
export const deserializeProfileCache = (profileCache: IProfileCache) => {
  const profileData: profileAndEmail[] = [];
  for (const [key, value] of Object.entries(profileCache)) {
    profileData.push({
      email: key,
      ...value,
    });
  }
  return profileData;
};
