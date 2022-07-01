import { totalizeHours } from "./totalizer";
import { initialStateType } from "../../../redux/userDataSlice";
const sampleData1: initialStateType = {
  header: ["Name", "Description", "Hour", "Date"],
  data: {
    key1: {
      NHS: "Yes",
      Name: "",
      Description: "",
      KeyClub: "Yes",
      NHSofficer: "",
      Hours: "1",
      Date: "",
      contactName: "",
      contactPhone: "",
      notes: "",
    },
  },
};

const sampleData2: initialStateType = {
  header: ["Name", "Description", "Hour", "Date"],
  data: {},
};

const sampleData3: initialStateType = {
  header: ["Name", "Description", "Hour", "Date"],
  data: {
    key1: {
      NHS: "Yes",
      Name: "",
      Description: "",
      KeyClub: "Yes",
      NHSofficer: "",
      Hours: "0.1",
      Date: "",
      contactName: "",
      contactPhone: "",
      notes: "",
    },
    key2: {
      NHS: "Yes",
      Name: "",
      Description: "",
      KeyClub: "Yes",
      NHSofficer: "",
      Hours: "100",
      Date: "",
      contactName: "",
      contactPhone: "",
      notes: "",
    },
    key3: {
      NHS: "Yes",
      Name: "",
      Description: "",
      KeyClub: "Yes",
      NHSofficer: "",
      Hours: "0.5",
      Date: "",
      contactName: "",
      contactPhone: "",
      notes: "",
    },
  },
};

test("Running totalizeHours test", () => {
  expect(totalizeHours(sampleData1)).toBe("1");
  expect(totalizeHours(sampleData2)).toBe("0");
  expect(totalizeHours(sampleData3)).toBe("100.6");
});
