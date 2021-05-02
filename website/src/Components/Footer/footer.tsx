import React from "react";

const Footer = () => {
  return (
   <footer className="flex flex-col items-center bg-top-red">
      <a className="text-white pt-2">Eastlake 2021</a>
      <a className="text-white pb-2" href="https://repo.ehs-service.org">
        This tracker is open source: contribute today!
      </a>
      <a className="text-white" href="mailto:eastlakekey@gmail.com">
        Questions: eastlakekey@gmail.com
      </a>
    </footer>
  );
};

export default Footer;
