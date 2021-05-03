import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  firestoreDocumentType,
  blankDocument,
} from "../firebase/firestore/firestoreData.type";

interface editScreenInitialStateType {
  currentData: firestoreDocumentType;
  currentKey: string | null;
  editing: boolean | null; // if entry is a new event or an edit
}

const editScreenInitialState: editScreenInitialStateType = {
  currentData: { ...blankDocument },
  currentKey: null,
  editing: null,
};

export const editScreenSlice = createSlice({
  name: "editSlice",
  initialState: editScreenInitialState,
  reducers: {
    setCurrentEdit: (
      state,
      action: PayloadAction<{
        currentData: firestoreDocumentType;
        currentKey: string;
        editing: boolean;
      }>
    ) => {
      state.currentKey = action.payload.currentKey;
      state.editing = action.payload.editing;
      // set state.currentData to something not null so that Object.assign can work
      state.currentData = { ...blankDocument };
      Object.assign(state.currentData, action.payload.currentData);
    },
    setName: (state, action: PayloadAction<string>) => {
      state.currentData.Name = action.payload;
    },
    setContactName: (state, action: PayloadAction<string>) => {
      state.currentData.contactName = action.payload;
    },
    setContactPhone: (state, action: PayloadAction<string>) => {
      state.currentData.contactPhone = action.payload;
    },
    setNHS: (state, action: PayloadAction<"Yes" | "No">) => {
      state.currentData.NHS = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.currentData.Date = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.currentData.Description = action.payload;
    },
    setHours: (state, action: PayloadAction<string>) => {
      state.currentData.Hours = action.payload;
    },
    setKeyClub: (state, action: PayloadAction<"Yes" | "No">) => {
      state.currentData.KeyClub = action.payload;
    },
    setNHSOfficer: (state, action: PayloadAction<string>) => {
      state.currentData.NHSofficer = action.payload;
    },
    clearCurrentEdit: (state) => {
      state.currentData = { ...blankDocument };
      state.currentKey = null;
      state.editing = null;
    },
  },
});

export const {
  setCurrentEdit,
  clearCurrentEdit,
  setName,
  setNHS,
  setDate,
  setDescription,
  setHours,
  setKeyClub,
  setNHSOfficer,
  setContactName,
  setContactPhone,
} = editScreenSlice.actions;

export const selectEditScreenState = (state: {
  editScreen: editScreenInitialStateType;
}) => state.editScreen;

export default editScreenSlice.reducer;
