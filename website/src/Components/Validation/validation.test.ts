import { VALIDATE_hours, VALIDATE_free_form } from "./validation";

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
  expect(VALIDATE_free_form("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").validate).toBe(false);
});
