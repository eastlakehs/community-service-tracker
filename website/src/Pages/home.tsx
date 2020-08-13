import React, { useEffect } from "react";
import Helmet from "../Components/Header/helmet";
import PageHeader from "../Components/Header/pageHeader";
import Body from "../Components/Body/body";
import Footer from "../Components/Footer/footer";

import signInwithLink from "../Firebase/linkAuth/signInWithLink";

const Home = () => {
  // If a user is redirected to the home page from an auth link, we should log the user into our app.
  useEffect(() => {
    signInwithLink().then((value) => {
      console.log(value);
    });
  });
  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <Helmet
        title="EHS tracker"
        description="Main page for the eastlake service tracker website where students can record their volunteer hours."
      />
      <PageHeader />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;
