import React, { useState } from "react";
import Profile from "../components/profile/profile";
import Helmet from "../components/header/helmet";
import InfoPage from "../components/info/infoPage";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../firebase/firestore/submitEdit";
import {
  setProfileFirstName,
  setProfileLastName,
  setProfileGraduationYear,
  selectProfileState,
} from "../redux/profileScreenSlice";
import { toast, ToastOptions } from "react-toastify";
import { selectSignedInState } from "../redux/signedInSlice";

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
  const signedInstate = useSelector(selectSignedInState);
  const ProfileState = useSelector(selectProfileState);

  if (!signedInstate.signedIn) {
    return (
      <>
        <Helmet
          title="Edit Page"
          description="Page for editing and creating new and created volunteer hour entries."
        />
        <div className="mb-auto">
          <InfoPage
            title="You Are Not Signed In!"
            message="Click here to sign in"
            link="/login"
          />
        </div>
      </>
    );
  }
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
          if (
            signedInstate.userEmail &&
            typeof signedInstate.userEmail === "string"
          ) {
            const resp = await updateUserProfile(
              data.firstName,
              data.lastName,
              data.graduationYear,
              signedInstate.userEmail
            );
            setWaitingForSubmit(false);
            if (resp) {
              toast.success("Updated Profile", ToastConfig);
            } else {
              toast.error("Updated Profile", ToastConfig);
            }
          } else if (!signedInstate.signedIn) {
            toast.error("You are not signed in", ToastConfig);
          }
        }}
      />
    </>
  );
};

export { ProfileController };
