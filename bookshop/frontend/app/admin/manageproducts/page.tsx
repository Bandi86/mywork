'use client'
import Pagination from "@/app/components/admin/Pagination";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Table from "./Table";
import { Product } from "../../shared/types"

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
    <div className="flex flex-col w-full text-center items-center gap-10 bg-slate-200">
      <h1 className="text-3xl font-bold text-center mt-4">Manage Products</h1>      
      <Table products={products} generateUniqueId={generateUniqueId} />
        <Pagination />      
    </div>
  );
};

export default Page;
