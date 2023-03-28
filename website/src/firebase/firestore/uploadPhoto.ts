import { storage } from "../setup";

export const uploadPhoto = async (file: File, currentUser: string, base: string): Promise<string | void> => {
    console.log(currentUser);
    try {
        const task = storage.ref(base).child(currentUser).child(file.name).put(file)
        const upload = await task; 
        const url = await upload.ref.getDownloadURL()
    }
    catch(e) {
        console.log(e)
    }
}