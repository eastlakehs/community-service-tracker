import { isAdmin } from "./isAdmin";

it("should return true for admin users", () => {
  expect(isAdmin("daniel@sudzilouski.com")).toBe(true);
  expect(isAdmin("eastlakekey@gmail.com")).toBe(true);
});

it("should return false for non-admin users", () => {
  expect(isAdmin("foobar")).toBe(false);
  expect(isAdmin(null)).toBe(false);
  expect(isAdmin(undefined)).toBe(false);
});
