import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import editScreenSlice from "./editScreenSlice";
import profileDataSlice from "./profileScreenSlice";
import signedInSlice from "./signedInSlice";
import isAdminSlice from "./isAdminSlice";

export default configureStore({
  reducer: {
    userData: userDataSlice,
    editScreen: editScreenSlice,
    profileData: profileDataSlice,
    signedInState: signedInSlice,
    isAdminState: isAdminSlice,
  },
});
