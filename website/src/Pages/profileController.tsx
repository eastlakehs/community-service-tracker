import React from "react";
import Profile from "./profile";
import Helmet from "../Components/Header/helmet";

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

import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Easy toast creation generation at https://fkhadra.github.io/react-toastify/introduction/

const ToastConfig: ToastOptions = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ProfileController: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const currentUser = useIsSignedIn();
  useSyncUserProfile();
  const ProfileState = useSelector(selectProfileState);
  return (
    <>
      <Helmet
        title="Profile"
        description="Page for editing and viewing your profile."
      />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        updateCallback={async (data) => {
          if (currentUser && typeof currentUser === "string") {
            const resp = await updateUserProfile(
              data.firstName,
              data.lastName,
              data.graduationYear,
              currentUser
            );
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
