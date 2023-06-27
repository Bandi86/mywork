import React, { useState, useEffect } from "react";

const AddProducts = (props) => {
  const [allcat, setAllcat] = useState([]);
  console.log(props);

  const [productFormData, setProductFormData] = useState({
    productname: "",
    productdescription: "",
    productprice: "",
    productimage: "",
    productcategory: "",
    productstock: "",
  });

  const [editedProduct, setEditedProduct] = useState({
    editedProductName: "",
    editedProductDescription: "",
    editedProductPrice: "",
    editedProductImage: "",
    editedProductCategory: "",
    editedProductStock: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/admin/categories")
      .then((res) => res.json())
      .then((data) => setAllcat(data))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, [setAllcat]);

  useEffect(() => {
    if (props.id) {
      fetch(`http://localhost:8000/admin/products/${props.id}`)
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
    }
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.id) {
      fetch(`http://localhost:8000/admin/edit-product/${props.id}`, {
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
          } else {
            alert("Product edit failed");
          }
        })
        .catch((error) => console.error("Failed to edit product:", error));
    } else {
      fetch("http://localhost:8000/admin/create-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Product added successfully");
          } else {
            alert("Product add failed");
          }
        })
        .catch((error) => console.error("Failed to add product:", error));
      }
  };

  const handleBaseChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditedChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      [name]: value,
    }));
  };

  const editedForm = () => {
    return (
      <>
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
      type="text"
      name="editedProductImage"
      placeholder="Product Image"
      value={editedProduct.editedProductImage}
      onChange={handleEditedChange}
    />
    <label className="text-lg text-black text-center">
      Product Category
    </label>
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
      </>
    )
  };

  const baseForm = () => {
    return (
      <>
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
      type="text"
      name="productimage"
      placeholder="Product Image"
      value={productFormData.productimage}
      onChange={handleBaseChange}
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
    </>
    )
  };

  return (
    <>
      <form
        className="flex flex-col w-full text-center items-center gap-6 border-2 border-black rounded-md p-4 ml-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Add Products to Shop</h2>
        {props.id ? editedForm() : baseForm()}        
        <button
          type="submit"
          className="p-2 mt-2 text-lg text-white bg-black rounded-md"
        >
          {props.id ? "Edit Product" : "Add Product"}
        </button>
      </form>
    </>
  );
};

export default AddProducts;

