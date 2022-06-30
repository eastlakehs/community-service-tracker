import React from "react";

import { AnimateSpinner } from "./animateSpinner";

export const FormSubmitButton: React.FC<{
  onSubmit: () => void;
  buttonText: string;
  hidden: boolean;
}> = ({ onSubmit, buttonText, hidden }) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-blue-600 px-5 hover:bg-blue-700 py-3 rounded-lg mb-3 text-lg text-white focus:outline-none"
    >
      <div className="flex flex-row items-center">
        <AnimateSpinner hidden={hidden} />
        {buttonText}
      </div>
    </button>
  );
};
