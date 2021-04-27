import { filterAdminResult } from "./search";
import { profileAndEmail } from "../../Firebase/firestore/getListOfAllUsers";

const testData1: profileAndEmail[] = [
  {
    email: "s-dsudzilouski@lwsd.org",
    graduationYear: "2021",
    firstName: "Daniel",
    lastName: "Sudzilouski",
  },
];
describe("Checking basic search cases", () => {
  test("Should match hit one word search", () => {
    expect(filterAdminResult("dan", testData1).length).toBe(1);
    expect(filterAdminResult("d", testData1).length).toBe(1);
    expect(filterAdminResult("daniel", testData1).length).toBe(1);
    expect(filterAdminResult("s", testData1).length).toBe(1);
    expect(filterAdminResult("s-dsudzi", testData1).length).toBe(1);
    expect(filterAdminResult("s-dsudzilouski@lwsd.org", testData1).length).toBe(
      1
    );
  });
  test("Should not match hit one word search", () => {
    expect(filterAdminResult("0", testData1).length).toBe(0);
    expect(filterAdminResult("a", testData1).length).toBe(0);
    expect(filterAdminResult("aniel", testData1).length).toBe(0);
    expect(filterAdminResult("doe", testData1).length).toBe(0);
    expect(filterAdminResult("bobby", testData1).length).toBe(0);
    expect(filterAdminResult("j-john", testData1).length).toBe(0);
    expect(filterAdminResult("dsadsa", testData1).length).toBe(0);
  });
  test("Should match hit multi word search", () => {
    expect(
      filterAdminResult(
        "dan s-dsudz 20 2021 s-dsudzilouski@lwsd.org",
        testData1
      ).length
    ).toBe(1);
  });
  test("Should not match hit multi word search", () => {
    expect(filterAdminResult("danf s-dsudz 20", testData1).length).toBe(0);
  });
});
