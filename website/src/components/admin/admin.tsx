import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminUsersTable from "../table/adminUsersTable";
import { useDispatch } from "react-redux";
import { setSignInState } from "../../redux/signedInSlice";
import { clearAllData } from "../../redux/userDataSlice";
import {
  getListOfCurrentUsers,
  profileAndEmail,
} from "../../firebase/firestore/getListOfAllUsers";

import { useSelector } from "react-redux";
import { selectSignedInState } from "../../redux/signedInSlice";

const ErrorText: React.FunctionComponent<{ text: string }> = ({ text }) => (
  <text className="mb-auto text-center text-white py-2 lg:py-3 text-base sm:text-xl lg:text-2xl xl:text-3xl">
    {text}
  </text>
);

/// TODO: error fallback for fetching list of users
// TODO: fix redux bug
// TODO: error fallback for unauthed user
export const Admin: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signedInState = useSelector(selectSignedInState);
  const [listOfAllCurrentUsers, setListOfAllCurrentUsers] = useState<
    profileAndEmail[] | null | undefined
  >(undefined);
  useEffect(() => {
    if (signedInState.admin) {
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
        admin: signedInState.admin, // persist admin if was admin
      })
    );
    dispatch(clearAllData());
    // navigate to user page
    history.push("/table");
  };

  if (!signedInState.admin) {
    return (
      <ErrorText text="You do not appear to be signed in as an admin user at the moment." />
    );
  }
  if (listOfAllCurrentUsers === undefined) {
    return <ErrorText text="Fetching user list..." />;
  } else if (listOfAllCurrentUsers === null) {
    return (
      <ErrorText
        text="Failed network request. Please try again later or report the problem if
        it persists."
      />
    );
  } else {
    return (
      <div className="mb-auto">
        <AdminUsersTable data={listOfAllCurrentUsers} handleView={handleView} />
      </div>
    );
  }
};
