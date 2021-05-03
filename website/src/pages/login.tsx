import React from "react";
import { LoginForm } from "../components/login/loginForm";
import Helmet from "../components/header/helmet";

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
