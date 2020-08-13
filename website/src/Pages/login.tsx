import React from "react";
import Helmet from "../Components/Header/helmet";
import PageHeader from "../Components/Header/pageHeader";
import Body from "../Components/Body/body";
import Footer from "../Components/Footer/footer";

import LoginForm from "../Components/Login/loginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <Helmet
        title="EHS tracker"
        description="Main page for the eastlake service tracker website where students can record their volunteer hours."
      />
      <PageHeader />
      <LoginForm />
    </div>
  );
};

export default Login;
