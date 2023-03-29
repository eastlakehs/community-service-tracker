import React from "react";

import { ErrorMessage } from "./errorMessage";
import { selectSignedInState } from "../../redux/signedInSlice";
import { useSelector } from "react-redux";
import { uploadPhoto } from "../../firebase/firestore/uploadPhoto";

const Button: React.FunctionComponent<{
  name: string;
  onClick: () => void;
}> = ({ name, onClick }) => (
  <button
    className={
      "w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    }
    onClick={() => {
      onClick();
    }}
  >
    {name}
  </button>
);

export const PictureField: React.FunctionComponent<{
  name: string;
  placeholder: string;
  hidden?: boolean;
  value: string[];
  addImage: (value: string) => void;
  removeImage: (value: string) => void;
  shouldShowError?: boolean;
  error?: boolean;
  errorMessage?: string;
}> = ({
  name,
  placeholder,
  hidden,
  value,
  addImage,
  removeImage,
  error,
  errorMessage,
  shouldShowError,
}) => {
  const signedInstate = useSelector(selectSignedInState);

  console.log(value);
  return (
    <>
      <div className={"flex flex-wrap -mx-3 mb-6 " + (hidden ? "hidden" : "")}>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Picture Upload
          </label>
          <input
            type="file"
            accept="image/*"
            className={
              "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
              (error && shouldShowError ? " border border-red-500" : "")
            }
            multiple={true}
            id="grid-first-name"
            // value={value}
            onChange={(e) => {
              let files = e.target.files;
              if (files) {
                for (let i = 0; i < files.length; i++) {
                  let file = files.item(i);
                  if (file) {
                    uploadPhoto(file, signedInstate.userEmail, "pictures").then(
                      (url) => {
                        if (url) {
                          addImage(url);
                        } else {
                          // error uploading image
                        }
                      }
                    );
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5 mb-5">
        {value.map((url) => (
          <div key={"div" + url} className="items-center">
            <img key={"img" + url} className="w-full" src={url}></img>
            <Button
              key={"button" + url}
              name="Delete"
              onClick={() => removeImage(url)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
