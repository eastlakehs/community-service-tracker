import React from "react";
import Helmet from "../Components/Header/helmet";
import PageHeader from "../Components/Header/pageHeader";
import Footer from "../Components/Footer/footer";

import { useSyncUserData } from "../Firebase/firestore/useUserData";

import TableController from "../Components/Table/tableController";

const Table: React.FC<{}> = () => {
  useSyncUserData();
  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <Helmet
        title="Login"
        description="Login page where users can login by receiving an OTP link in their email"
      />
      <PageHeader />
      <div className="mb-auto">
        {
          // mb - auto forces the footer to be at the bottom
        }
        <TableController />
      </div>
      <Footer />
    </div>
  );
};

export { Table };
