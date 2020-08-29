import React from "react";

import { useSyncUserData } from "../Firebase/firestore/useUserData";

import TableController from "../Components/Table/tableController";

const Table: React.FC<{}> = () => {
  useSyncUserData();
  return (
    <div className="mb-auto">
      {
        // mb - auto forces the footer to be at the bottom
      }
      <TableController />
    </div>
  );
};

export { Table };
