import React, { useEffect } from "react";
import Body from "../components/body/body";
import Helmet from "../components/header/helmet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSignedInState } from "../redux/signedInSlice";

const Home = () => {
  const signedInstate = useSelector(selectSignedInState);
  const navigation = useNavigate();
  // users that are logged in in should be redirected to profile page
  useEffect(() => {
    if (signedInstate.signedIn) {
      if (signedInstate.admin) {
        //@ts-ignore https://github.com/react-navigation/react-navigation/issues/8256
        navigation.replace("/admin");
      } else {
        //@ts-ignore https://github.com/react-navigation/react-navigation/issues/8256
        navigation.replace("/profile");
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
