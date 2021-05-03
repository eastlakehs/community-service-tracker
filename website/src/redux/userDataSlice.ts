import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fireStoreDocumentSnapshot,
  fireStoreUserData,
  blankDocument,
} from "../firebase/firestore/firestoreData.type";

export interface initialStateType {
  header: ["Name", "Description", "Hour", "Date"];
  data: fireStoreUserData;
}

const initialState: initialStateType = {
  header: ["Name", "Description", "Hour", "Date"],
  data: {},
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    clearAllData: () => initialState,
    setDocument: (state, action: PayloadAction<fireStoreDocumentSnapshot>) => {
      // Creates the state.data[action.payload.key] field so that Object.assign can work
      state.data[action.payload.key] = { ...blankDocument };
      Object.assign(state.data[action.payload.key], action.payload.data);
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
  },
});

export const {
  setDocument,
  deleteDocument,
  clearAllData,
} = userDataSlice.actions;

export const selectUserData = (state: { userData: initialStateType }) =>
  state.userData;

export default userDataSlice.reducer;
