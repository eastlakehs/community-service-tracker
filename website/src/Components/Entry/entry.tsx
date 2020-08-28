import React from "react";

const StringField: React.FunctionComponent<{
  name: string;
  placeholder: string;
  hidden?: boolean;
}> = ({ name, placeholder, hidden}) => {
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
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const CheckBox: React.FunctionComponent<{ label: string; setState:Function }> = ({ label, setState }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="inline-flex items-center mt-3">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" onChange={(e) => e.target.checked ? setState(true) : setState(false)} />
          <span className="ml-2 text-white">{label}</span>
        </label>
      </div>
    </div>
  )
}

export { StringField, CheckBox };
