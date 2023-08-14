import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { registerEndpoint } from "../../repositories/apiEndPoints.js";
import {
  emailValidation,
  passwordValidation,
  userNameValidation,
} from "../../services/inputvalidation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registration() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(registerEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const resBody = await response.json();

      if (resBody.success === true) {
        toast.success(`Welcome ${username}! Registration Succesfull `, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      } else {
        toast.error("Email already registered or creation error occured. Try again!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-main sm:px-6 lg:px-8">
      <h2 className="text-center mb-20 font-bold text-black text-4xl">
        Register Account
      </h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            {isUsernameTouched ? (
              userNameValidation(username) ? (
                <TextInput
                  color="success"
                  helperText={
                    <>
                      <span className="font-medium text-black">
                        Username acceptable
                      </span>
                    </>
                  }
                  icon={BiUser}
                  id="username"
                  placeholder="Example Name"
                  required
                  shadow
                  type="text"
                  value={username}
                  autoComplete="on"
                  onFocus={() => setIsUsernameTouched(true)}
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                <TextInput
                  color="failure"
                  helperText={
                    <>
                      <span className="font-medium text-red-800">
                        Username is too short
                      </span>
                    </>
                  }
                  icon={BiUser}
                  id="username"
                  placeholder="Example Name"
                  required
                  shadow
                  type="text"
                  value={username}
                  autoComplete="on"
                  onFocus={() => setIsUsernameTouched(true)}
                  onChange={(e) => setUserName(e.target.value)}
                />
              )
            ) : (
              <TextInput
                color="info"
                icon={BiUser}
                id="username"
                placeholder="Example Name"
                required
                shadow
                type="text"
                value={username}
                autoComplete="on"
                onFocus={() => setIsUsernameTouched(true)}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            {isEmailTouched ? (
              emailValidation(email) ? (
                <TextInput
                  color="failure"
                  helperText={
                    <>
                      <span className="font-medium text-red-800">
                        {emailValidation(email)}
                      </span>
                    </>
                  }
                  icon={HiMail}
                  id="email"
                  placeholder="example@example.com"
                  required
                  shadow
                  type="email"
                  value={email}
                  autoComplete="on"
                  onFocus={() => setIsEmailTouched(true)}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <TextInput
                  color="success"
                  helperText={
                    <>
                      <span className="font-medium text-black">
                        Email is valid
                      </span>
                    </>
                  }
                  icon={HiMail}
                  id="email"
                  placeholder="example@example.com"
                  required
                  shadow
                  type="email"
                  value={email}
                  autoComplete="on"
                  onFocus={() => setIsEmailTouched(true)}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )
            ) : (
              <TextInput
                color="info"
                icon={HiMail}
                id="email"
                placeholder="example@example.com"
                required
                shadow
                type="email"
                value={email}
                autoComplete="on"
                onFocus={() => setIsEmailTouched(true)}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            {isPasswordTouched ? (
              passwordValidation(password) ? (
                <TextInput
                  color="failure"
                  helperText={
                    <>
                      <span className="font-medium text-red-800">
                        {passwordValidation(password)}
                      </span>
                    </>
                  }
                  icon={RiLockPasswordFill}
                  id="password"
                  placeholder="Enter password"
                  required
                  shadow
                  type="password"
                  value={password}
                  autoComplete="on"
                  onFocus={() => setIsPasswordTouched(true)}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <TextInput
                  color="success"
                  helperText={
                    <>
                      <span className="font-medium text-black">
                        Password is valid
                      </span>
                    </>
                  }
                  icon={RiLockPasswordFill}
                  id="password"
                  placeholder="Enter password"
                  required
                  shadow
                  type="password"
                  value={password}
                  autoComplete="on"
                  onFocus={() => setIsPasswordTouched(true)}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )
            ) : (
              <TextInput
                color="info"
                icon={RiLockPasswordFill}
                id="password"
                placeholder="Enter password"
                required
                shadow
                type="password"
                value={password}
                autoComplete="on"
                onFocus={() => setIsPasswordTouched(true)}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="repeat-password"
                value="Repeat password"
                color="gray"
              />
            </div>
            {isConfirmPasswordTouched ? (
              <TextInput
                icon={RiLockPasswordFill}
                color={
                  passwordValidation(confirmPassword) ? "failure" : "success"
                }
                id="confirmPassword"
                placeholder="Confirm password"
                required
                shadow
                type="password"
                value={confirmPassword}
                autoComplete="on"
                onFocus={() => setIsConfirmPasswordTouched(true)}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            ) : (
              <TextInput
                icon={RiLockPasswordFill}
                color="info"
                id="confirmPassword"
                placeholder="Confirm password"
                required
                shadow
                type="password"
                value={confirmPassword}
                autoComplete="on"
                onFocus={() => setIsConfirmPasswordTouched(true)}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>
          <Button type="submit" className="bg-blue-500">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
