'use client'
import Pagination from "@/app/components/admin/Pagination";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Az objektum típusa a megfelelő struktúrával
type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};

const page = 1; // Az aktuális oldal száma
const pageSize = 10; // Az oldalonkénti elemek száma

const Page = () => {
  const [products, setProducts] = useState([] as Product[]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      setProducts(data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateUniqueId = () => {
    return uuidv4(); // Egyedi azonosító generálása
  };

  return (
    <div className="flex flex-col w-full min-h-screen text-center items-center gap-10 bg-slate-200">
      <h1 className="text-3xl font-bold text-center mt-4">Manage Products</h1>
      <div className=" min-h-screen">
        <table className="table-auto h-auto border-b-2 border-slate-800 mb-4">
          <thead className="border-y-2 border-black">
            <tr>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Product Title</th>
              <th className="px-4 py-2">Product Description</th>
              <th className="px-4 py-2">Product Price</th>
              <th className="px-4 py-2">Product Category</th>
              <th className="px-4 py-2">Product Stock</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={generateUniqueId()}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="border px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="border px-4 py-2">
                  <button className="p-2 mt-2 text-lg text-white bg-black rounded-md">
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default Page;
