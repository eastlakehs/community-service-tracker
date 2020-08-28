import React from "react";
import { tableDataType } from "../Table/table.types";
/* Table CSS Credit: https://tailwindcomponents.com/component/table-responsive-with-filters */

const TableHeaderStyle: string =
  "px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider";

const ButtonStyle: string =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const CSTable: React.FunctionComponent<{
  data: tableDataType;
}> = ({ data }) => {
  const generateHeader = () => {
    return data.header.map((header) => {
      return (
        <th className={TableHeaderStyle} key={header}>
          {header}
        </th>
      );
    });
  };
  const TableCell: React.FunctionComponent<{ name: string | number }> = ({
    name,
  }) => (
    <td
      className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b border-gray-200 bg-white text-sm"
      key={name}
    >
      <p className="text-gray-900">{name}</p>
    </td>
  );

  const EditButton: React.FunctionComponent<{
    name: string;
    onClick: Function;
  }> = ({ name, onClick }) => (
    <td className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b border-gray-200 bg-white text-sm">
      <button
        className={ButtonStyle}
        onClick={() => {
          onClick();
        }}
      >
        {name}
      </button>
    </td>
  );

  const EditOnClick: Function = () => {
    console.log("Edit Table Clicked");
    // TODO Populate Page with Editable Data
  };

  const generateTableData = () => {
    const ret_elements: React.ReactElement[] = [];
    for (let i = 0; i < data.data.length; i++) {
      ret_elements.push(
        <tr>
          <TableCell name={data.data[i].Name} />
          <TableCell name={data.data[i].Description} />
          <TableCell name={data.data[i].Hours} />
          <TableCell name={data.data[i].Date} />
          <EditButton name="Edit" onClick={EditOnClick} />
        </tr>
      );
    }
    return ret_elements;
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className={"min-w-full leading-normal"}>
              <thead>
                <tr>
                  <>{generateHeader()}</>
                  <th className={TableHeaderStyle}>Operation</th>
                </tr>
              </thead>
              <tbody>
                <>{generateTableData()}</>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSTable;
