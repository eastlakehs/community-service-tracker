import React from "react";
import { Edit } from "./edit";
import { useDispatch, useSelector } from "react-redux";

import {
  selectEditScreenState,
  setCurrentEdit,
} from "../Redux/editScreenSlice";

import { useIsSignedIn } from "../Firebase/linkAuth/useIsSignedIn";

const EditController: React.FC<{}> = () => {
  const editState = useSelector(selectEditScreenState);
  const signedIn = useIsSignedIn();
  console.log(editState);
  return (
    <Edit
      editing={editState.editing}
      currentData={editState.currentData}
      currentKey={editState.currentKey}
      signedInEmail={signedIn}
    />
  );
};

export { EditController };
