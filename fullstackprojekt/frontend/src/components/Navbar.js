import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-black text-white font-bold">
            <ul className="flex flex-row items-center p-4 gap-6 justify-between ml-4 mr-4">
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Cart</li>
            <li>Login</li>
            <li>Register</li>
            <Link to="/admin"><li>Admin</li></Link>
        </ul>        
      </div>
    
  );
}
