import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allcat, setAllcat] = useState([]);

  const [editedProduct, setEditedProduct] = useState({
    editedProductName: "",
    editedProductDescription: "",
    editedProductPrice: "",
    editedProductImage: "",
    editedProductCategory: "",
    editedProductStock: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8000/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEditedProduct({
          editedProductName: data.name,
          editedProductDescription: data.description,
          editedProductPrice: data.price,
          editedProductImage: data.image,
          editedProductCategory: data.category_id,
          editedProductStock: data.stock,
        });
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/admin/categories")
      .then((res) => res.json())
      .then((data) => setAllcat(data))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, [setAllcat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/admin/products/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Product edited successfully");
          navigate("/admin/products");
        } else {
          alert("Product edit failed");
        }
      })
      .catch((error) => console.error("Failed to edit product:", error));
  };

  const handleEditedChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      [name]: value,
    }));
  };

  return (
    <form
      className="flex flex-col w-full text-center items-center gap-6 p-4 ml-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold">You editing product</h2>
      <label className="text-lg text-black text-center">Product Name</label>
      <input
        className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
        type="text"
        name="editedProductName"
        placeholder="Product Name"
        value={editedProduct.editedProductName}
        onChange={handleEditedChange}
      />
      <label className="text-lg text-black text-center">
        Product Description
      </label>
      <input
        className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
        type="text"
        name="editedProductDescription"
        placeholder="Product Description"
        value={editedProduct.editedProductDescription}
        onChange={handleEditedChange}
      />
      <label className="text-lg text-black text-center">Product Price</label>
      <input
        className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
        type="number"
        name="editedProductPrice"
        placeholder="Product Price"
        value={editedProduct.editedProductPrice}
        onChange={handleEditedChange}
      />
      <label className="text-lg text-black text-center">Product Image</label>
      <input
        className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
        type="text"
        name="editedProductImage"
        placeholder="Product Image"
        value={editedProduct.editedProductImage}
        onChange={handleEditedChange}
      />
      <label className="text-lg text-black text-center">Product Category</label>
      <select
        className="text-lg text-black text-left pl-2 border-2 border-black rounded-md"
        name="editedProductCategory"
        value={editedProduct.editedProductCategory}
        onChange={handleEditedChange}
      >
        <option value="" disabled>
          Select Category
        </option>
        {allcat.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <label className="text-lg text-black text-center">Product Stock</label>
      <input
        className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
        type="number"
        name="editedProductStock"
        placeholder="Product Stock"
        value={editedProduct.editedProductStock}
        onChange={handleEditedChange}
      />
      <button
        type="submit"
        className="p-2 mt-2 text-lg text-white bg-black rounded-md"
      >
        Edit Product
      </button>
    </form>
  );
}
