import React from "react";
import CSTable from "./table";

import { useSelector } from "react-redux";
import { selectTableState } from "../../Redux/tableDataSlice";

const TableController: React.FunctionComponent<{}> = () => {
  const data = useSelector(selectTableState).data;
  const curEntry = useSelector(selectTableState).currEntry;
  const endEntry = useSelector(selectTableState).endEntry;

  return <CSTable data={data} curEntry={curEntry} endEntry={endEntry} />;
};

export default TableController;
