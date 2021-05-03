import { db } from "../setup";

type firebaseServerTimestamp = { seconds: number; nanoseconds: number };

type reportType = null | {
  hourSummary: string;
  awardsList: string;
  lastUpdated: firebaseServerTimestamp;
};

/** Fetches the latest csv hour summaries */
const getReport = async () => {
  const report = await db
    .collection("reports")
    .doc("latest")
    .get()
    .catch((e) => {
      console.log(e);
      return null;
    });
  const typedReport = report?.data() as reportType;
  if (typedReport) return typedReport;
  return null;
};

/** References
 *  https://stackoverflow.com/questions/45831191/generate-and-download-file-from-js/45831280#45831280
 *  https://caniuse.com/download
 *  Approach is mostly supported across the latest major browsers
 *
 *  Basically, create an element, attach a download tag to it, link data as href, click button, delete element.
 */
export const downloadFileFromString = (file: string, fileName: string) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(file)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const downloadReports = async () => {
  const report = await getReport();
  if (report) {
    const reportDate = new Date(report.lastUpdated.seconds * 1000);

    // File Names
    const reportNameHourSummary = `Hour-Report-${
      reportDate.getUTCMonth() + 1
    }-${reportDate.getDate()}.csv`;
    const reportNameAwardsList = `Awards-List-${
      reportDate.getUTCMonth() + 1
    }-${reportDate.getDate()}.csv`;

    downloadFileFromString(report.hourSummary, reportNameHourSummary);
    downloadFileFromString(report.awardsList, reportNameAwardsList);
    return true;
  }
  return null;
};

export { getReport, downloadReports };
