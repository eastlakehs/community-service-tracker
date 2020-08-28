import React from "react";

import { StringField } from "../Components/Entry/entry";
import Helmet from "../Components/Header/helmet";
import PageHeader from "../Components/Header/pageHeader";
import Footer from "../Components/Footer/footer";

const FormSubmitButton: React.FC<{}> = () => {
  return (
    <button className="bg-blue-600 px-5 hover:bg-blue-700 py-3 rounded-lg mb-3 text-lg text-white">
      Submit Edit or New Activity
    </button>
  );
};

const Edit: React.FC<{}> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <Helmet
        title="EHS tracker"
        description="Main page for the eastlake service tracker website where students can record their volunteer hours."
      />
      <PageHeader />
      <div className="mb-auto">
        <form className="flex flex-col items-center">
          <h1 className="text-center text-gray-200 py-2 lg:py-3 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl">
            Activity Edit Screen
          </h1>
          <StringField
            name="Activity Name"
            placeholder="Orginization, club, etc."
          />
          <StringField name="Description" placeholder="I did ....." />
          <StringField name="Date" placeholder="December-1-2020" />
          <StringField name="Key Club Event" placeholder="Yes or No" />
          <StringField name="Contact Name" placeholder="Jonathan Swift" />
          <StringField name="Hours" placeholder="Ex: 5" />
          <FormSubmitButton />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export { Edit };
