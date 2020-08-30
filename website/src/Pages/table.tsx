import React from "react";

import Helmet from "../Components/Header/helmet";
import TableController from "../Components/Table/tableController";
import NotLoggedIn from "../Components/Login/notLoggedIn";

import { useIsSignedIn } from "../Firebase/linkAuth/useIsSignedIn";

const Table: React.FC<{}> = () => {

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
        title="Table"
        description="Page showing your current submitted hours."
      />
      <div className="mb-auto">
        {
          // mb - auto forces the footer to be at the bottom
        }
        <TableController />
      </div>
    </>
  );
};

export { Table };
