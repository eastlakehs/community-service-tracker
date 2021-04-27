import { initialStateType } from "../../../Redux/userDataSlice";
import { downloadFileFromString } from "../../../Firebase/firestore/getReport";
import { Day } from "react-modern-calendar-datepicker";

const handleExport = (data: initialStateType) => {
    let exportString = "Name,Description,Hours,Date\n";
    Object.keys(data.data).forEach((entry) => {
        const dateObj = JSON.parse(data.data[entry].Date) as Day;
        exportString += `"${data.data[entry].Name}",`;
        exportString += `"${data.data[entry].Description}",`;
        exportString += `${data.data[entry].Hours},`;
        exportString += `${dateObj.month}-${dateObj.day}-${dateObj.year}`  + ', ';
        exportString += "\n";
    });
    downloadFileFromString(exportString, "export_hours.csv");
};
export { handleExport };
