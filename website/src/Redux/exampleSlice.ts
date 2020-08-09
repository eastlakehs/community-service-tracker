import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState: string = "test";

export const exampleSlice = createSlice({
  name: "example",
  initialState: initialState,
  reducers: {
    example1: (state) => {
      state = "foo";
    },
    example2: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
});

export const { example1, example2 } = exampleSlice.actions;

export const selectOnceState = (state: { example: string }) => state.example;

export default exampleSlice.reducer;
