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
} from "../Redux/editScreenSlice";
import { StringField, CheckBox } from "../Components/Entry/entry";
import { firestoreDocumentType } from "../Firebase/firestore/firestoreData.type";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayValue, Day } from "react-modern-calendar-datepicker";
import { useHistory } from "react-router-dom";
import { submitEdit, submitNewEntry } from "../Firebase/firestore/submitEdit";

const FormSubmitButton: React.FC<{
  onSubmit: () => void;
  buttonText: string;
}> = ({ onSubmit, buttonText }) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-blue-600 px-5 hover:bg-blue-700 py-3 rounded-lg mb-3 text-lg text-white"
    >
      {buttonText}
    </button>
  );
};

const tempfunc = (value: string) => { };

const Edit: React.FC<{
  currentData: firestoreDocumentType | null;
  currentKey: string | null;
  editing: boolean | null;
  signedInEmail: string | boolean;
}> = ({ currentData, currentKey, editing, signedInEmail }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);

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
        />
        <StringField
          name="Description"
          placeholder="I did ....."
          setValue={(value: string) => {
            dispatch(setDescription(value));
          }}
          value={currentData ? currentData.Description : ""}
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
        />
        <StringField
          name="Contact Name"
          placeholder="Jonathan Swift"
          value={currentData ? currentData.contactName : ""}
          setValue={(value: string) => {
            dispatch(setContactName(value));
          }}
        />
        <StringField
          name="Contact Phone Number"
          placeholder="(425) 123-4567"
          value={currentData ? currentData.contactPhone : ""}
          setValue={(value: string) => {
            dispatch(setContactPhone(value));
          }}
        />
        <CheckBox
          label="Key Club Event"
          setState={(value: boolean) => {
            dispatch(setKeyClub(value ? "Yes" : "No"));
          }}
          checked={
            currentData && currentData.KeyClub === "Yes" ? true : false
          }
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
        />

        <FormSubmitButton
          buttonText={editing ? "Edit Activity" : "Log new Activity"}
          onSubmit={async () => {
            if (
              editing &&
              typeof signedInEmail === "string" &&
              currentData &&
              currentKey
            ) {
              await submitEdit(currentData, currentKey, signedInEmail);
              history.push("/table");
            }
            if (
              !editing &&
              typeof signedInEmail === "string" &&
              currentData
            ) {
              await submitNewEntry(currentData, signedInEmail);
              history.push("/table");
            }
          }}
        />
      </form>
    </div>
  );
};

export { Edit };
