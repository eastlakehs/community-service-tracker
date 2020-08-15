import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tableDataType } from "../Components/Table/table.types";

interface initialStateType {
  data: tableDataType;
  entriesPerPage: number;
  currEntry: number;
  endEntry: number;
}

const testData: tableDataType = {
  header: ["Name", "Description", "Hour", "Date"],
  data: [
    {
      Name: "Test Name",
      Description:
        "Test description is really long here and will cause the componenet to overflow and create really bad stuff",
      Hours: 34,
      Date: "3/2/12334",
    },
    {
      Name: "Test Name",
      Description: "Test Description",
      Hours: 34,
      Date: "3/2/12334",
    },
    {
      Name: "Test Name",
      Description: "Test Description",
      Hours: 34,
      Date: "3/2/12334",
    },
    {
      Name: "Test Name",
      Description: "Test Description",
      Hours: 34,
      Date: "3/2/12334",
    },
  ],
};

let initialState: initialStateType = {
  data: testData,
  entriesPerPage: 2,
  currEntry: 0,
  endEntry: 1,
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState: initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ data: tableDataType }>) => {
      Object.assign(state.data, action.payload.data);
    },
    setCurrEntry: (state, action: PayloadAction<number>) => {
      state.currEntry = action.payload;
    },
    setEndEntry: (state, action: PayloadAction<number>) => {
      state.endEntry = action.payload;
    },
  },
});

export const { setData, setCurrEntry, setEndEntry } = tableDataSlice.actions;

export const selectTableState = (state: { tableData: initialStateType }) =>
  state.tableData;

export default tableDataSlice.reducer;
