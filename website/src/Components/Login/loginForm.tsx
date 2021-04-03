/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import sendEmailAuth from "../../Firebase/linkAuth/sendEmailAuth";

import { useHistory } from "react-router-dom";
import { selectSignedInState } from "../../Redux/signedInSlice";
import { useSelector } from "react-redux";
type emailState =
  | "base"
  | "email-send-failed"
  | "email-send-successfully"
  | "error-bad-format"
  | "error-invalid-domain";

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

const basicEmailValidation = (email: string) : number => {
  const isAdmin = [
    "eastlakekey@gmail.com",
    "daniel@sudzilouski.com",
    "s-dsudzilouski@lwsd.org",
    "s-jizhang@lwsd.org",
  ].includes("email");
  const isFormatted = email.includes(".") && email.includes("@");
  const isInDomain =
    email.endsWith("@lwsd.org") || email.endsWith("@bellevuecollege.edu");
  
  // 0: no error
  // 1: bad format
  // 2: invalid domain
  if (isAdmin)
    return 0;
  if (!isFormatted)
    return 1;
  if (!isInDomain)
    return 2;
  return 0;
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
                case 0:
                  const result = await sendEmailAuth(emailInput);
                  if (result) {
                    setEmailState("email-send-successfully");
                  } else {
                    setEmailState("email-send-failed");
                  }
                  break;
                case 1:
                  setEmailState("error-bad-format");
                  break;
                case 2:
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
