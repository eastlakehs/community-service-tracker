import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fireStoreDocumentSnapshot,
  fireStoreUserData,
} from "../Firebase/firestore/firestoreData.type";

const initialState: fireStoreUserData = {};

export const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    setDocument: (state, action: PayloadAction<fireStoreDocumentSnapshot>) => {
      Object.assign(state[action.payload.key], action.payload.data);
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setDocument, deleteDocument } = userDataSlice.actions;

export const selectUserData = (state: { userData: fireStoreUserData }) =>
  state.userData;

export default userDataSlice.reducer;
