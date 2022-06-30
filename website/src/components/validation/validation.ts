import { ValidationMessage } from "./validationMessage";
import { parseHtmlDate } from "../entry/dateField";

const charIsANumber = (c: string) =>
  c in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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
    } else if (!charIsANumber(hours.charAt(i))) {
      return { validate: false, message: "Invalid Hour" };
    }
  }
  return { validate: true, message: "" };
};

const VALIDATE_free_form = (
  text?: string,
  optional: boolean = false
): ValidationMessage => {
  if (text == null) {
    if (optional) {
      return { validate: true, message: "" };
    } else {
      return { validate: false, message: "Input Null" };
    }
  }
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
  const gradYear: number = Number(text);
  if (!Number.isInteger(gradYear)) {
    return { validate: false, message: "Invalid Year" };
  } else if (gradYear >= thisyear && gradYear <= thisyear + 5) {
    return { validate: true, message: "" };
  } else {
    return {
      validate: false,
      message: `Year should be between ${thisyear} and ${thisyear + 5}`,
    };
  }
};

const VALIDATE_date = (text?: string): ValidationMessage => {
  // has to be YYYY-MM-DD
  if (text && text.length === 10) {
    const parsedObj = parseHtmlDate(text);
    if (
      parsedObj.day.length === 2 &&
      parsedObj.month.length === 2 &&
      parsedObj.year.length === 4
    ) {
      if (charIsANumber(parsedObj.day[0]) && charIsANumber(parsedObj.day[1])) {
        if (
          charIsANumber(parsedObj.month[0]) &&
          charIsANumber(parsedObj.month[1])
        ) {
          if (
            charIsANumber(parsedObj.year[0]) &&
            charIsANumber(parsedObj.year[1]) &&
            charIsANumber(parsedObj.year[2]) &&
            charIsANumber(parsedObj.year[3])
          ) {
            return {
              validate: true,
              message: "",
            };
          }
        }
      }
    }
  }
  return {
    validate: false,
    message: "Date not selected",
  };
};

export {
  VALIDATE_hours,
  VALIDATE_free_form,
  VALIDATE_graduation,
  VALIDATE_date,
};
