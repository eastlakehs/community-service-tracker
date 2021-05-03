import { initialStateType } from "../../../Redux/userDataSlice";
import { downloadFileFromString } from "../../../Firebase/firestore/getReport";
import { Day } from "react-modern-calendar-datepicker";
import stringify from "csv-stringify";

const handleExport = (data: initialStateType) => {
  let exportArray: string[][] = [];
  exportArray.push(data.header);
  Object.keys(data.data).forEach((entry) => {
    const dateObj = JSON.parse(data.data[entry].Date) as Day;
    let dataRow: string[] = [];
    dataRow.push(data.data[entry].Name);
    dataRow.push(data.data[entry].Description);
    dataRow.push(data.data[entry].Hours);
    dataRow.push(`${dateObj.month}-${dateObj.day}-${dateObj.year}`);
    exportArray.push(dataRow);
  });

  stringify(exportArray, (err: any, output: string) => {
    downloadFileFromString(output, "export_hours.csv");
  });
};
export { handleExport };
