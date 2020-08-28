import React from "react";
import CSTable from "./table";

import { useSelector } from "react-redux";
import { selectUserData } from "../../Redux/userDataSlice";

const TableController: React.FunctionComponent<{}> = () => {
  const data = useSelector(selectUserData);
  console.log(data);
  return <CSTable data={data} />;
};

export default TableController;
