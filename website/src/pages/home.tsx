import React, { useEffect } from "react";
import Body from "../components/body/body";
import Helmet from "../components/header/helmet";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSignedInState } from "../redux/signedInSlice";
import { selectProfileState } from "../redux/profileScreenSlice";

const Home = () => {
  const signedInstate = useSelector(selectSignedInState);
  const profileState = useSelector(selectProfileState);
  const history = useHistory();
  // users that are logged in in should be redirected to hours table or profile page
  useEffect(() => {
    if (signedInstate.signedIn) {
      if (signedInstate.admin) {
        history.replace("/admin");
      } else {
        if(profileState.firstName === "" || profileState.graduationYear === "" || profileState.lastName === "") {
          history.replace("/profile");
        } else {
          history.replace("/table");
        }
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
