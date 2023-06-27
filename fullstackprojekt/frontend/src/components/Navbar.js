import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Navbar() {
  const [cookies, setCookie] = useCookies(["sessionID"]);
  const [user] = useContext(UserContext);
  

  return (
    <div className="w-full bg-black text-white font-bold">
      <ul className="flex flex-row items-center p-4 gap-6 justify-between ml-4 mr-4">
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Products</li>
        <li>Categories</li>
        <li>Cart</li>
        {user.email && (
          <Link to="/profile/:localId">
            <li>Profile</li>
          </Link>
        )}

        {cookies.sessionID ? (
          <Link to="logout">
            <li>Kijelentkezés</li>
          </Link>
        ) : (
          <Link to="/login">
            <li>Login</li>
          </Link>
        )}

        <Link to="register">
          <li>Register</li>
        </Link>
        {user.role === "admin" && (
          <Link to="/admin">
            <li>Admin</li>
          </Link>
        )}
      </ul>
    </div>
  );
}
