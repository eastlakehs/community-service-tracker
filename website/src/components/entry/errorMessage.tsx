import React from "react";

export const ErrorMessage: React.FunctionComponent<{
  e?: boolean;
  eM?: string;
}> = ({ e, eM }) => {
  if (e) {
    return <p className="text-red-500 text-xs italic">{eM}</p>;
  } else {
    return <></>;
  }
};
