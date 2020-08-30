import React from "react";
import Profile from "./profile";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../Firebase/firestore/submitEdit";
import { useIsSignedIn } from "../Firebase/linkAuth/useIsSignedIn";
import { useSyncUserProfile } from "../Firebase/firestore/useUserProfile";
import {
  setProfileFirstName,
  setProfileLastName,
  setProfileGraduationYear,
  selectProfileState,
} from "../Redux/profileScreenSlice";

const ProfileController: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const currentUser = useIsSignedIn();
  useSyncUserProfile();
  const ProfileState = useSelector(selectProfileState);
  return (
    <Profile
      profileData={ProfileState}
      updateFirstName={(firstName: string) => {
        dispatch(setProfileFirstName(firstName));
      }}
      updateLastName={(lastName: string) => {
        dispatch(setProfileLastName(lastName));
      }}
      updateGradYear={(gradYear: string) => {
        dispatch(setProfileGraduationYear(gradYear));
      }}
      updateCallback={(data) => {
        if (currentUser && typeof currentUser === "string") {
          updateUserProfile(
            data.firstName,
            data.lastName,
            data.graduationYear,
            currentUser
          );
        }
      }}
    />
  );
};

export { ProfileController };
