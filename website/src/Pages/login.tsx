import React from "react";
import { LoginForm } from "../Components/Login/loginForm";
import Helmet from "../Components/Header/helmet";

const Login = () => {
  return (
    <>
      <Helmet
        title="Login"
        description="Login page where users can login by receiving an OTP link in their email"
      />
      <LoginForm />
    </>
  );
};

export default Login;
