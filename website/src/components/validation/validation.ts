import { ValidationMessage } from "./validationMessage";

const charIsANumber = (c: string) => c in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

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

// where text is a JSON stringified {year: number, month: number, day: number}
const VALIDATE_date = (text?: string): ValidationMessage => {
  if (text) {
    const parsedObj = JSON.parse(text);
    if (
      typeof parsedObj.day === "number" &&
      typeof parsedObj.month === "number" &&
      typeof parsedObj.year === "number" &&
      parsedObj.day >= 1 &&
      parsedObj.day <= 32 &&
      parsedObj.month >= 1 &&
      parsedObj.month <= 12 &&
      parsedObj.year >= 2000 &&
      parsedObj.year <= 2100
    ) {
      return {
        validate: true,
        message: "",
      };
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
