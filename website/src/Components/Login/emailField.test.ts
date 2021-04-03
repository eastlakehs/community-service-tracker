import { basicEmailValidation } from "./loginForm";

test("Running Validation Tests for basicEmailValidation", () => {
  expect(basicEmailValidation("test")).toBe(1);
  expect(basicEmailValidation("awefwaefwe")).toBe(1);
  expect(basicEmailValidation("a.awefjweo@asjdi")).toBe(1);
  expect(basicEmailValidation("20")).toBe(1);
  expect(basicEmailValidation("test@gmail.com")).toBe(2);
  expect(basicEmailValidation("test@lwsd.edu")).toBe(2);
  expect(basicEmailValidation("s-abc@bellevuecollege.org")).toBe(2);
  expect(basicEmailValidation("s-jizhang@lwsd.org")).toBe(0);
  expect(basicEmailValidation("eastlakekey@gmail.com")).toBe(0);
  expect(basicEmailValidation("s-cye@lwsd.org")).toBe(0);
});