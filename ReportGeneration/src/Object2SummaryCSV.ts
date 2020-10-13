import { dataJsonType } from "./data";

// whitelist some test emails if in development, otherwise blacklsit them
const DEBUGMODE = process.env.NODE_ENV === "development";

/** Pretty print names, etc. so that first char is upper and rest of string is lower */
const firstCharUpper = (x: string) => {
  if (x.length <= 1) return x.toUpperCase();
  return x[0].toUpperCase() + x.slice(1).toLowerCase();
};

/** Sorts the hour summary rows based on total hours */
const sortHourSummary = (a: string[], b: string[]) => {
  // header should always be on top
  if (a[6] === "Total Hours") return -1;
  if (b[6] === "Total Hours") return 1;
  // sort by total hours
  if (Number(a[6]) > Number(b[6])) return -1;
  if (Number(a[6]) < Number(b[6])) return 1;
  if (Number(a[6]) === Number(b[6])) return 0;
  return 0; // dumb tslint compiler
};

const parseToCSVTotals = (dbObject: dataJsonType) => {
  let summaryRows = [
    [
      "First Name",
      "Last Name",
      "Year",
      "Email",
      "Total NHS Hours",
      "Total Key Club Hours",
      "Total Hours",
    ],
  ];

  for (const keyStudent in dbObject["users"]) {
    // removes test accounts by blacklist if debug mode is on
    if (!["s-dsudzilouski@lwsd.org"].includes(keyStudent) || DEBUGMODE) {
      const student = dbObject["users"][keyStudent];
      let studentNHSHours = 0;
      let studentKeyClubHours = 0;
      let studentTotalHours = 0;
      for (const keyEntry in student["entries"]) {
        const entry = student["entries"][keyEntry];
        if (entry._data.NHS === "Yes") {
          studentNHSHours += Number(entry._data.Hours);
        }
        if (entry._data.KeyClub === "Yes") {
          studentKeyClubHours += Number(entry._data.Hours);
        }
        studentTotalHours += Number(entry._data.Hours);
      }
      // studentInfo may be undefined
      let studentInfo = student?.profile?.info?._data;
      // case where a student has not recorded their profile info
      if (studentInfo === undefined) {
        studentInfo = {
          graduationYear: "N/A",
          lastName: "N/A",
          firstName: "N/A",
        };
      }
      summaryRows.push([
        // type assertion because the compiler isnt able to pick up the above case
        firstCharUpper(studentInfo!.firstName),
        firstCharUpper(studentInfo!.lastName),
        studentInfo!.graduationYear,
        keyStudent.toLowerCase(),
        studentNHSHours.toFixed(2),
        studentKeyClubHours.toFixed(2),
        studentTotalHours.toFixed(2),
      ]);
    }
  }
  summaryRows.sort(sortHourSummary);
  return summaryRows;
};

export { parseToCSVTotals };
