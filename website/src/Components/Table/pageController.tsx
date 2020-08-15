import React from "react";
import Page from "./page";
import {} from "../Table/table.types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTableState,
  setEndEntry,
  setCurrEntry,
} from "../../Redux/tableDataSlice";

const PageController: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const tableState = useSelector(selectTableState);
  const curEntry = tableState.currEntry;
  const endEntry = tableState.endEntry;
  const data = tableState.data;
  const ENTRIES_PER_PAGE = tableState.entriesPerPage;

  const handleNextPage = () => {
    if (endEntry === data.data.length) return; // displaying last page
    if (endEntry + ENTRIES_PER_PAGE <= data.data.length - 1) {
      // Able to forward end and starts by ENTRIES_PER_PAGE
      dispatch(setCurrEntry(curEntry + ENTRIES_PER_PAGE));
      dispatch(setEndEntry(endEntry + ENTRIES_PER_PAGE));
    } else {
      // Able to forward end and start by some value less than ENTRIES_PER_PAGE
      const forwardAmount = data.data.length - 1 - endEntry;
      dispatch(setCurrEntry(curEntry + forwardAmount));
      dispatch(setEndEntry(endEntry + forwardAmount));
    }
  };

  const handlePrevPage = () => {
    if (curEntry === 0) return; // displaying first page
    if (curEntry - ENTRIES_PER_PAGE >= 0) {
      // Able to reverse start and end by ENTRIES_PER_PAGE
      dispatch(setCurrEntry(curEntry - ENTRIES_PER_PAGE));
      dispatch(setEndEntry(endEntry - ENTRIES_PER_PAGE));
    } else {
      // Able to reverse start and end by start value
      const reverseAmount = curEntry;
      dispatch(setCurrEntry(0));
      dispatch(setEndEntry(endEntry - reverseAmount));
    }
  };

  const sanitizeBounds = (x: number) => {
    if (x < 0) return 0;
    if (x >= data.data.length) return data.data.length;
    return x;
  };

  return (
    <Page
      curEntry={sanitizeBounds(curEntry + 1)}
      endEntry={sanitizeBounds(endEntry + 1)}
      totalEntry={data.data.length}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
    />
  );
};

export default PageController;
