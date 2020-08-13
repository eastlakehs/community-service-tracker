/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import sendEmailAuth from "../../Firebase/linkAuth/sendEmailAuth";
const LoginForm = () => {
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full mb-32">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-2xl font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="s-student@lwsd.org"
          />
          <p className="text-red-500 text-base italic">
            Please enter your lwsd.org email adress.
          </p>
        </div>
        <div className="mb-6"></div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              sendEmailAuth("daniel@sudzilouski.com");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
