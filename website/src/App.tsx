import React from "react";
//import logo from "./logo.svg";
import Helmet from "./Pages/Header/helmet";
import PageHeader from "./Pages/Header/pageHeader";
import Body from "./Pages/Body/body";
import Footer from "./Pages/Footer/footer";

const App = () => {
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

export default App;
