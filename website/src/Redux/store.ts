import { configureStore } from "@reduxjs/toolkit";
import tableDataSlice from "./tableDataSlice";

export default configureStore({
  reducer: {
    tableData: tableDataSlice,
  },
});
