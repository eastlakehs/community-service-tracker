import React, { useState } from "react";
import { Link } from "react-router-dom";
/* eslint-disable jsx-a11y/anchor-is-valid */
const HeaderButtons: React.FunctionComponent<{ title: string }> = ({
  title,
}) => {
  return (
    <Link
      className="block lg:inline-block text-white mr-6 mt-2 lg:mt-auto"
      to={"/" + title}
    >
      {title}
    </Link>
  );
};

const PageHeader = () => {
  const [show_nav, set_nav] = useState(false);
  return (
    <nav className="mb-10 bg-top-red p-6 flex flex-wrap font-black item-center justify-between">
      <div className="text-white mr-6 ">
        <span className="text-xl tracking-tight">
          Wolf Pack Service Tracker
        </span>
      </div>
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
          <HeaderButtons title={"Account"} />
          <HeaderButtons title={"Login"} />
          <HeaderButtons title={"Track time"} />
        </div>
      </div>
    </nav>
  );
};

export default PageHeader;
