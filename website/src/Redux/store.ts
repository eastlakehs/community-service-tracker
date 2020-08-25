import { configureStore } from "@reduxjs/toolkit";
import tableDataSlice from "./tableDataSlice";
import userDataSlice from "./userDataSlice";

export default configureStore({
  reducer: {
    tableData: tableDataSlice,
    userData: userDataSlice,
  },
});
