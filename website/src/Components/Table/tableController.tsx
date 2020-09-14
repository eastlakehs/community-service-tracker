import React from "react";
import CSTable from "./table";

import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../../Redux/userDataSlice";
import { useHistory } from "react-router-dom";

import { setCurrentEdit } from "../../Redux/editScreenSlice";

const TableController: React.FunctionComponent<{}> = () => {
  const data = useSelector(selectUserData);
  const dispatch = useDispatch();
  const history = useHistory();

  /** Navigate to the table view when edit button is pressed */
  const navigateToEdit = (currentID: string) => {
    dispatch(
      setCurrentEdit({
        currentData: data.data[currentID],
        currentKey: currentID,
        editing: true,
      })
    );
    history.push("/edit");
  };

  const handleDelete = (currentID: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this entry?");
  }

  // console.log(data);
  return <CSTable data={data} handleEditClick={navigateToEdit} handleDelete={handleDelete}/>;
};

export default TableController;
