/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import sendEmailAuth from "../../firebase/link-auth/sendEmailAuth";
import { isAdmin } from "../../constants/isAdmin";
import { useHistory } from "react-router-dom";
import { selectSignedInState } from "../../redux/signedInSlice";
import { useSelector } from "react-redux";
type emailState =
  | "base"
  | "email-send-failed"
  | "email-send-successfully"
  | "error-bad-format"
  | "error-invalid-domain";

type emailValidationState = "valid-email" | "bad-format" | "invalid-domain";

const UserHint: React.FunctionComponent<{ state: emailState }> = ({
  state,
}) => {
  if (state === "base")
    return (
      <p className="text-red-500 text-base italic">
        Please enter a valid school email (lwsd.org or bellevuecollege.edu)
        email address.
      </p>
    );
  if (state === "email-send-failed")
    return (
      <p className="text-red-500 text-base italic">
        Email send failed. Please try again later or contact contact for help.
      </p>
    );
  if (state === "error-bad-format")
    return (
      <p className="text-red-500 text-base italic">
        Improperly formatted email.
      </p>
    );
  if (state === "error-invalid-domain")
    return (
      <p className="text-red-500 text-base italic">
        Email is not an lwsd email address.
      </p>
    );
  if (state === "email-send-successfully")
    return (
      <p className="text-green-500 text-base italic">
        Email sent sucessfully. Make sure to check clutter/spam
      </p>
    );
  return null;
};

function validateFormatEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

const basicEmailValidation = (email: string): emailValidationState => {
  const isFormatted = validateFormatEmail(email);
  const isInDomain =
    email.endsWith("@lwsd.org") || email.endsWith("@bellevuecollege.edu");

  if (isAdmin(email)) return "valid-email";
  if (!isFormatted) return "bad-format";
  if (!isInDomain) return "invalid-domain";
  return "valid-email";
};

const LoginForm = () => {
  const signedInstate = useSelector(selectSignedInState);
  const history = useHistory();
  const [emailState, setEmailState] = useState<emailState>("base");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (signedInstate.signedIn) {
      history.replace("/profile");
    }
  });
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full mb-32">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-2xl font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="student@school"
            onChange={(email) => {
              setEmailInput(email.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <UserHint state={emailState} />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={async () => {
              switch (basicEmailValidation(emailInput)) {
                case "valid-email":
                  const result = await sendEmailAuth(emailInput);
                  if (result) {
                    setEmailState("email-send-successfully");
                  } else {
                    setEmailState("email-send-failed");
                  }
                  break;
                case "bad-format":
                  setEmailState("error-bad-format");
                  break;
                case "invalid-domain":
                  setEmailState("error-invalid-domain");
                  break;
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Login Link
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm, basicEmailValidation };
