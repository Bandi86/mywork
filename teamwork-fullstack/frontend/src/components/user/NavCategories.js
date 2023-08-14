import React, { useState, useEffect, useContext } from "react";
import { fetchCategories } from "../../repositories/refreshCrud";
import { NavLink } from "react-router-dom";
import { userContext } from "../../contexts/userContext";

export default function Categories() {
  const [allcat, setAllcat] = useState([]);
  const {isLoggedIn} = useContext(userContext)

  useEffect(() => {
    fetchCategories(100, 0, setAllcat);
  }, [isLoggedIn]);

  return (
    <div className="items-center bg-main">
      <ul className="flex flex-col md:flex-row md:h-8 md:items-center md:justify-center md:gap-20 md:ml-10 md:mr-10 text-black">
        {Array.isArray(allcat) &&
          allcat.map((cat) => (
            <li
              key={cat.id}
              className="text-sm font-bold uppercase cursor-pointer transition duration-300 relative hover:underline-offset-4 hover:border-second border-b-2"
            >
              <NavLink to={`/products/category/${cat.id}`}>{cat.name}</NavLink>
            </li>
          ))}
        <li className="text-sm font-bold uppercase cursor-pointer transition duration-300 relative hover:underline-offset-4 hover:border-second border-b-2">
          <NavLink to="/products">All Products</NavLink>
          <span className="absolute left-0 right-0 h-0.5 bg-second opacity-0 transition-all duration-300"></span>
        </li>
      </ul>
    </div>
  );
}
