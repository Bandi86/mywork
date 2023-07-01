import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AddProducts = () => {
  const [allcat, setAllcat] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [productFormData, setProductFormData] = useState({
    productname: "",
    productdescription: "",
    productprice: "",
    productcategory: "",
    productstock: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/admin/categories")
      .then((res) => res.json())
      .then((data) => setAllcat(data))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, [setAllcat]);

  const handleBaseChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productFormData.productname);
    formData.append("description", productFormData.productdescription);
    formData.append("price", productFormData.productprice);
    formData.append("category", productFormData.productcategory);
    formData.append("stock", productFormData.productstock);
    formData.append("file", selectedFile);

    fetch("http://localhost:8000/admin/create-products", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Failed to add product:", error));
  };

  return (
    <>
      <form
        className="flex flex-col w-full text-center items-center gap-6  p-4 ml-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold">You Adding new product to shop</h2>
        <label className="text-lg text-black text-center">Product Name</label>
        <input
          className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
          type="text"
          name="productname"
          placeholder="Product Name"
          value={productFormData.productname}
          onChange={handleBaseChange}
        />
        <label className="text-lg text-black text-center">
          Product Description
        </label>
        <input
          className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
          type="text"
          name="productdescription"
          placeholder="Product Description"
          value={productFormData.productdescription}
          onChange={handleBaseChange}
        />
        <label className="text-lg text-black text-center">Product Price</label>
        <input
          className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
          type="number"
          name="productprice"
          placeholder="Product Price"
          value={productFormData.productprice}
          onChange={handleBaseChange}
        />
       <label className="text-lg text-black text-center">Product Image</label>
        <input
          className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
          type="file" 
          name="file"
          onChange={handleFileChange} 
        />
        <label className="text-lg text-black text-center">
          Product Category
        </label>
        <select
          className="text-lg text-black text-left pl-2 border-2 border-black rounded-md"
          name="productcategory"
          value={productFormData.productcategory}
          onChange={handleBaseChange}
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
          name="productstock"
          placeholder="Product Stock"
          value={productFormData.productstock}
          onChange={handleBaseChange}
        />
        <button
          type="submit"
          className="p-2 mt-2 text-lg text-white bg-black rounded-md"
        >
          Add Product
        </button>
      <NavLink to="/admin/products"><p className="text-xl font-bold">Vissza</p></NavLink>
      </form>
    </>
  );
};

export default AddProducts;
