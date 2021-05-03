import React from "react";
import Helmet from "../components/header/helmet";

import { Admin } from "../components/admin/admin";

export const AdminPage = () => {
  return (
    <>
      <Helmet
        title="Admin"
        description="Admin page for modifying student data"
      />
      <Admin />
    </>
  );
};
