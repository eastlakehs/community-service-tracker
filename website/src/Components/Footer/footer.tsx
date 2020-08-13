import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-top-red">
      <p className="text-white pt-2">Eastlake 2020</p>
      <a className="text-white" href="https://repo.ehs-service.org">
        issues/suggestion: repo.ehs-service.org
      </a>
      <a className="text-white pb-2" href="mailto:placeholder@gmail.com">
        contact: placeholder@gmail.com
      </a>
    </footer>
  );
};

export default Footer;
