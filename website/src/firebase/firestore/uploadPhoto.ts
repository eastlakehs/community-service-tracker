import { storage } from "../setup";

export const uploadPhoto = async (
  file: File,
  currentUser: string,
  base: string
): Promise<string | void> => {
  console.log(currentUser);
  try {
    const ref = storage.ref(base).child(currentUser).child(file.name);

    const res = await ref.getDownloadURL().catch((e) => {
      return null;
    });
    if (res) {
      // file already exists
      return res;
    }

    const task = storage
      .ref(base)
      .child(currentUser)
      .child(file.name)
      .put(file);
    const upload = await task;
    const url = await upload.ref.getDownloadURL();
    return url;
  } catch (e) {
    console.log(e);
  }
};
