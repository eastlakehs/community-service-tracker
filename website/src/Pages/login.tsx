import React from "react";
import Helmet from "../Components/Header/helmet";
import PageHeader from "../Components/Header/pageHeader";
import Footer from "../Components/Footer/footer";

import LoginForm from "../Components/Login/loginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <Helmet
        title="Login"
        description="Login page where users can login by receiving an OTP link in their email"
      />
      <PageHeader />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
