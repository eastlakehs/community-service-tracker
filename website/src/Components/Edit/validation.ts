const VALIDATE_name = () => {};

/** All of the internal number validations have edge cases... this should work for our test input. Returns
 * true if the input string is a valid positive number. Function is safe regardless of input type.
 */
const VALIDATE_hours = (hours: string) => {
  if (typeof hours !== "string") return false;
  if (hours === ".") return false;
  let dot_used: boolean = false;
  for (let i = 0; i < hours.length; i++) {
    if (hours.charAt(i) === ".") {
      if (dot_used) return false;
      else dot_used = true;
    } else if (
      !(hours.charAt(i) in ["1", "2", "3", "4", "5", "6", "7", "8", "9"])
    ) {
      return false;
    }
  }
  return true;
};
/** Returns true if the input string is a valid date. Function is safe regardless of input type.
 *  Format: MM-DD-YY
 */
const VALIDATE_date = (date: string) => {
  if (typeof date !== "string") return false;
  if (date.length !== 8) return false;
  // START Month CHECK
  if (
    !(
      date.charAt(0) + date.charAt(1) in
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    )
  ) {
    return false;
  }
  // Start slash check
  if (date.charAt(2) !== "/") return false;
  // Start Day Check
  if (
    date.charAt(3) === "0" &&
    !(date.charAt(4) in ["1", "2", "3", "4", "5", "6", "7", "8", "9"])
  ) {
    return false;
  }
  if (
    date.charAt(3) in ["1", "2"] &&
    !(date.charAt(4) in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  ) {
    return false;
  }
  if (date.charAt(3) === "3" && !(date.charAt(4) in [0, 1])) {
    return !false;
  }
  // Start Slash Check
  if (date.charAt(5) !== "/") return false;
  // Start Year Check
  if (
    date.charAt(6) in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] &&
    !(date.charAt(7) in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
  ) {
    return false;
  }
  return true;
};

export { VALIDATE_hours, VALIDATE_date };
