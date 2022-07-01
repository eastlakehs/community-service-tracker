import React, { useEffect } from "react";
import CSTable from "./table";

import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../../redux/userDataSlice";
import { selectSignedInState } from "../../redux/signedInSlice";
import { useNavigate } from "react-router-dom";

import { setCurrentEdit } from "../../redux/editScreenSlice";
import { deleteEntry } from "../../firebase/firestore/deleteEntry";
import { isAdmin } from "../../constants/isAdmin";
const TableController: React.FunctionComponent<{}> = () => {
  const data = useSelector(selectUserData);
  const user = useSelector(selectSignedInState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signedInstate = useSelector(selectSignedInState);

  useEffect(() => {
    // only redirect if not viewing another user
    if (signedInstate.admin && isAdmin(signedInstate.userEmail)) {
      navigate("/admin");
    }
  });

  /** Navigate to the table view when edit button is pressed */
  const navigateToEdit = (currentID: string) => {
    dispatch(
      setCurrentEdit({
        currentData: data.data[currentID],
        currentKey: currentID,
        editing: true,
      })
    );
    navigate("/edit");
  };

  const handleDelete = (currentID: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmed) {
      deleteEntry(user.userEmail, currentID);
    }
  };

  // console.log(data);
  return (
    <CSTable
      data={data}
      handleEditClick={navigateToEdit}
      handleDelete={handleDelete}
    />
  );
};

export default TableController;
