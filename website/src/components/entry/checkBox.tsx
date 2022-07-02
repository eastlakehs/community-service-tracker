import React from "react";

export const CheckBox: React.FunctionComponent<{
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
