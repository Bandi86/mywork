import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import convertDate from "../../../services/timestamp";

export default function RenderProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/admin/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, [setAllProducts]);

  const handleDelete = (productId) => {
    fetch(`http://localhost:8000/admin/products/delete/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDeleted: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Product deleted successfully");
          navigate("/admin/products");
        } else {
          alert("Product delete failed");
        }
      })
      .catch((error) => console.error("Failed to delete product:", error));
  }; 
  

  return (
    <div className="flex flex-col w-full mt-4 text-center items-center gap-10">
      <table className="text-center">
        <thead>
          <tr className="border-2 border-black rounded-md">
            <th className="p-2">Product ID</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Product Description</th>
            <th className="p-2">Product Price</th>
            <th className="p-2">Product Category</th>
            <th className="p-2">Product Stock</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Updated At</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>
        <tbody className="border-b-2 border-black border-l-2 border-r-2">
          {allProducts?.map((product) => (
            <tr key={product.id}>
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">{product.category_id}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">{convertDate(product.created_at)}</td>
              <td className="p-2">{convertDate(product.updated_at)}</td>
              <td
                className="p-2 font-bold cursor-pointer"
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              >
                Edit
              </td>
              <td onClick={() => handleDelete(product.id)} className="p-2 font-bold cursor-pointer">Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
