import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  const [cookies, setCookie] = useCookies(["sessionID"]);
  const [user] = useContext(UserContext);
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-black text-white font-bold">
      <ul className="flex flex-row items-center p-4 gap-6 justify-between ml-4 mr-20">
        <Link to="/">
          <img src={logo} className="h-24" alt="Logo" />
        </Link>
        <div className="flex items-center">
          <span className="text-gray-300">
            <BsSearch className="w-6 h-6" />
          </span>
          <input
            type="search"
            placeholder="Search"
            className="w-[25rem] h-10 px-4 py-2 ml-6 text-black rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <Link to="/products">
          <li>Products</li>
        </Link>       
        <div className="flex items-center">
          <li className="text-4xl relative group">
            <GiShoppingCart className="group-hover:text-blue-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-red-500 rounded-full text-white">
              1
            </span>
          </li>
        </div>
        <li className="text-2xl group flex items-center gap-6 relative">
          <FaUser
            className="group-hover:text-blue-500 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <div>
            {user.name ? (
              <span>Hello {user.name}</span>
            ) : (
              <span className="text-xl">Profile</span>
            )}
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute z-10 left-0 top-full mt-2 bg-white text-gray-700 rounded shadow`}
          >
            <ul className="py-2">
              {user.email && user.localId && (
                <Link to={`/profile/${user.localId}`}>
                  <li className="text-[17px] py-1 px-4 hover:bg-blue-500">
                    Profile
                  </li>
                </Link>
              )}
              {cookies.sessionID ? (
                <Link to="logout">
                  <li className="text-[17px] py-1 px-4 hover:bg-blue-500">
                    Logout
                  </li>
                </Link>
              ) : (
                <Link to="/login">
                  <li className="text-[17px] py-1 px-4 hover:bg-blue-500">
                    Login
                  </li>
                </Link>
              )}
              {!cookies.sessionID && (
                <Link to="register">
                  <li className="text-[17px] py-1 px-4 hover:bg-blue-500">
                    Register
                  </li>
                </Link>
              )}

              {user.role === "admin" && (
                <Link to="/admin">
                  <li className="text-[17px] py-1 px-4 hover:bg-blue-500">
                    Admin
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
