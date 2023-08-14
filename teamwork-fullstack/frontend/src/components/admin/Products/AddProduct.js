import React, { useState, useEffect, useContext, useRef } from "react";
import { readEntry, uploadEntry } from "../../../repositories//crud";
import {
  categoriesEndpoint,
  productsEndpoint,
} from "../../../repositories/apiEndPoints";
import { adminContext } from "../../../contexts/adminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const [allcat, setAllcat] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [productFormData, setProductFormData] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
  });

  const { adminRefresh, setAdminRefresh } = useContext(adminContext);
  const inputRef = useRef(null);

  useEffect(() => {
    const limit = 1000;
    const offset = 0;
    readEntry(`${categoriesEndpoint}/${limit}/${offset}`)
      .then((res) => res.json())
      .then((data) => setAllcat(data.resdata))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const handleBaseChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const removeSelectedFile = (index) => {
    const updatedFiles = Array.from(selectedFile);
    updatedFiles.splice(index, 1);
    setSelectedFile(updatedFiles);
  };

  useEffect(() => {
    try {
      if (selectedFile?.length && selectedFile.length > 0) {
        resetFileInput("asd");
      } else {
        resetFileInput(null);
      }
    } catch (err) { }
  }, [selectedFile]);

  const resetFileInput = (amount) => {
    // resetting the input value
    inputRef.current.value = amount;
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productFormData.category_id) {
      alert("Please select a category");
      return;
    }

    if (!selectedFile || selectedFile.length === 0) {
      alert("Please select at least one image");
      return;
    }

    let formData = new FormData();
    formData.append("name", productFormData.name);
    formData.append("description", productFormData.description);
    formData.append("price", productFormData.price);
    formData.append("category_id", productFormData.category_id);

    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("files", selectedFile[i]);
    }

    if (inputValidation().isValid === false) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    uploadEntry(formData, productsEndpoint)
      .then((res) => {
        if (res.ok) {
          toast.success("Product added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setProductFormData({
            name: "",
            price: "",
            description: "",
            category_id: "",
          });
          setSelectedFile(null);
          // resetFileInput();
        } else {
          toast.error("Failed to add product", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setAdminRefresh(!adminRefresh)
      })
      .catch((error) => console.error("Failed to add product:", error));
  };

  function inputValidation() {
    let errors = {};
    let isValid = true;

    if (!productFormData.name) {
      isValid = false;
      errors["name"] = "Please enter product name.";
    }

    if (!productFormData.price) {
      isValid = false;
      errors["price"] = "Please enter product price.";
    }

    if (!productFormData.description) {
      isValid = false;
      errors["description"] = "Please enter product description.";
    }

    if (!productFormData.category_id) {
      isValid = false;
      errors["category_id"] = "Please select a category.";
    }

    return { isValid, errors };
  }

  return (
    <>
      <form
        className="flex flex-col text-center items-center gap-6 p-4 ml-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold">Add Product</h2>
        <label className="text-lg text-black text-center">Name</label>
        <input
          className="addProductForm"
          type="text"
          name="name"
          placeholder="Product Name"
          value={productFormData.name}
          onChange={handleBaseChange}
        />
        <label className="text-lg text-black text-center">Description</label>
        <textarea
          className="addProductForm"
          type="text"
          name="description"
          placeholder="Product Description"
          value={productFormData.description}
          onChange={handleBaseChange}
        />
        <label className="text-lg text-black text-center">Price (in €)</label>
        <input
          className="addProductForm"
          type="number"
          name="price"
          placeholder="Price (in €)"
          value={productFormData.price}
          onChange={handleBaseChange}
        />
        <label className="text-lg text-black text-center">Image(s)</label>
        <input
          className="addProductForm"
          type="file"
          name="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
        />
        {selectedFile?.length > 0 ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">
              Your Product Image(s) Preview:
            </h2>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {Array.from(selectedFile).map((file, index) => (
                <div
                  key={index}
                  className="inline-block h-30 w-30 relative overflow-hidden border border-black"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Product Preview ${index + 1}`}
                    className="h-full w-full text-gray-300"
                  />

                  <FontAwesomeIcon
                    icon={faTimes}
                    className="absolute top-0 right-0 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover: ease-in-out-105"
                    onClick={() => removeSelectedFile(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <label className="text-lg mt-4 text-black text-center">Category</label>
        <select
          className="text-lg text-black text-left pl-2 border-2 focus:border-blue-600 rounded-md"
          name="category_id"
          value={productFormData.category_id}
          onChange={handleBaseChange}
        >
          <option value="" disabled>
            Select Category
          </option>
          {allcat &&
            Array.isArray(allcat) &&
            allcat.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="inline-block rounded-full bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Add Product
        </button>
      </form>
    </>
  );
}
