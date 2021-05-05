import { ValidationMessage } from "./validationMessage";

/** All of the internal number validations have edge cases... this should work for our test input. Returns
 * true if the input string is a valid positive number. Function is safe regardless of input type.
 */
const VALIDATE_hours = (hours?: string): ValidationMessage => {
  if (hours == null) return { validate: false, message: "Input Null" };
  if (typeof hours !== "string")
    return { validate: false, message: "Input Not String" };
  if (!VALIDATE_free_form(hours).validate)
    return { validate: false, message: "Input Empty or too Long" };
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

const VALIDATE_free_form = (text?: string): ValidationMessage => {
  if (text == null) return { validate: false, message: "Input Null" };
  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return { validate: false, message: "Input Empty" };
  } else if (trimmedText.length > 280) {
    return { validate: false, message: "Input Too Long" };
  }
  return { validate: true, message: "" };
};

const VALIDATE_graduation = (text: string): ValidationMessage => {
  const thisyear: number = new Date().getFullYear();
  //This grabs each number in the string into an array
  const matches = text.match(/(\d+)/);
  if (matches) {
    //If this is true, the extracted number is a different length than the string, meaning there's at least one character not part of the number in the string
    if (matches[0].length !== text.length) {
      return { validate: false, message: "Invalid Year" };
    }
    //This grabs the actual number from the string
    const num: number = parseInt(matches[0]);
    //If the year submitted is either this year, or less than or equal to 5 years from now, it's valid
    if (num >= thisyear && num <= thisyear + 5) {
      return { validate: true, message: "" };
    } else {
      return {
        validate: false,
        message:
          "Year should be between " + thisyear + " and " + (thisyear + 5),
      };
    }
  }
  //If all else fails, the year is invalid
  return { validate: false, message: "Invalid Year" };
};

export { VALIDATE_hours, VALIDATE_free_form, VALIDATE_graduation };
