import React from "react";

import Filter from "./filter";
import Page from "./page";

import { tableDataType } from "../Body/body";
/* Table CSS Credit: https://tailwindcomponents.com/component/table-responsive-with-filters */

const CSTable: React.FunctionComponent<{ data: tableDataType }> = ({
  data,
}) => {
  const generateHeader = () => {
    return data.header.map((header) => {
      return (
        <th
          className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          key={header}
        >
          {header}
        </th>
      );
    });
  };
  const TableRow: React.FunctionComponent<{ name: string | number }> = ({
    name,
  }) => (
    <td
      className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b border-gray-200 bg-white text-sm"
      key={name}
    >
      <p className="text-gray-900">{name}</p>
    </td>
  );

  const generateTableData = () => {
    return data.data.map((row) => {
      return (
        <tr>
          <TableRow name={row.Name} />
          <TableRow name={row.Description} />
          <TableRow name={row.Hours} />
          <TableRow name={row.Date} />
        </tr>
      );
    });
  };
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <Filter />
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className={"min-w-full leading-normal"}>
              <thead>
                <tr>
                  <>{generateHeader()}</>
                </tr>
              </thead>
              <tbody>
                <>{generateTableData()}</>
              </tbody>
            </table>
            <Page />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSTable;
