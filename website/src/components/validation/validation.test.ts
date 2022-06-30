import {
  VALIDATE_hours,
  VALIDATE_free_form,
  VALIDATE_graduation,
  VALIDATE_date,
} from "./validation";

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
  expect(VALIDATE_date("2020-2-01").validate).toBe(false);
  expect(VALIDATE_date("202-200-01").validate).toBe(false);
  expect(VALIDATE_date(undefined).validate).toBe(false);
  expect(VALIDATE_date("2020-02-01").validate).toBe(true);
  expect(VALIDATE_date("2022-06-30").validate).toBe(true);
});
