import React from "react";

const StringField: React.FunctionComponent<{
  name: string;
  placeholder: string;
  hidden?: boolean;
  value: string;
  setValue: (value: string) => void;
}> = ({ name, placeholder, hidden, value, setValue }) => {
  return (
    <div className={"flex flex-wrap -mx-3 mb-6 " + (hidden ? "hidden" : "")}>
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
          {name}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const CheckBox: React.FunctionComponent<{
  label: string;
  checked: boolean;
  setState: Function;
}> = ({ label, setState, checked }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            checked={checked}
            className="form-checkbox h-5 w-5 text-gray-600"
            onChange={(e) =>
              e.target.checked ? setState(true) : setState(false)
            }
          />
          <span className="ml-2 text-white">{label}</span>
        </label>
      </div>
    </div>
  );
};

const AnimateSpinner: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  return (
    <svg
      className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
        hidden ? "hidden" : "visible"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

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
      className="bg-blue-600 px-5 hover:bg-blue-700 py-3 rounded-lg mb-3 text-lg text-white focus:outline-none"
    >
      <div className="flex flex-row items-center">
        <AnimateSpinner hidden={false} />
        {buttonText}
      </div>
    </button>
  );
};

export { StringField, CheckBox, FormSubmitButton };
