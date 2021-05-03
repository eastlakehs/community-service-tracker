import React from "react";
import { Helmet } from "react-helmet";

const HelmetComponent: React.FunctionComponent<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <title lang="en">{title}</title>
    </Helmet>
  );
};

export default HelmetComponent;
