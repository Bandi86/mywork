import React, { useState, useEffect, useContext } from "react";
import submitEdit from "../../../services/submitEdit";
import { categoriesEndpoint } from "../../../repositories/apiEndPoints";
import { readEntry } from "../../../repositories/crud";
import { adminContext } from "../../../contexts/adminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditCategory({ setShowModal, categoryId }) {
  const [category, setCategory] = useState({});
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);

  useEffect(() => {
    try {
      readEntry(`${categoriesEndpoint}/${categoryId}`).then((res) => {
        res.json().then((data) => {
          setCategory(data.resdata[0]);
        });
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }, [categoryId]);

  useEffect(() => {
    try {
      setCategoryFormData({
        name: category.name,
      });
      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to set product formdata:", error);
    }
  }, [category]);

  function handleChange(e) {
    setCategoryFormData({ name: e.target.value });
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();

    let formData = {
      columns: "id=$id, name=$name",
      data: {
        $id: categoryId,
        $name: categoryFormData.name,
      },
    };

    if (!categoryFormData.name) {
      toast.error("Please enter a category name", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else if (!categoryId) {
      toast.error("no category id", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      await submitEdit(
        formData,
        categoriesEndpoint + "/" + categoryId,
        "Category edited successfully",
        "Failed to edit category",
        adminRefresh,
        setAdminRefresh,
        toast
      );
      setShowModal(false);
    }
  }

  return (
    <>
      <div className="text-center">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryFormData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-end mt-6">
        <button
          className="text-red-500 font-bold uppercase mr-4 px-4 py-2 text-sm rounded focus:outline-none"
          onClick={() => setShowModal(false)}
          type="submit"
        >
          Close
        </button>
        <button
          className="bg-emerald-500 text-white font-bold uppercase px-4 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none"
          onClick={handleCategorySubmit}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
