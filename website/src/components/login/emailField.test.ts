import { basicEmailValidation } from "./loginForm";

test("Running Validation Tests for basicEmailValidation", () => {
  expect(basicEmailValidation("test")).toBe("bad-format");
  expect(basicEmailValidation("awefwaefwe")).toBe("bad-format");
  expect(basicEmailValidation("a.awefjweo@asjdi")).toBe("bad-format");
  expect(basicEmailValidation("20")).toBe("bad-format");
  expect(basicEmailValidation("test@gmail.com")).toBe("invalid-domain");
  expect(basicEmailValidation("test@lwsd.edu")).toBe("invalid-domain");
  expect(basicEmailValidation("s-abc@bellevuecollege.org")).toBe(
    "invalid-domain"
  );
  expect(basicEmailValidation("s-jizhang@lwsd.org")).toBe("valid-email");
  expect(basicEmailValidation("eastlakekey@gmail.com")).toBe("valid-email");
  expect(basicEmailValidation("s-cye@lwsd.org")).toBe("valid-email");
  expect(basicEmailValidation("janedoe@bellevuecollege.edu")).toBe(
    "valid-email"
  );
});
