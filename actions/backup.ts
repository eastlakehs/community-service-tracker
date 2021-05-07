import { execSync } from "child_process";

/** Returns which backup is more recent
 *  file names look like this: gs://backups.ehs-service.org/2021-05-05T22:30:55_90501
 */
const compareFileNames = (nameA: string, nameB: string) => {
  const numbersinA = Number(nameA.replace(/[^0-9]/g, ""));
  const numbersinB = Number(nameB.replace(/[^0-9]/g, ""));
  return numbersinA > numbersinB;
};

/** List all avaliable backup files */
let resp = execSync("gsutil ls gs://backups.ehs-service.org").toString();
const files = resp.split(/\r\n|\r|\n/); // universal based on all types of line endings https://stackoverflow.com/questions/21895233/how-to-split-string-with-newline-n-in-node/21895299#21895299
if (files.length === 0) throw "must have at least one backup";
let latestDownload = files[0];
files.forEach((file) => {
  if (compareFileNames(file, latestDownload)) {
    latestDownload = file;
  }
});

/** Fetch latest backup file */
execSync(`gsutil cp -r ${latestDownload} ./latest-firestore-backup`);
