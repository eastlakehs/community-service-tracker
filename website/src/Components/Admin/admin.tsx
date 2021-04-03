import React, { useEffect, useState } from "react";
import AdminUsersTable from "../Table/adminUsersTable";
import { useDispatch } from "react-redux";
import { setSignInState } from "../../Redux/signedInSlice";
import {
  getListOfCurrentUsers,
  profileAndEmail,
} from "../../Firebase/firestore/getListOfAllUsers";

import { useSelector } from "react-redux";
import { selectSignedInState } from "../../Redux/signedInSlice";

/// TODO: error fallback for fetching list of users
// TODO: fix redux bug
// TODO: error fallback for unauthed user
export const Admin: React.FunctionComponent<{}> = ({}) => {
  const dispatch = useDispatch();
  const signedInState = useSelector(selectSignedInState);
  const [listOfAllCurrentUsers, setListOfAllCurrentUsers] = useState<
    profileAndEmail[]
  >([]);
  useEffect(() => {
    // Async is weird inside of useEffect
    // Easier to just chain .thens
    if (signedInState.signedIn) {
      getListOfCurrentUsers().then((list) => {
        setListOfAllCurrentUsers(list);
      });
    }
  }, [signedInState]);

  /**
   * Once a student has been selected, we shouild navigate as if they were a regular student
   */
  const handleView = (userId: string) => {
    // pretend that we are another user
    // admit accounts have permissions for any read/write
    dispatch(
      setSignInState({
        signedIn: true,
        userEmail: userId,
      })
    );
    // navigate to user page
  };

  return (
    <div className="mb-auto">
      <AdminUsersTable data={listOfAllCurrentUsers} handleView={handleView} />
    </div>
  );
};
