import React from "react";
import CSTable from "./table";

import { useSelector } from "react-redux";
import { selectTableState } from "../../Redux/tableDataSlice";

const TableController: React.FunctionComponent<{}> = () => {
  const data = useSelector(selectTableState).data;
  return <CSTable data={data} />;
};

export default TableController;
