import React, { useEffect } from "react";
import Body from "../Components/Body/body";
import Helmet from "../Components/Header/helmet";
import signInwithLink from "../Firebase/linkAuth/signInWithLink";
import useIsSignedIn from "../Firebase/linkAuth/useIsSignedIn";
import { useHistory } from "react-router-dom";

const Home = () => {
  const signedIn = useIsSignedIn();
  const history = useHistory();
  // If a user is redirected to the home page from an auth link, we should log the user into our app.
  useEffect(() => {
    signInwithLink().then((value) => {
      console.log(value);
    });
  });
  // users that are login in should be redirected to profile page
  useEffect(() => {
    if (signedIn) {
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
