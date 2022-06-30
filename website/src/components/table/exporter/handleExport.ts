import { initialStateType } from "../../../redux/userDataSlice";
import { downloadFileFromString } from "../../../firebase/firestore/getReport";
import stringify from "csv-stringify";

const handleExport = (data: initialStateType) => {
  let exportArray: string[][] = [];
  exportArray.push(data.header);
  Object.keys(data.data).forEach((entry) => {
    const dateObj = JSON.parse(data.data[entry].Date) as {day: string, month: string, year: string} ;
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
