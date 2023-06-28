import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [avatar, setAvatar] = useState(null);  

  const handleFileInputChange = (e) => {
    const file = e.currentTarget.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const registrationData = {
      username: username,
      email: email,
      password: password,
    };
  
    const passwordLength = password.length;
  
    if (passwordLength < 6) {
      alert("Password needs to be 6 characters or longer");
      return;
    } else if (username.length < 3) {
      alert("name must be at least 3 characters long");
      return;
    } else if (!email.includes("@")) {
      alert("email must include @");
      return;
    } else if (!email.includes(".")) {
      alert("email must include .");
      return;
    }
  
    try {
      // Regisztrációs adatok küldése a register végpontra
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
  
      const resBody = await response.json();
  
      if (resBody.success === true) {
        alert("Registration successful");
        navigate("/login");
  
        // Képfeltöltés külön lépésként
        const formDataImage = new FormData();
        formDataImage.append("avatar", avatar);
  
        const uploadResponse = await fetch(
          "http://localhost:8000/upload/user",
          {
            method: "POST",
            body: formDataImage,
          }
        );
  
        const uploadResBody = await uploadResponse.json();
  
        if (uploadResBody.success === true) {
          console.log("File uploaded successfully!");
        } else {
          alert(uploadResBody.message);
        }
      } else {
        alert(resBody.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register a new account
        </h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    autoComplete="name"
                    id="name"
                    required
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full text-gray-300"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span className="cursor-pointer">Upload File</span>
                    <input
                      id="file-input"
                      name="avatar"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-med rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
