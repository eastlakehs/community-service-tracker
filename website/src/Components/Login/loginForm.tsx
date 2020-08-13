/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import sendEmailAuth from "../../Firebase/linkAuth/sendEmailAuth";
import { stringify } from "querystring";

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
        Please enter your lwsd.org email adress.
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
        Improperly formatted email or email is not an lwsd email adress.
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
  if (
    email.endsWith("@lwsd.org") &&
    email.includes(".") &&
    email.includes("@")
  ) {
    return true;
  }
  return false;
};

const LoginForm = () => {
  const [emailState, setEmailState] = useState<emailState>("base");
  const [emailInput, setEmailInput] = useState("");
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full mb-32">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-2xl font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="s-student@lwsd.org"
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
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
