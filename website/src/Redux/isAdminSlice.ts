import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AdminState = {
  admin: boolean,
};

const initialState: AdminState = {
  admin: false,
};

export const isAdminSlice = createSlice({
  name: "isAdmin",
  initialState: initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<AdminState>) => {
      state.admin = action.payload.admin;
    },
  },
});

export const { setIsAdmin } = isAdminSlice.actions;

export const selectIsAdminState = (state: { adminState: AdminState }) =>
  state.adminState;

export default isAdminSlice.reducer;
