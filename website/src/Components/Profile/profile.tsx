import React, { useState } from "react";
import { StringField, FormSubmitButton } from "../Entry/entry";
import Helmet from "../Header/helmet";

import { userProfileData } from "../../Firebase/firestore/firestoreData.type";

const Profile: React.FunctionComponent<{
  profileData: userProfileData;
  updateFirstName: (name: string) => void;
  updateLastName: (name: string) => void;
  updateGradYear: (name: string) => void;
  updateCallback: (data: userProfileData) => void;
  waitingForSubmit: boolean;
}> = ({
  profileData,
  updateFirstName,
  updateGradYear,
  updateLastName,
  updateCallback,
  waitingForSubmit,
}) => {
  return (
    <>
      <Helmet
        title="Profile"
        description="Page for editing and viewing your profile."
      />
      <div className="mb-auto">
        <form className="w-full max-w-lg container mx-auto px-4 sm:px-8 items-center">
          <StringField
            name="First Name"
            placeholder="John"
            value={profileData.firstName}
            setValue={updateFirstName}
          />
          <StringField
            name="Last Name"
            placeholder="Smith"
            value={profileData.lastName}
            setValue={updateLastName}
          />
          <StringField
            name="Graduation Year"
            placeholder="2022"
            value={profileData.graduationYear}
            setValue={updateGradYear}
          />
          <FormSubmitButton
            hidden={!waitingForSubmit}
            buttonText={"Save Profile"}
            onSubmit={() => {
              updateCallback(profileData);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default Profile;
