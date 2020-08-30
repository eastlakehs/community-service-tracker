import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SignedInState = {
  signedIn: boolean | null;
  userEmail: string;
};

const initialState: SignedInState = {
  signedIn: null,
  userEmail: "",
};

export const signedInSlice = createSlice({
  name: "editSlice",
  initialState: initialState,
  reducers: {
    setSignInSate: (state, action: PayloadAction<SignedInState>) => {
      state.signedIn = action.payload.signedIn;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { setSignInSate } = signedInSlice.actions;

export const selectSignedInState = (state: { signedInState: SignedInState }) =>
  state.signedInState;

export default signedInSlice.reducer;
