/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import sendEmailAuth from "../../Firebase/linkAuth/sendEmailAuth";

import { useHistory } from "react-router-dom";
import { selectSignedInState } from "../../Redux/signedInSlice";
import { useSelector } from "react-redux";
type emailState =
  | "base"
  | "email-send-failed"
  | "form-validation-error"
  | "email-send-successfully";

const UserHint: React.FunctionComponent<{ state: emailState }> = ({
  state,
}) => {
  if (state === "base")
    return (
      <p className="text-red-500 text-base italic">
        Please enter a valid school email (lwsd.org or bellevuecollege.edu) email address.
      </p>
    );
  if (state === "email-send-failed")
    return (
      <p className="text-red-500 text-base italic">
        Email send failed. Please try again later or contact contact for help.
      </p>
    );
  if (state === "form-validation-error")
    return (
      <p className="text-red-500 text-base italic">
        Improperly formatted email or email is not an lwsd email address.
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

const basicEmailValidation = (email: string) => {
  const isAdmin = [
    "eastlakekey@gmail.com",
    "daniel@sudzilouski.com",
    "s-dsudzilouski@lwsd.org",
    "s-jizhang@lwsd.org",
  ].includes("email");
  const isFormatted = email.includes(".") && email.includes("@");
  const isInDomain =
    email.endsWith("@lwsd.org") || email.endsWith("@bellevuecollege.edu");
  return isFormatted && (isInDomain || isAdmin);
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
              if (basicEmailValidation(emailInput)) {
                const result = await sendEmailAuth(emailInput);
                if (result) {
                  setEmailState("email-send-successfully");
                } else {
                  setEmailState("email-send-failed");
                }
              } else {
                setEmailState("form-validation-error");
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

export default LoginForm;
