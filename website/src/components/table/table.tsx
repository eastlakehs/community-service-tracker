import React from "react";
import { initialStateType } from "../../redux/userDataSlice";
import { totalizeHours } from "./Totalizer/totalizer";
import { handleExport } from "./exporter/handleExport";
import InfoPage from "../info/infoPage";
/* Table CSS Credit: https://tailwindcomponents.com/component/table-responsive-with-filters */

const TableHeaderStyle: string =
  "px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider";

const CSTable: React.FunctionComponent<{
  data: initialStateType;
  handleEditClick: (entryID: string) => void;
  handleDelete: (entryID: string) => void;
}> = ({ data, handleEditClick, handleDelete }) => {
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
    <td className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900">{name}</p>
    </td>
  );

  const TableButton: React.FunctionComponent<{
    name: string;
    onClick: () => void;
    edit: boolean;
  }> = ({ name, onClick, edit }) => (
    <button
      className={
        edit
          ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 mt-2 rounded"
          : "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
      }
      onClick={() => {
        onClick();
      }}
    >
      {name}
    </button>
  );

  const generateTableData = () => {
    return Object.keys(data.data).map((entry) => {
      const dateObj = JSON.parse(data.data[entry].Date) as { day: string, month: string, year: string} ;
      return (
        <tr key={data.data ? entry : "empty-entry"}>
          <TableCell name={data.data[entry].Name} />
          <TableCell name={data.data[entry].Description} />
          <TableCell name={data.data[entry].Hours} />
          <TableCell name={`${dateObj.month}-${dateObj.day}-${dateObj.year}`} />
          <td className={"px-2 border-b border-gray-200 bg-white text-sm "}>
            <TableButton
              name="Edit"
              onClick={() => {
                handleEditClick(entry);
              }}
              edit={true}
            />
            <TableButton
              name="Delete"
              onClick={() => {
                handleDelete(entry);
              }}
              edit={false}
            />
          </td>
        </tr>
      );
    });
  };

  if (Object.keys(data.data).length === 0) {
    return (
      <InfoPage
        title="No Hours Found!"
        message="Click here to submit hours!"
        link="/edit"
      />
    );
  }

  return (
    <>
      <span className="flex justify-center text-white text-3xl">
        {`Total Hours : ${totalizeHours(data)} hours`}
      </span>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div className="text-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                handleExport(data);
              }}
            >
              Export
            </button>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className={"min-w-full leading-normal"}>
                <thead>
                  <tr>
                    <>{generateHeader()}</>
                    <th className={TableHeaderStyle}>Operations</th>
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
    </>
  );
};

export default CSTable;
