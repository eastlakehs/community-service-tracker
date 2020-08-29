import React, { useEffect } from "react";
import Body from "../Components/Body/body";
import Helmet from "../Components/Header/helmet";
import signInwithLink from "../Firebase/linkAuth/signInWithLink";

const Home = () => {
  // If a user is redirected to the home page from an auth link, we should log the user into our app.
  useEffect(() => {
    signInwithLink().then((value) => {
      console.log(value);
    });
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
