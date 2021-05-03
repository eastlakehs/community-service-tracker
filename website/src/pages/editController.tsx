import React from "react";
import { Edit } from "../components/edit/edit";
import { useSelector } from "react-redux";
import Helmet from "../components/header/helmet";

import { selectEditScreenState } from "../redux/editScreenSlice";

import { selectSignedInState } from "../redux/signedInSlice";
import InfoPage from "../components/info/infoPage";

const EditController: React.FC<{}> = () => {
  const editState = useSelector(selectEditScreenState);
  const signedInstate = useSelector(selectSignedInState);

  if (!signedInstate.signedIn) {
    return (
      <>
        <Helmet
          title="Edit Page"
          description="Page for editing and creating new and created volunteer hour entries."
        />
        <div className="mb-auto">
          <InfoPage
            title="You Are Not Signed In!"
            message="Click here to sign in"
            link="/login"
          />
        </div>
      </>
    );
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
        signedInEmail={signedInstate.userEmail}
      />
    </>
  );
};

export { EditController };
