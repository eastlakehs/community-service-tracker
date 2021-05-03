import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-top-red">
      <p className="text-white pt-2">Eastlake 2020</p>
      <a className="text-white" href="mailto:eastlakekey@gmail.com">
        Issues/Suggestions: eastlakekey@gmail.com
      </a>
      <a className="text-white pb-2" href="https://repo.ehs-service.org">
        About: repo.ehs-service.org
      </a>
    </footer>
  );
};

export default Footer;
