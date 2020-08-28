import React, { useState } from "react";

import { StringField, CheckBox } from "../Components/Entry/entry";
import Helmet from "../Components/Header/helmet";
import PageHeader from "../Components/Header/pageHeader";
import Footer from "../Components/Footer/footer";

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';

const FormSubmitButton: React.FC<{}> = () => {
  return (
    <button className="bg-blue-600 px-5 hover:bg-blue-700 py-3 rounded-lg mb-3 text-lg text-white">
      Submit Edit or New Activity
    </button>
  );
};

const Edit: React.FC<{}> = () => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);

  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <Helmet
        title="EHS tracker"
        description="Main page for the eastlake service tracker website where students can record their volunteer hours."
      />
      <PageHeader />
      <div className="mb-auto">
        <form className="w-full max-w-lg container mx-auto px-4 sm:px-8 items-center">
          <h1 className="text-center text-gray-200 py-2 lg:py-3 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl">
            Activity Edit Screen
          </h1>
          <StringField
            name="Activity Name"
            placeholder="Orginization, club, etc."
          />
          <StringField name="Description" placeholder="I did ....." />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Date
            </label>
          <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a day"
            inputClassName="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />

          <StringField name="Hours" placeholder="Ex: 5" />
          <StringField name="Contact Name" placeholder="Jonathan Swift" />
          <StringField name="Contact Phone Number" placeholder="(425) 123-4567" />
          <CheckBox label="Key Club Event" />
          <FormSubmitButton />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export { Edit };
