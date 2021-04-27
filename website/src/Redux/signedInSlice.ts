import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ISignedInState = {
  signedIn: boolean | null;
  userEmail: string;
  admin: boolean;
};

const initialState: ISignedInState = {
  signedIn: null,
  userEmail: "",
  admin: false,
};

export const signedInSlice = createSlice({
  name: "signedInSlice",
  initialState: initialState,
  reducers: {
    setSignInState: (state, action: PayloadAction<ISignedInState>) => {
      state.signedIn = action.payload.signedIn;
      state.userEmail = action.payload.userEmail;
      state.admin = action.payload.admin;
    },
  },
});

export const { setSignInState } = signedInSlice.actions;

export const selectSignedInState = (state: { signedInState: ISignedInState }) =>
  state.signedInState;

export default signedInSlice.reducer;
