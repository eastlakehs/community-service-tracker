import React, { useEffect } from "react";
import Body from "../components/body/body";
import Helmet from "../components/header/helmet";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSignedInState } from "../redux/signedInSlice";

const Home = () => {
  const signedInstate = useSelector(selectSignedInState);
  const history = useHistory();
  // users that are logged in in should be redirected to profile page
  useEffect(() => {
    if (signedInstate.signedIn) {
      if (signedInstate.admin) {
        history.replace("/admin");
      } else {
        history.replace("/table");
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
