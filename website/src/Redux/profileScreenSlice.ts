import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  userProfileData,
} from "../Firebase/firestore/firestoreData.type";

const profileSliceInitialState: userProfileData = {
  firstName: "",
  lastName: "",
  graduationYear: "",
};

export const profileScreenSlice = createSlice({
  name: "profileSlice",
  initialState: profileSliceInitialState,
  reducers: {
    setCurrentProfile: (state, action: PayloadAction<userProfileData>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.graduationYear = action.payload.graduationYear;
    },
    setProfileFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setProfileLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setProfileGraduationYear: (state, action: PayloadAction<string>) => {
      state.graduationYear = action.payload;
    },
  },
});

export const {
  setCurrentProfile,
  setProfileFirstName,
  setProfileLastName,
  setProfileGraduationYear,
} = profileScreenSlice.actions;

export const selectProfileState = (state: { profileData: userProfileData }) =>
  state.profileData;

export default profileScreenSlice.reducer;
