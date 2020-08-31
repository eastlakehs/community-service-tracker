import React from "react";

const Page: React.FunctionComponent<{
  curEntry: number;
  endEntry: number;
  totalEntry: number;
  handleNextPage: Function;
  handlePrevPage: Function;
}> = ({ curEntry, endEntry, totalEntry, handleNextPage, handlePrevPage }) => {
  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-900">
        Showing {curEntry} to {endEntry} of {totalEntry} Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => {
            handlePrevPage();
          }}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          onClick={() => {
            handleNextPage();
          }}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
