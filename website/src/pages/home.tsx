import React, { useEffect } from "react";
import Body from "../components/body/body";
import Helmet from "../components/header/helmet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSignedInState } from "../redux/signedInSlice";

const Home = () => {
  const signedInstate = useSelector(selectSignedInState);
  const navigate = useNavigate();
  // users that are logged in in should be redirected to profile page
  useEffect(() => {
    if (signedInstate.signedIn) {
      if (signedInstate.admin) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    }
  });
  return (
    <>
      <Helmet
        title="EHS tracker"
        description="Main page for the eastlake service tracker website where students can record their volunteer hours."
      />
      <Body />
    </>
  );
};

export default Home;
