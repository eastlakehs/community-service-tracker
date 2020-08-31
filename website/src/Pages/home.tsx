import React, { useEffect } from "react";
import Body from "../Components/Body/body";
import Helmet from "../Components/Header/helmet";
import signInwithLink from "../Firebase/linkAuth/signInWithLink";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSignedInState } from "../Redux/signedInSlice";

const Home = () => {
  const signedInstate = useSelector(selectSignedInState);
  const history = useHistory();
  // users that are logged in in should be redirected to profile page
  useEffect(() => {
    if (signedInstate.signedIn) {
      history.replace("/profile");
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
