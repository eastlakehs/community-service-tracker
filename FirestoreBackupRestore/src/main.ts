import { db, admin } from "./setup";
import { cloneDbAsJson } from "./backup";

const main = async () => {
  const dbObject = await cloneDbAsJson();
  console.log(JSON.stringify(dbObject));
};

main().then(() => {
  console.log("DONE");
});
