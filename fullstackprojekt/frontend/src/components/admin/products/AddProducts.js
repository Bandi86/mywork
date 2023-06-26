import React, { useState, useEffect } from "react";

const AddProducts = () => {
  const [allcat, setAllcat] = useState([]);
  
  const [productFormData, setProductFormData] = useState({
    productname: "",
    productdescription: "",
    productprice: "",
    productimage: "",
    productcategory: "",
    productstock: "",
  }); 

  useEffect(() => {
    fetch('http://localhost:8000/admin/categories')
      .then(res => res.json())
      .then(data => setAllcat(data))
      .catch(error => console.error('Failed to fetch categories:', error));
  }, [setAllcat]);

  
  const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:8000/admin/create-products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },        
        body: JSON.stringify(productFormData),        
      })     
        .then((res) => res.json())
        .catch(error => console.error('Failed to add product:', error));
    };
    
    const handleChange = (e) => {
       setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
      };
      

  return (
    <>
      <h2>Add Products to Shop</h2>
      <div className="flex flex-col w-full mt-4 text-center items-center gap-10">
        <form
          className="flex flex-col w-full mt-4 text-center items-center gap-6"
          onSubmit={handleSubmit}
          onChange={handleChange}                             
        >
          <label className="text-lg text-black text-center">Product Name</label>
          <input
            className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
            type="text"
            name="productname"
            placeholder="Product Name"
            value={productFormData.productname}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <label className="text-lg text-black text-center">
            Product Price
          </label>
          <input
            className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
            type="number"
            name="productprice"
            placeholder="Product Price"
            value={productFormData.productprice}
            onChange={handleChange}
          />
          <label className="text-lg text-black text-center">
            Product Image
          </label>
          <input
            className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
            type="text"
            name="productimage"
            placeholder="Product Image"
            value={productFormData.productimage}
            onChange={handleChange}
          />
          <label className="text-lg text-black text-center">
            Product Category
          </label>
          <select
            className="text-lg text-black text-left pl-2 border-2 border-black rounded-md"
            name="productcategory"
            value={productFormData.productcategory}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            {allcat.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label className="text-lg text-black text-center">
            Product Stock
          </label>
          <input
            className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
            type="number"
            name="productstock"
            placeholder="Product Stock"
            value={productFormData.productstock}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-2 mt-2 text-lg text-white bg-black rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
