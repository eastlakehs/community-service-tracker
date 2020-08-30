import React from "react";
import { Edit } from "../Components/Edit/edit";
import { useSelector } from "react-redux";
import Helmet from "../Components/Header/helmet";

import { selectEditScreenState } from "../Redux/editScreenSlice";

import { useIsSignedIn } from "../Firebase/linkAuth/useIsSignedIn";
import NotLoggedIn from "../Components/Login/notLoggedIn";

const EditController: React.FC<{}> = () => {
  const editState = useSelector(selectEditScreenState);
  const signedIn = useIsSignedIn();

  if (!signedIn) {
    return (
      <>
        <Helmet
          title="Edit Page"
          description="Page for editing and creating new and created volunteer hour entries."
        />
        <div className="mb-auto">
          <NotLoggedIn />
        </div>
      </>
    )
  }
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
