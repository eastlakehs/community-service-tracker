import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../Firebase/linkAuth/signOut";
import { useSelector } from "react-redux";
import { selectSignedInState } from "../../Redux/signedInSlice";
import { selectIsAdminState, setIsAdmin } from "../../Redux/isAdminSlice";
/* eslint-disable jsx-a11y/anchor-is-valid */

const LogoutButton = () => (
  <a
    href="#"
    onClick={async (e) => {
      e.preventDefault();
      const error = await signOut();
      if (error) {
        console.log(error);
      }
    }}
    className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
  >
    Logout
  </a>
);

const HeaderButtons: React.FunctionComponent<{}> = () => {
  const signedInstate = useSelector(selectSignedInState);
  const adminState = useSelector(selectIsAdminState);
  if (adminState.admin) {
    return (
      <>
        <Link
          to="/admin"
          className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
        >
          Dashboard
        </Link>
        <LogoutButton />
      </>
    );
  }

  // Display user email adress if the user is signed in
  if (signedInstate.signedIn) {
    return (
      <>
        <Link
          to="/profile"
          className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
        >
          {signedInstate.userEmail}
        </Link>
        <Link
          to="/table"
          className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
        >
          Hours
        </Link>
        <Link
          to="/edit"
          className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
        >
          Submit
        </Link>
        <LogoutButton />
      </>
    );
  }
  return (
    <Link
      className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
      to={"/login"}
    >
      Login
    </Link>
  );
};

const LogoButton: React.FunctionComponent<{}> = () => {
  // make the home button redirect to admin if admin / user profile if it is a user
  const signedInstate = useSelector(selectSignedInState);
  const isAdminState = useSelector(selectIsAdminState);
  let url = "/";
  if (isAdminState) 
    url = "/admin";
  else if (signedInstate.userEmail)
    url = "/profile";

  return (
    <div className="text-white mr-6 ">
      <Link to={url}>
        <span className="text-xl tracking-tight">
          Wolf Pack Service Tracker
    </span>
      </Link>
    </div>
  )
}

const PageHeader = () => {
  const [show_nav, set_nav] = useState(false);
  return (
    <nav className="mb-10 bg-top-red p-6 flex flex-wrap font-black item-center justify-between">
      <LogoButton />
      <div className={`block lg:hidden`}>
        <button
          onClick={() => {
            set_nav(!show_nav);
          }}
          className="px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${show_nav ? "block" : "hidden"} lg:block w-full lg:w-auto`}
      >
        <div className="text-lg">
          <HeaderButtons />
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;
