import React, { useState, useContext, useRef } from "react";
import { userContext } from "../../contexts/userContext";
import { uploadEntry } from "../../repositories/crud";
import { avatarEndpoint } from "../../repositories/apiEndPoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadAvatar() {
  const [avatar, setAvatar] = useState(null);
  const { updateProfile, setUpdateProfile, user } = useContext(userContext);

  const inputRef = useRef(null);

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    setAvatar(file);
  }

  const resetFileInput = () => {
    // resetting the input value
    inputRef.current.value = null;
  };

  function handleSubmitAvatar(e) {
    e.preventDefault();

    if (!avatar) {
      toast.error("Please select an avatar image", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    let formData = new FormData();
    formData.append("file", avatar);

    try {
      uploadEntry(formData, `${avatarEndpoint}/${user.localId}`).then((res) => {
        if (res.ok) {
          setAvatar(null);
          resetFileInput();
          setUpdateProfile(!updateProfile);
          toast.success("Avatar uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } catch (err) {
      toast.error("Avatar upload failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-10">
      <h2 className="text-2xl font-bold">Upload your Avatar!</h2>
      <h2>Chose your file from your Computer!</h2>

      <label
        htmlFor="file-input"
        className="flex items-center justify-center border border-second font-bold rounded-lg px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        <input
          id="file-input"
          name="file"
          type="file"
          ref={inputRef}
          accept=".jpg,.jpeg,.png"
          onChange={handleFileInputChange}
        />
      </label>

      {avatar && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Your Avatar Preview:</h2>
          <div className="inline-block h-24 w-24 rounded-full overflow-hidden border border-black mt-3">
            <img
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              className="h-full w-full object-cover rounded-full text-gray-300"
            />
          </div>
        </div>
      )}

      <button type="submit" className="Button" onClick={handleSubmitAvatar}>
        Send
      </button>
    </div>
  );
}
