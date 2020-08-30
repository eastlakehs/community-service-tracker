import React, {useState} from "react";
import { StringField, FormSubmitButton } from "../Entry/entry";
import Helmet from "../Header/helmet";

import { userProfileData } from "../../Firebase/firestore/firestoreData.type";
import { VALIDATE_free_form, VALIDATE_graduation } from "../Validation/validation";
import { profile } from "console";

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
  const [shouldShowError, setShouldShowError] = useState(false);

  const ValidateProfilePage = (): boolean => {
    const is_first_name_correct = VALIDATE_free_form(profileData?.firstName)
    const is_last_name_correct = VALIDATE_free_form(profileData?.lastName)
    const is_graduation_year_correct = VALIDATE_graduation(profileData?.graduationYear)

    return is_first_name_correct.validate && is_last_name_correct.validate && is_graduation_year_correct.validate
  }


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
            shouldShowError={shouldShowError}
            error={!VALIDATE_free_form(profileData.firstName).validate}
            errorMessage={VALIDATE_free_form(profileData.firstName).message}
            
          />
          <StringField
            name="Last Name"
            placeholder="Smith"
            value={profileData.lastName}
            setValue={updateLastName}
            shouldShowError={shouldShowError}
            error={!VALIDATE_free_form(profileData.lastName).validate}
            errorMessage={VALIDATE_free_form(profileData.lastName).message}
          />
          <StringField
            name="Graduation Year"
            placeholder="2022"
            value={profileData.graduationYear}
            setValue={updateGradYear}
            shouldShowError={shouldShowError}
            error={!VALIDATE_graduation(profileData.graduationYear).validate}
            errorMessage={VALIDATE_graduation(profileData.graduationYear).message}
          />
          <FormSubmitButton
            hidden={!waitingForSubmit}
            buttonText={"Save Profile"}
            onSubmit={() => {
              if (!ValidateProfilePage()) {
                setShouldShowError(true)
                return;
              }
              updateCallback(profileData);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default Profile;
