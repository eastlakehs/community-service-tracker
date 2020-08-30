import { VALIDATE_hours, VALIDATE_free_form } from "./validation";

test("Running Validation Tests for VALIDATE_hours", () => {
  expect(VALIDATE_hours(".5")).toBe(true);
  expect(VALIDATE_hours("0.5")).toBe(true);
  expect(VALIDATE_hours(".05")).toBe(true);
  expect(VALIDATE_hours("20")).toBe(true);
  expect(VALIDATE_hours("1.5")).toBe(true);
  expect(VALIDATE_hours("20.1")).toBe(true);
  expect(VALIDATE_hours("20.8")).toBe(true);
  expect(VALIDATE_hours("0")).toBe(true);
  expect(VALIDATE_hours("1.0")).toBe(true);

  expect(VALIDATE_hours("0ajsf.")).toBe(false);
  expect(VALIDATE_hours("dfsjaf")).toBe(false);
  expect(VALIDATE_hours(".")).toBe(false);
  expect(VALIDATE_hours("")).toBe(false);
  expect(VALIDATE_hours(" ")).toBe(false);
  expect(VALIDATE_hours("   ")).toBe(false);
});

test("Running Validation Tests for VALIDATE_free_form", () => {
  expect(VALIDATE_free_form("a")).toBe(true);
  expect(VALIDATE_free_form("wafeda")).toBe(true);

  expect(VALIDATE_free_form("")).toBe(false);
  expect(VALIDATE_free_form(" ")).toBe(false);
  expect(VALIDATE_free_form("          ")).toBe(false);
  expect(VALIDATE_free_form("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(false);
});
