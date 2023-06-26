import React, { useEffect, useState } from "react";
import convertDate from "../../../services//timestamp"

export default function AddCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [allcat, setAllcat] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/admin/categories')
      .then(res => res.json())
      .then(data => setAllcat(data))
      .catch(error => console.error('Failed to fetch categories:', error));
  }, [allcat]);

  function handleChange(e) {
    setCategoryName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8000/admin/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    })
      .then((res) => res.json())
      .catch(error => console.error('Failed to add category:', error));
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-6 p-4">Add Categories to Shop</h1>
      <form className="mb-10" onChange={handleChange} onSubmit={handleSubmit}>
        <label className="p-2 mt-4" htmlFor="categoryName">
          Category Name:
        </label>
        <input
          className="text-lg text-black text-left pl-2 border-2 border-black placeholder:gray-400 rounded-md"
          type="text"
          name="categoryName"
          id="categoryName"
          placeholder="Category Name"
        />
        <button
          className="p-2 mt-2 text-lg ml-4 text-white bg-black rounded-md"
          type="submit"
        >
          Add Category
        </button>
      </form>
      
        <table className="table-fixed">
          <thead>
            <tr className="tr">
              <th className="p-2">Category Name</th>
              <th className="p-2">Category ID</th>
              <th className="p-2">Created AT</th>
              <th className="p-2">Updated AT</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allcat.map((cat) => (
              <tr key={cat.id}>
                <td className="p-2">{cat.name}</td>
                <td className="p-2">{cat.id}</td>
                <td className="p-2">{convertDate(cat.created_at)}</td>
                <td className="p-2">{convertDate(cat.updated_at)}</td>
                <td className="p-2 font-bold cursor-pointer">Edit</td>
                <td className="p-2 font-bold cursor-pointer">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
              
    </div>
  );  
}


