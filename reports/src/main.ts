import stringify = require("csv-stringify");
import fs = require("fs");
import { db } from "./setup";

import { cloneDbAsJson } from "./Firestore2Object";
import { parseToCSVTotals } from "./Object2SummaryCSV";

/** This is an implementation of how Firestore2Object.ts and Object2SummaryCSV.ts can be used
 *  To save a csv file of the current hour summaries.
 *
 *  This implementation is for test uses only.
 *
 *
 */
const main = async () => {
  const dbObject = await cloneDbAsJson(db);
  const csvData = parseToCSVTotals(dbObject, false);

  stringify(csvData, (err, output) => {
    if (err) {
      console.log(err?.message, err?.name, err?.stack);
    }
    try {
      fs.unlinkSync("output.csv");
      console.log("output.csv found, overwriting");
    } catch {
      console.log("output.csv not found, creating");
    }
    fs.writeFileSync("output.csv", output);
  });
};

main().then(() => {
  console.log("DONE");
});
