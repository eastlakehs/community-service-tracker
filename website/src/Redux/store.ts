import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import editScreenSlice from "./editScreenSlice";
import profileDataSlice from "./profileScreenSlice";

export default configureStore({
  reducer: {
    userData: userDataSlice,
    editScreen: editScreenSlice,
    profileData: profileDataSlice,
  },
});
