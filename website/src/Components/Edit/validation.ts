const VALIDATE_name = () => {};

/** All of the internal number validations have edge cases... this should work for our test input. Returns
 * true if the input string is a valid positive number. Function is safe regardless of input type.
 */
const VALIDATE_hours = (hours: string) => {
  if (typeof hours !== "string") return false;
  if (!VALIDATE_free_form(hours)) return false;
  if (hours === ".") return false;
  let dot_used: boolean = false;
  for (let i = 0; i < hours.length; i++) {
    if (hours.charAt(i) === ".") {
      if (dot_used) return false;
      else dot_used = true;
    } else if (
      !(hours.charAt(i) in ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"])
    ) {
      return false;
    }
  }
  return true;
};

const VALIDATE_free_form = (text: string) => {
  const trimmedText = text.trim()
  if (trimmedText.length === 0 || trimmedText.length > 100) return false;
  return true;
}

export { VALIDATE_hours, VALIDATE_free_form };
