import React, { useState } from "react";
import Filter from "./filter";
import PageController from "./pageController";
import { tableDataType } from "../Table/table.types";
/* Table CSS Credit: https://tailwindcomponents.com/component/table-responsive-with-filters */

const CSTable: React.FunctionComponent<{
  data: tableDataType;
  curEntry: number;
  endEntry: number;
}> = ({ data, curEntry, endEntry }) => {
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

  const generateTableData = (startPosition: number, endPosition: number) => {
    const ret_elements: React.ReactElement[] = [];
    for (let i = startPosition; i <= endPosition; i++) {
      ret_elements.push(
        <tr>
          <TableRow name={data.data[i].Name} />
          <TableRow name={data.data[i].Description} />
          <TableRow name={data.data[i].Hours} />
          <TableRow name={data.data[i].Date} />
        </tr>
      );
    }
    return ret_elements;
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
                <>{generateTableData(curEntry, endEntry)}</>
              </tbody>
            </table>
            <PageController />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSTable;
