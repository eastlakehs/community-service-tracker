import { db } from "../setup";

type reportType = null | {
  hourSummary: string;
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
  if (typedReport) return typedReport.hourSummary;
  return null;
};

/** References
 *  https://stackoverflow.com/questions/45831191/generate-and-download-file-from-js/45831280#45831280
 *  https://caniuse.com/download
 *  Approach is mostly supported across the latest major browsers
 *
 *  Basically, create an element, attach a download tag to it, link data as href, click button, delete element.
 */

const downloadReport = async () => {
  const report = await getReport();
  console.log(report);
  if (report) {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(report)
    );
    element.setAttribute("download", `hour-report.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return true;
  }
  return null;
};

export { getReport, downloadReport };
