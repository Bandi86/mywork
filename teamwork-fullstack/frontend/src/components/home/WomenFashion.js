import React from 'react'
import women from "../../assets/328138.1200x630b.jpg";
import { Link } from "react-router-dom";

export default function WomenFashion() {
  return (
    <div className="women-info-container flex flex-col items-center mt-4 p-6 bg-white bg-opacity-75 rounded-md shadow-md">
    <div className="women-image-container w-[40rem] h-[20rem] overflow-hidden">
      <img src={women} alt="Women's Fashion" className="object-cover w-full h-full" />
    </div>
    <div className="flex flex-col items-center mt-4 p-6 gap-10 bg-slate-100 bg-opacity-75 rounded-md shadow-md">
      <h2 className="text-4xl font-bold text-purple-600 animate-pulse">
        Women's Fashion
      </h2>
      <p className="text-xl text-gray-700">
        Trendy and comfortable clothing for women.
      </p>
      <p className="text-lg text-gray-700">
        If you want to see all, check this link
      </p>
      <Link to="/products" className="text-blue-500 font-bold hover:underline">
        All Products
      </Link>
    </div>
  </div>
  )
}
