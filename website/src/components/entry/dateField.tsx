import React from "react";
import assert from "assert";
import { ErrorMessage } from "./errorMessage";

// parses state from date input to object
// date input in html is formatted as YYYY-MM-DD
export const serializeHtmlDate = (state: string) => {
  assert(state.length === 10);
  return {
    year: Number(state.slice(0, 4)),
    month: Number(state.slice(5, 7)),
    day: Number(state.slice(8, 10)),
  };
};

// takes the string representation of the date
// that we store in the backend and converts it to a html format date
export const convertSerializedToHtmlDate = (state: string): string => {
  if (state === "") return "";

  const jsonParsed = JSON.parse(state) as {
    day: number;
    month: number;
    year: number;
  };
  let htmlDate = String(jsonParsed.year) + "-";

  if (jsonParsed.month <= 9) htmlDate += "0";
  htmlDate += String(jsonParsed.month);
  htmlDate += "-";

  if (jsonParsed.day <= 9) htmlDate += "0";
  htmlDate += String(jsonParsed.day);

  return htmlDate;
};

export const DateField: React.FunctionComponent<{
  name: string;
  value: string;
  setValue: (value: string) => void;
  shouldShowError?: boolean;
  error?: boolean;
  errorMessage?: string;
}> = ({ name, value, setValue, error, errorMessage, shouldShowError }) => {
  return (
    <div className={"flex flex-wrap -mx-3 mb-6"}>
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
          {name}
        </label>
        <input
          /**
           * https://github.com/tailwindlabs/tailwindcss-forms/issues/38
           * Date input does not respect placeholder coloring in tailwind
           * So you have to manually set the placeholder coloring
           */
          className={
            "appearance-none block w-full bg-gray-200 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" +
            (error && shouldShowError ? " border border-red-500" : "") +
            (value ? " text-gray-700" : " text-gray-500")
          }
          type="date"
          value={convertSerializedToHtmlDate(value)}
          onChange={(e) =>
            setValue(JSON.stringify(serializeHtmlDate(e.target.value)))
          }
        />
        <ErrorMessage e={error && shouldShowError} eM={errorMessage} />
      </div>
    </div>
  );
};
