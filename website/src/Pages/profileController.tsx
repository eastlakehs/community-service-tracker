import React, { useState } from "react";
import Profile from "../Components/Profile/profile";
import Helmet from "../Components/Header/helmet";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../Firebase/firestore/submitEdit";
import { useIsSignedIn } from "../Firebase/linkAuth/useIsSignedIn";
import {
  setProfileFirstName,
  setProfileLastName,
  setProfileGraduationYear,
  selectProfileState,
} from "../Redux/profileScreenSlice";
import { toast, ToastOptions } from "react-toastify";

// Easy toast creation generation at https://fkhadra.github.io/react-toastify/introduction/

const ToastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

const ProfileController: React.FC<{}> = () => {
  const [waitingForSubmit, setWaitingForSubmit] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useIsSignedIn();
  const ProfileState = useSelector(selectProfileState);
  return (
    <>
      <Helmet
        title="Profile"
        description="Page for editing and viewing your profile."
      />

      <Profile
        waitingForSubmit={waitingForSubmit}
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
        updateCallback={async (data) => {
          setWaitingForSubmit(true);
          if (currentUser && typeof currentUser === "string") {
            const resp = await updateUserProfile(
              data.firstName,
              data.lastName,
              data.graduationYear,
              currentUser
            );
            setWaitingForSubmit(false);
            if (resp) {
              toast.success("Updated Profile", ToastConfig);
            } else {
              toast.error("Updated Profile", ToastConfig);
            }
          } else if (!currentUser) {
            toast.error("You are not signed in", ToastConfig);
          }
        }}
      />
    </>
  );
};

export { ProfileController };
