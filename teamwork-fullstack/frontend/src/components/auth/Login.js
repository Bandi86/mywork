import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../contexts/userContext.js";
import { useNavigate } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginEndpoint } from "../../repositories/apiEndPoints.js";
import {
  emailValidation,
  passwordValidation,
} from "../../services/inputvalidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const navigate = useNavigate();

  // Check if the user is already logged in (using local storage) when the component mounts
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((resp) => resp.json()
        .then((resBody) => {
          if (resBody.success === false) {
            toast.error("Login failed Invalid password or email", {
              position: "top-center",
            });
          } else if (resBody.success === true) {
            toast.success("Login successful", {
              position: "top-center",
            });

            // Save the user data to local storage
            localStorage.setItem("user", JSON.stringify(resBody));
            setIsLoggedIn(true); // Set the isLoggedIn state to true
            // setCookie("sessionID", resBody.sessionID);
            document.cookie = `sessionID=${resBody.sessionID}; path=/`;
          }
        }))

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isLoggedIn && user.role) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn, user]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-main sm:px-6 lg:px-8">
      <h2 className="text-center mb-20 font-bold text-black text-4xl">Login</h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className="flex max-w-md flex-col gap-4"
        >
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
          <Button type="submit" className="bg-blue-500">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
