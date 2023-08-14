import React, { useState, useContext } from "react";
import { categoriesEndpoint } from "../../../repositories/apiEndPoints";
import { createEntry } from "../../../repositories/crud";
import { adminContext } from "../../../contexts/adminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory() {
  const [name, setName] = useState("");
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      createEntry({ name }, categoriesEndpoint)
        .then((res) => {
          if (res.ok) {
            toast.success("Category added successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error("Failed to add category", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          setAdminRefresh(!adminRefresh);
        })
        .catch((error) => {
          console.error("Error while adding category:", error);

          toast.error("An error occurred while adding the category", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (error) {
      console.error("Error during handleSubmit:", error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-6 p-4">Add Categories to Shop</h1>
      <form className="mb-10" onChange={handleChange} onSubmit={handleSubmit}>
        <input
          className="text-lg text-black text-left pl-2 border-2 focus:border-blue-600 placeholder:gray-400 rounded-md"
          type="text"
          name="categoryName"
          id="categoryName"
          placeholder="Category Name"
          required
          onChange={handleChange}
        />
        <button
          className="p-2 mt-2 text-lg ml-4 text-white bg-blue-600 rounded-md"
          type="submit"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
