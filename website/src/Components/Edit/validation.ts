import { ValidationMessage } from "./validationMessage";

/** All of the internal number validations have edge cases... this should work for our test input. Returns
 * true if the input string is a valid positive number. Function is safe regardless of input type.
 */
const VALIDATE_hours = (hours: string): ValidationMessage => {
  if (typeof hours !== "string") return { validate: false, message: "Input Not String" };
  if (!VALIDATE_free_form(hours).validate) return { validate: false, message: "Input Empty or too Long" };
  if (hours === ".") return { validate: false, message: "Invalid Hour" };
  let dot_used: boolean = false;
  for (let i = 0; i < hours.length; i++) {
    if (hours.charAt(i) === ".") {
      if (dot_used) return { validate: false, message: "Invalid Hour" };
      else dot_used = true;
    } else if (
      !(hours.charAt(i) in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
    ) {
      return { validate: false, message: "Invalid Hour" };
    }
  }
  return { validate: true, message: "" };
};

const VALIDATE_free_form = (text: string): ValidationMessage => {
  const trimmedText = text.trim()
  if (trimmedText.length === 0) {
    return { validate: false, message: "Input Empty" };
  }
  else if (trimmedText.length > 100) {
    return { validate: false, message: "Input Too Long" };
  }
  return { validate: true, message: "" };
}

export { VALIDATE_hours, VALIDATE_free_form };
