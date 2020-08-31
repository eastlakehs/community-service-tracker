import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setDate,
  setDescription,
  setHours,
  setKeyClub,
  setNHS,
  setNHSOfficer,
  setName,
  setContactName,
  setContactPhone,
  clearCurrentEdit,
} from "../../Redux/editScreenSlice";
import { StringField, CheckBox, FormSubmitButton } from "../Entry/entry";
import { firestoreDocumentType } from "../../Firebase/firestore/firestoreData.type";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { Day } from "react-modern-calendar-datepicker";
import { useHistory } from "react-router-dom";
import {
  submitEdit,
  submitNewEntry,
} from "../../Firebase/firestore/submitEdit";

import { toast, ToastOptions } from "react-toastify";
import { VALIDATE_free_form, VALIDATE_hours } from "../Validation/validation";
/** Easy toast creation generation at https://fkhadra.github.io/react-toastify/introduction/ */
const ToastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

const Edit: React.FC<{
  currentData: firestoreDocumentType | null;
  currentKey: string | null;
  editing: boolean | null;
  signedInEmail: string | boolean;
}> = ({ currentData, currentKey, editing, signedInEmail }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [waitingForSubmit, setWaitingForSubmit] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);

  const ValidateEditPage = (): boolean => {
    const is_name_correct = VALIDATE_free_form(currentData?.Name);
    const is_description_correct = VALIDATE_free_form(currentData?.Description);
    const is_hours_correct = VALIDATE_hours(currentData?.Hours);
    const is_contact_name_correct = VALIDATE_free_form(
      currentData?.contactName
    );
    const is_contact_phone_number_correct = VALIDATE_free_form(
      currentData?.contactPhone
    );
    const is_officer_name_correct = VALIDATE_free_form(currentData?.NHSofficer);

    console.log(currentData?.NHS);
    console.log(VALIDATE_free_form(currentData?.NHSofficer));
    if (
      !is_officer_name_correct.validate &&
      currentData &&
      currentData?.NHS === "Yes"
    )
      return false;
    return (
      is_name_correct.validate &&
      is_description_correct.validate &&
      is_hours_correct.validate &&
      is_contact_name_correct.validate &&
      is_contact_phone_number_correct.validate
    );
  };

  return (
    <div className="mb-auto">
      <form className="w-full max-w-lg container mx-auto px-4 sm:px-8 items-center">
        <h1 className="text-center text-gray-200 py-2 lg:py-3 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl">
          {editing ? "Edit your activity" : "Log a new activity"}
        </h1>
        <StringField
          name="Activity Name"
          placeholder="Orginization, club, etc."
          value={currentData ? currentData.Name : ""}
          setValue={(value: string) => {
            dispatch(setName(value));
          }}
          shouldShowError={shouldShowError}
          error={!VALIDATE_free_form(currentData?.Name).validate}
          errorMessage={VALIDATE_free_form(currentData?.Name).message}
        />
        <StringField
          name="Description"
          placeholder="I did ....."
          setValue={(value: string) => {
            dispatch(setDescription(value));
          }}
          value={currentData ? currentData.Description : ""}
          shouldShowError={shouldShowError}
          error={!VALIDATE_free_form(currentData?.Description).validate}
          errorMessage={VALIDATE_free_form(currentData?.Description).message}
        />

        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
          Date
        </label>
        <DatePicker
          value={currentData ? (JSON.parse(currentData.Date) as Day) : null}
          onChange={(day) => {
            day && dispatch(setDate(JSON.stringify(day)));
          }}
          inputPlaceholder="Select a day"
          inputClassName="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
        <StringField
          name="Hours"
          placeholder="Ex: 5"
          value={currentData ? currentData.Hours : ""}
          setValue={(value: string) => {
            dispatch(setHours(value));
          }}
          shouldShowError={shouldShowError}
          error={!VALIDATE_hours(currentData?.Hours).validate}
          errorMessage={VALIDATE_hours(currentData?.Hours).message}
        />
        <StringField
          name="Contact Name"
          placeholder="Jonathan Swift"
          value={currentData ? currentData.contactName : ""}
          setValue={(value: string) => {
            dispatch(setContactName(value));
          }}
          shouldShowError={shouldShowError}
          error={!VALIDATE_free_form(currentData?.contactName).validate}
          errorMessage={VALIDATE_free_form(currentData?.contactName).message}
        />
        <StringField
          name="Contact Phone Number"
          placeholder="(425) 123-4567"
          value={currentData ? currentData.contactPhone : ""}
          setValue={(value: string) => {
            dispatch(setContactPhone(value));
          }}
          shouldShowError={shouldShowError}
          error={!VALIDATE_free_form(currentData?.contactPhone).validate}
          errorMessage={VALIDATE_free_form(currentData?.contactPhone).message}
        />
        <CheckBox
          label="Key Club Event"
          setState={(value: boolean) => {
            dispatch(setKeyClub(value ? "Yes" : "No"));
          }}
          checked={currentData && currentData.KeyClub === "Yes" ? true : false}
        />

        <CheckBox
          label="NHS"
          setState={(value: boolean) => {
            dispatch(setNHS(value ? "Yes" : "No"));
          }}
          checked={currentData && currentData.NHS === "Yes" ? true : false}
        />
        <StringField
          name="Officer Name"
          placeholder="Smith"
          hidden={!(currentData && currentData.NHS === "Yes")}
          value={currentData ? currentData.NHSofficer : ""}
          setValue={(value) => {
            dispatch(setNHSOfficer(value));
          }}
          shouldShowError={shouldShowError}
          error={!VALIDATE_free_form(currentData?.NHSofficer).validate}
          errorMessage={VALIDATE_free_form(currentData?.NHSofficer).message}
        />

        <FormSubmitButton
          hidden={!waitingForSubmit}
          buttonText={editing ? "Edit Activity" : "Log new Activity"}
          onSubmit={async () => {
            if (!ValidateEditPage()) {
              setShouldShowError(true);
              return;
            }
            setWaitingForSubmit(true);
            if (
              editing &&
              typeof signedInEmail === "string" &&
              currentData &&
              currentKey
            ) {
              const resp = await submitEdit(
                currentData,
                currentKey,
                signedInEmail
              );
              setWaitingForSubmit(false);
              if (resp) {
                history.push("/table");
                toast.success("Edit submited successfully", ToastConfig);
                dispatch(clearCurrentEdit());
              } else {
                toast.error("Failed to submit error", ToastConfig);
              }
            }
            if (!editing && typeof signedInEmail === "string" && currentData) {
              const resp = await submitNewEntry(currentData, signedInEmail);
              setWaitingForSubmit(false);
              if (resp) {
                toast.success("New activity logged successfully", ToastConfig);
                history.push("/table");
                dispatch(clearCurrentEdit());
              } else {
                toast.error("Failed to log new activity", ToastConfig);
              }
            }
          }}
        />
      </form>
    </div>
  );
};

export { Edit };
