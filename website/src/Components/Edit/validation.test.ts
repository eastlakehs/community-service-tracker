import { VALIDATE_hours, VALIDATE_date } from "./validation";

test("Running Validation Tests for VALIDATE_hours", () => {
  expect(VALIDATE_hours(".")).toBe(false);
  expect(VALIDATE_hours(".5")).toBe(true);
  expect(VALIDATE_hours("0.5")).toBe(true);
  expect(VALIDATE_hours(".05")).toBe(true);
  expect(VALIDATE_hours("0ajsf.")).toBe(false);
  expect(VALIDATE_hours("dfsjaf")).toBe(false);
  expect(VALIDATE_hours("20")).toBe(true);
  expect(VALIDATE_hours("1.5")).toBe(true);
  expect(VALIDATE_hours("20.1")).toBe(true);
  expect(VALIDATE_hours("20.8")).toBe(true);
});

test("Running Validation Tests for VALIDATE_date", () => {
  expect(VALIDATE_date("12345678")).toBe(false);
  expect(VALIDATE_date("12/06/20")).toBe(true);
  expect(VALIDATE_date("0.5")).toBe(true);
  expect(VALIDATE_date(".05")).toBe(true);
  expect(VALIDATE_date("0ajsf.")).toBe(false);
  expect(VALIDATE_date("dfsjaf")).toBe(false);
  expect(VALIDATE_date("20")).toBe(true);
  expect(VALIDATE_date("1.5")).toBe(true);
  expect(VALIDATE_date("20.1")).toBe(true);
  expect(VALIDATE_date("20.8")).toBe(true);
});
