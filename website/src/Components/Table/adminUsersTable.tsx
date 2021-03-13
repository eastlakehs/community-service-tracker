import React, { useState } from "react";
import { profileAndEmail } from "../../Firebase/firestore/getCurrentUsers";

import { filterAdminResult } from "../../Components/Admin/search";

/* Table CSS Credit: https://tailwindcomponents.com/component/table-responsive-with-filters */

const TableHeaderStyle: string =
  "px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider";

const AdminUsersTable: React.FunctionComponent<{
  data: profileAndEmail[];
  handleView: (userID: string) => void;
}> = ({ data, handleView }) => {
  const headers = ['Email', 'Name', 'Graduation Year']
  const [filteredData, setFilteredData] = useState(data)
  const generateHeader = () => {
    return headers.map((header) => {
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
    >
      <p className="text-gray-900">{name}</p>
    </td>
  );

  const TableButton: React.FunctionComponent<{
    name: string;
    onClick: () => void;
    // what's up
  }> = ({ name, onClick }) => (
    <button
      className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 mt-2 rounded"}
      onClick={() => {
        onClick();
      }}
    >
      {name}
    </button>
  );

  const generateTableData = () => {
    return filteredData.map((user) => {
      return (
        <tr key={data ? JSON.stringify(user) : "empty-entry"}>
          <TableCell name={user.email} />
          <TableCell name={user.firstName + ' ' + user.lastName} />
          <TableCell name={user.graduationYear} />

          <td className={"px-2 border-b border-gray-200 bg-white text-sm "}>
            <TableButton
              name="View"
              onClick={() => {
                handleView(user.email);
              }}
            />
          </td>
        </tr>
      );
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredData(filterAdminResult(e.target.value, data))
  }

  /*
  if (Object.keys(data.data).length === 0) {
    return (
      <InfoPage title="No Hours Found!" message="Click here to submit hours!" link="/edit" />
    )
  }
  */

  return (
    <>
      <span className="flex justify-center text-white text-3xl">
        Admin Dashboard
      </span>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                    <path
                      d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input placeholder="Search" onChange={(e) => { handleSearch(e) }}
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
              </div>
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

export default AdminUsersTable;
