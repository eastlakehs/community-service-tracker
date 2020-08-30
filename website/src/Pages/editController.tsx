import React from "react";
import { Edit } from "../Components/Edit/edit";
import { useSelector } from "react-redux";
import Helmet from "../Components/Header/helmet";

import {
  selectEditScreenState,
} from "../Redux/editScreenSlice";

import { useIsSignedIn } from "../Firebase/linkAuth/useIsSignedIn";

const EditController: React.FC<{}> = () => {
  const editState = useSelector(selectEditScreenState);
  const signedIn = useIsSignedIn();
  console.log(editState);
  return (
    <>
      <Helmet
        title="Edit Page"
        description="Page for editing and creating new and created volunteer hour entries."
      />
      <Edit
        editing={editState.editing}
        currentData={editState.currentData}
        currentKey={editState.currentKey}
        signedInEmail={signedIn}
      />
    </>
  );
};

export { EditController };
