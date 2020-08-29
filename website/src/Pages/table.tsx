import React from "react";

import { useSyncUserData } from "../Firebase/firestore/useUserData";
import Helmet from "../Components/Header/helmet";
import TableController from "../Components/Table/tableController";

const Table: React.FC<{}> = () => {
  useSyncUserData();
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
