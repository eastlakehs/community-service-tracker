import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import editScreenSlice from "./editScreenSlice";

export default configureStore({
  reducer: {
    userData: userDataSlice,
    editScreen: editScreenSlice,
  },
});
