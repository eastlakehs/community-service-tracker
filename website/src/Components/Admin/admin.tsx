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
import { isAdmin } from "../../Constants/isAdmin";

const ErrorText: React.FunctionComponent<{ text: string }> = ({ text }) => (
  <text className="mb-auto text-center text-white py-2 lg:py-3 text-base sm:text-xl lg:text-2xl xl:text-3xl">
    {text}
  </text>
);

/// TODO: error fallback for fetching list of users
// TODO: fix redux bug
// TODO: error fallback for unauthed user
export const Admin: React.FunctionComponent<{}> = ({}) => {
  const dispatch = useDispatch();
  const signedInState = useSelector(selectSignedInState);
  const [listOfAllCurrentUsers, setListOfAllCurrentUsers] = useState<
    profileAndEmail[] | null | undefined
  >(undefined);
  useEffect(() => {
    if (isAdmin(signedInState.userEmail)) {
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

  if (!isAdmin(signedInState.userEmail)) {
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
