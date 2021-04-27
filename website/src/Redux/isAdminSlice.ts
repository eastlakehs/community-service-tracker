import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AdminState = {
  admin: boolean,
};

const initialState: AdminState = {
  admin: false,
};

export const isAdminSlice = createSlice({
  name: "isAdminSlice",
  initialState: initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<AdminState>) => {
      state.admin = action.payload.admin;
    },
  },
});

export const { setIsAdmin } = isAdminSlice.actions;

export const selectIsAdminState = (state: { isAdminState: AdminState }) =>
  state.isAdminState;

export default isAdminSlice.reducer;
