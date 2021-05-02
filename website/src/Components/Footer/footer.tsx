import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-top-red">
      <p className="text-white pt-2">Eastlake 2020</p>
      <p className="text-white pb-2">
          This tracker is open source: <a href="https://github.com/eastlakehs/community-service-tracker">
          contribute here
        </a>
      </p>

    <a className="text-white" href="mailto:eastlakekey@gmail.com">
        Questions: eastlakekey@gmail.com
    </a>

    </footer>
  );
};

export default Footer;
