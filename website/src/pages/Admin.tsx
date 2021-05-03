import React from "react";
import Helmet from "../Components/Header/helmet";

import { Admin } from "../Components/Admin/admin";

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
