import {
  VALIDATE_hours,
  VALIDATE_free_form,
  VALIDATE_graduation,
  VALIDATE_date,
} from "./validation";

import {
  convertSerializedToHtmlDate,
  serializeHtmlDate,
} from "../entry/dateField";

test("Running Validation Tests for VALIDATE_hours", () => {
  expect(VALIDATE_hours(".5").validate).toBe(true);
  expect(VALIDATE_hours("0.5").validate).toBe(true);
  expect(VALIDATE_hours(".05").validate).toBe(true);
  expect(VALIDATE_hours("20").validate).toBe(true);
  expect(VALIDATE_hours("1.5").validate).toBe(true);
  expect(VALIDATE_hours("20.1").validate).toBe(true);
  expect(VALIDATE_hours("20.8").validate).toBe(true);
  expect(VALIDATE_hours("0").validate).toBe(true);
  expect(VALIDATE_hours("1.0").validate).toBe(true);

  expect(VALIDATE_hours("0ajsf.").validate).toBe(false);
  expect(VALIDATE_hours("dfsjaf").validate).toBe(false);
  expect(VALIDATE_hours(".").validate).toBe(false);
  expect(VALIDATE_hours("").validate).toBe(false);
  expect(VALIDATE_hours(" ").validate).toBe(false);
  expect(VALIDATE_hours("   ").validate).toBe(false);
});

test("Running Validation Tests for VALIDATE_free_form", () => {
  expect(VALIDATE_free_form("a").validate).toBe(true);
  expect(VALIDATE_free_form("wafeda").validate).toBe(true);

  expect(VALIDATE_free_form("").validate).toBe(false);
  expect(VALIDATE_free_form(" ").validate).toBe(false);
  expect(VALIDATE_free_form("          ").validate).toBe(false);
  expect(
    VALIDATE_free_form(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).validate
  ).toBe(false);
});

//This function is here to avoid hard coded years in the tests, by returning the current year plus a specified number of years as a string
function thisYearPlus(years: number): string {
  let year = new Date().getFullYear();
  year += years;
  return year.toString();
}

test("Running Validation Tests for VALIDATE_graduation", () => {
  //Tests expected graduation years
  expect(VALIDATE_graduation(thisYearPlus(0)).validate).toBe(true);
  expect(VALIDATE_graduation(thisYearPlus(1)).validate).toBe(true);
  expect(VALIDATE_graduation(thisYearPlus(2)).validate).toBe(true);
  expect(VALIDATE_graduation(thisYearPlus(3)).validate).toBe(true);
  expect(VALIDATE_graduation(thisYearPlus(4)).validate).toBe(true);
  expect(VALIDATE_graduation(thisYearPlus(5)).validate).toBe(true);

  //Tests graduation years slightly around the limit
  expect(VALIDATE_graduation(thisYearPlus(-1)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(6)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(7)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(10)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(20)).validate).toBe(false);

  //Tests bonkers years that should never be valid
  expect(VALIDATE_graduation("").validate).toBe(false);
  expect(VALIDATE_graduation(NaN).validate).toBe(false);
  expect(VALIDATE_graduation(2021.24).validate).toBe(false); //floating point
  expect(VALIDATE_graduation(" ").validate).toBe(false);
  expect(VALIDATE_graduation("          ").validate).toBe(false);
  expect(VALIDATE_graduation("a").validate).toBe(false);
  expect(VALIDATE_graduation("1800").validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(-6000)).validate).toBe(false);
  expect(VALIDATE_graduation("0000").validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(100)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(50)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(800)).validate).toBe(false);
  expect(VALIDATE_graduation(thisYearPlus(99999)).validate).toBe(false);
  expect(VALIDATE_graduation("20aa").validate).toBe(false);
  expect(VALIDATE_graduation(":) :(").validate).toBe(false);
});

test("Running Validation Tests for VALIDATE_date", () => {
  expect(VALIDATE_date("").validate).toBe(false);
  expect(VALIDATE_date(undefined).validate).toBe(false);
  expect(VALIDATE_date('{"year":2020,"month":0,"day":14}').validate).toBe(
    false
  );
  expect(VALIDATE_date('{"year":2020,"month":1,"day":0}').validate).toBe(false);
  expect(VALIDATE_date('{"year":2020,"month":1,"day":40}').validate).toBe(
    false
  );
  expect(VALIDATE_date('{"year":2020,"month":13,"day":20}').validate).toBe(
    false
  );
  expect(VALIDATE_date('{"year":2010,"month":1,"day":1}').validate).toBe(true);
  expect(VALIDATE_date('{"year":2020,"month":10,"day":14}').validate).toBe(
    true
  );
  expect(VALIDATE_date('{"year":2030,"month":12,"day":32}').validate).toBe(
    true
  );
});

test("Running Validation Tests for convertSerializedToHtmlDate", () => {
  expect(convertSerializedToHtmlDate("")).toBe("");
  expect(convertSerializedToHtmlDate('{"year":2010,"month":1,"day":14}')).toBe(
    "2010-01-14"
  );
  expect(convertSerializedToHtmlDate('{"year":2020,"month":10,"day":14}')).toBe(
    "2020-10-14"
  );
  expect(convertSerializedToHtmlDate('{"year":2030,"month":1,"day":1}')).toBe(
    "2030-01-01"
  );
});

test("Running Validation Tests for serializeHtmlDate", () => {
  expect(serializeHtmlDate("2010-01-14")).toStrictEqual({
    year: 2010,
    month: 1,
    day: 14,
  });
  expect(serializeHtmlDate("2020-10-14")).toStrictEqual({
    year: 2020,
    month: 10,
    day: 14,
  });
  expect(serializeHtmlDate("2030-01-01")).toStrictEqual({
    year: 2030,
    month: 1,
    day: 1,
  });
});
