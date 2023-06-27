import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from "../../contexts/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  const [cookies, setCookie] = useCookies("user");
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();   
  

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((resp) => resp.json())
      .then((resBody) => {
        alert("Login successful");
        setUser(resBody);
        setCookie("sessionID", resBody.sessionID);
        navigate("/"); // Átirányítás az alapoldalra
        if (resBody.role === "admin") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleChange}
                   
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handleChange}
                    
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
              <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="rememember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  />
                  Remember me
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot Password?
                  </a>
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
                <h4>Not have any account?</h4>
                <Link to="/register" className="text-blue-600 pl-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
