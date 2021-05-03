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

/** Sorts the awards report rows based on the highest award  */
const sortAwardReport = (a: string[], b: string[]) => {
  // header should always be on top
  if (a[4] === "Highest Award") return -1;
  if (b[4] === "Highest Award") return 1;
  // sort by total hours
  if (parseInt(a[4], 10) > parseInt(b[4], 10)) return -1;
  if (parseInt(a[4], 10) < parseInt(b[4], 10)) return 1;
  if (parseInt(a[4], 10) === parseInt(b[4], 10)) return 0;
  return 0; // dumb tslint compiler
};

/** What award a student should get based on their total hours */
const hourToAward = (hours: number) => {
  if (hours >= 200) return "200 hours award";
  if (hours >= 150) return "150 hours award";
  if (hours >= 100) return "100 hours award";
  if (hours >= 50) return "50 hours award";
  return null; // no award
};

/** Generates the actual csv which is represented by nested array of rows
 *  dbObject: the copy of the downloaded database as a json object
 *
 *  award: if we are generating an awards list or not. An awards list does not
 *         include club breakdowns and includes only 50, 100, 150, and 200 hour
 *         benchmarks based on the total hours.
 */
const parseToCSVTotals = (dbObject: dataJsonType, isAwardsList: boolean) => {
  let summaryRows = [
    [
      "First Name",
      "Last Name",
      "Year",
      "Email",
      ...(isAwardsList ? [] : ["Total NHS Hours"]),
      ...(isAwardsList ? [] : ["Total Key Club Hours"]),
      ...(isAwardsList ? [] : ["Total Hours"]),
      ...(isAwardsList ? ["Highest Award"] : []),
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
      // studentInfo may be undefined. However, if a profile exists then graduationYear, lastName, and firstName
      // fields will also exist but may be empty based on our UI code.
      let studentInfo = student?.profile?.info?._data;
      // case where a student has not recorded their profile info
      if (studentInfo === undefined) {
        studentInfo = {
          graduationYear: "N/A",
          lastName: "N/A",
          firstName: "N/A",
        };
      }
      summaryRows.push(
        // if hours are less than 50 and we are generating awards list, omit the student.
        ...(isAwardsList && hourToAward(studentTotalHours) === null
          ? []
          : [
              [
                firstCharUpper(studentInfo.firstName),
                firstCharUpper(studentInfo.lastName),
                studentInfo!.graduationYear,
                keyStudent.toLowerCase(),
                // different data is added to a spreadsheet based on if we are generating an awards list or not
                ...(isAwardsList ? [] : [studentNHSHours.toFixed(2)]),
                ...(isAwardsList ? [] : [studentKeyClubHours.toFixed(2)]),
                ...(isAwardsList ? [] : [studentTotalHours.toFixed(2)]),
                ...(isAwardsList ? [hourToAward(studentTotalHours)!] : []),
              ],
            ])
      );
    }
  }
  summaryRows.sort(isAwardsList ? sortAwardReport : sortHourSummary);
  return summaryRows;
};

export { parseToCSVTotals };
