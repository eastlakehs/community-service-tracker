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
  setNotes,
  addImage,
  removeImage,
} from "../../redux/editScreenSlice";
import {
  StringField,
  PictureField,
  CheckBox,
  FormSubmitButton,
  DateField,
} from "../entry";
import { firestoreDocumentType } from "../../firebase/firestore/firestoreData.type";
import { useNavigate } from "react-router-dom";
import {
  submitEdit,
  submitNewEntry,
} from "../../firebase/firestore/submitEdit";

import { toast, ToastOptions } from "react-toastify";
import {
  VALIDATE_free_form,
  VALIDATE_hours,
  VALIDATE_date,
} from "../validation/validation";
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
  const navigate = useNavigate();

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
    const is_date_correct = VALIDATE_date(currentData?.Date);

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
      is_contact_phone_number_correct.validate &&
      is_date_correct.validate
    );
  };

  return (
    <div className="mb-auto">
      <form className="w-full container max-w-2xl mx-auto px-4 sm:px-8 items-center">
        <h1 className="text-center text-gray-200 py-2 lg:py-3 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl">
          {editing ? "Edit your activity" : "Log a new activity"}
        </h1>
        <div className="sm:grid grid-cols-2 gap-4">
          <StringField
            name="Activity Name and Organization"
            placeholder="Ex: Helped run concessions stand at Eastlake's football game"
            value={currentData ? currentData.Name : ""}
            setValue={(value: string) => {
              dispatch(setName(value));
            }}
            shouldShowError={shouldShowError}
            error={!VALIDATE_free_form(currentData?.Name).validate}
            errorMessage={VALIDATE_free_form(currentData?.Name).message}
          />
          <div className="sm:grid grid-cols-2 gap-4">
            <div>
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
            </div>
            <DateField
              name="Date"
              value={currentData?.Date ? currentData?.Date : ""}
              setValue={(value: string) => dispatch(setDate(value))}
              shouldShowError={shouldShowError}
              error={!VALIDATE_date(currentData?.Date).validate}
              errorMessage={VALIDATE_date(currentData?.Date).message}
            />
          </div>
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
            //This is named contact phone, but it will take any info.
            name="Contact Phone Number or Email"
            placeholder="(425) 123-4567"
            value={currentData ? currentData.contactPhone : ""}
            setValue={(value: string) => {
              dispatch(setContactPhone(value));
            }}
            shouldShowError={shouldShowError}
            error={!VALIDATE_free_form(currentData?.contactPhone).validate}
            errorMessage={VALIDATE_free_form(currentData?.contactPhone).message}
          />
        </div>
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

        <StringField
          name="Notes:"
          placeholder=""
          setValue={(value: string) => {
            dispatch(setNotes(value));
          }}
          value={currentData ? currentData.notes : ""}
          shouldShowError={shouldShowError}
          error={!VALIDATE_free_form(currentData?.notes, true).validate}
          errorMessage={VALIDATE_free_form(currentData?.notes, true).message}
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

        <PictureField
          name="Picture Upload"
          value={currentData ? currentData.pictures : []}
          addImage={(value) => {
            dispatch(addImage(value));
          }}
          removeImage={(value) => {
            dispatch(removeImage(value));
          }}
        />

        <div>
          <div className="sm:grid grid-cols-11">
            <div className="sm:col-span-4">
              <CheckBox
                label="Key Club Event"
                setState={(value: boolean) => {
                  dispatch(setKeyClub(value ? "Yes" : "No"));
                }}
                checked={
                  currentData && currentData.KeyClub === "Yes" ? true : false
                }
              />
            </div>
            <div className="sm:col-span-2">
              <CheckBox
                label="NHS"
                setState={(value: boolean) => {
                  dispatch(setNHS(value ? "Yes" : "No"));
                }}
                checked={
                  currentData && currentData.NHS === "Yes" ? true : false
                }
              />
            </div>
            <div className="sm:col-span-5 sm:text-right text-left">
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
                      navigate("/table");
                      toast.success("Edit submited successfully", ToastConfig);
                      dispatch(clearCurrentEdit());
                    } else {
                      toast.error("Failed to submit error", ToastConfig);
                    }
                  }
                  if (
                    !editing &&
                    typeof signedInEmail === "string" &&
                    currentData
                  ) {
                    const resp = await submitNewEntry(
                      currentData,
                      signedInEmail
                    );
                    setWaitingForSubmit(false);
                    if (resp) {
                      toast.success(
                        "New activity logged successfully",
                        ToastConfig
                      );
                      navigate("/table");
                      dispatch(clearCurrentEdit());
                    } else {
                      toast.error("Failed to log new activity", ToastConfig);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export { Edit };
