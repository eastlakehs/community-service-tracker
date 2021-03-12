import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ISignedInState = {
  signedIn: boolean | null;
  userEmail: string;
};

const initialState: ISignedInState = {
  signedIn: null,
  userEmail: "",
};

export const signedInSlice = createSlice({
  name: "editSlice",
  initialState: initialState,
  reducers: {
    setSignInState: (state, action: PayloadAction<ISignedInState>) => {
      state.signedIn = action.payload.signedIn;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { setSignInState } = signedInSlice.actions;

export const selectSignedInState = (state: { signedInState: ISignedInState }) =>
  state.signedInState;

export default signedInSlice.reducer;
