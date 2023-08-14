import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminContext } from "../../../contexts/adminContext";
import {
  productsEndpoint,
  productsImageEndpoint,
} from "../../../repositories/apiEndPoints";
import {
  readEntry,
  uploadEntry,
  removeEntry,
} from "../../../repositories/crud";
import { fetchCategories } from "../../../repositories/refreshCrud";
import submitEdit from "../../../services/submitEdit";
import EditPicture from "./EditPicture";

export default function EditProduct({ productId, setShowModal }) {
  const [allcat, setAllcat] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [product, setProduct] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    isDeleted: "",
  });
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);
  const [status, setStatus] = useState("");
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    try {
      readEntry(`${productsEndpoint}/${productId}`).then((res) => {
        res.json().then((data) => {
          setProduct(data.resdata[0]);
        });
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }, [productId]);

  useEffect(() => {
    try {
      setProductFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
      });
      setStatus(product.isDeleted ? "deleted" : "active");

      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to set product formdata:", error);
    }
  }, [product]);

  useEffect(() => {
    fetchCategories(100, 0, setAllcat);
  }, [productId]);

  useEffect(() => {
    readEntry(productsImageEndpoint + "/" + productId)
      .then((res) => res.json())
      .then((data) => {
        if (data.resdata && Array.isArray(data.resdata)) {
          const modifiedImages = data.resdata.map((image) => {
            const imagePath = image.path.replace(/\\/g, "/");
            const imageUrl = `http://localhost:8080/${imagePath}`;
            return { url: imageUrl, id: image.id };
          });
          setImages(modifiedImages);          
        }
      })
      .catch((error) => console.error("Failed to fetch images:", error));
    // fetchProductImages(readEntry, productsImageEndpoint, productId, setImages);
  }, [productId]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const isDeleted = status == "deleted" ? true : false;

    // Add form validation logic if needed
    if (!productFormData.category_id) {
      toast.error("Please select a category", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (inputValidation().isValid === false) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setIsSubmitting(true); // Start form submission process

    // Construct the formData for submission
    let formData = new FormData();
    formData.append("name", productFormData.name);
    formData.append("description", productFormData.description);
    formData.append("price", productFormData.price);
    formData.append("category_id", productFormData.category_id);
    formData.append("isDeleted", isDeleted);

    //Image Upload
    let bool;
    let imageData = new FormData();
    imageData.append("category_id", productFormData.category_id);
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        imageData.append("files", selectedFile[i]);
      }
      bool = true;
    }
    try {
      console.log("imagesToDelete", imagesToDelete);
      if (bool) {
        uploadEntry(imageData, `${productsImageEndpoint}/${productId}`);
      }
      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach((element) => {
          const data = { url: `${productsImageEndpoint}/${element}` };
          removeEntry(data);
        });
      }

      await submitEdit(
        {
          data: {
            $id: productId,
            $name: productFormData.name,
            $description: productFormData.description,
            $price: productFormData.price,
            $category_id: productFormData.category_id,
            $isDeleted: isDeleted,
          },
          columns:
            "id=$id, name=$name, description=$description, price=$price, category_id=$category_id, isDeleted=$isDeleted",
        },
        `${productsEndpoint}/${productId}`,
        "Product edited successfully",
        "Product edit failed",
        adminRefresh,
        setAdminRefresh,
        toast
      );

      setSubmitMessage("Product edited successfully");
    } catch (error) {
      setSubmitMessage("Product edit failed");
      console.error("Failed to edit product:", error);
    } finally {
      setIsSubmitting(false); // Reset form submission status
      setShowModal(false);
    }
  }

  const handleBaseChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
  };

  return (
    <>
      {dataLoaded && (
        <form
          className="flex flex-col text-center items-center gap-6 p-4 ml-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label className="text-lg text-black text-center">Name</label>
          <input
            className="addProductForm"
            type="text"
            name="name"
            placeholder="Product Name"
            value={productFormData.name}
            onChange={handleBaseChange}
          />
          <label className="text-lg text-black text-center">
            Modify product availability
          </label>
          <select
            name="status"
            className="addProductForm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
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
            placeholder="Price in (€)"
            value={productFormData.price}
            onChange={handleBaseChange}
          />
          <label className="text-lg text-black text-center">
            Add new product image
          </label>
          <input
            className="addProductForm"
            type="file"
            name="file"
            multiple
            onChange={handleFileChange}
          />
          <label className="text-lg text-black text-center">Category</label>
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
          <EditPicture
            images={images}
            setImages={setImages}
            imagesToDelete={imagesToDelete}
            setImagesToDelete={setImagesToDelete}
          />
          <div className="flex items-center justify-end mt-6">
            <button
              className="text-red-500 font-bold uppercase mr-4 px-4 py-2 text-sm rounded focus:outline-none"
              onClick={() => setShowModal(false)}
              type="submit"
              disabled={isSubmitting} // Disable the button during form submission
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white font-bold uppercase px-4 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none"
              onClick={handleSubmit}
              disabled={isSubmitting} // Disable the button during form submission
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
          {submitMessage && (
            <p
              className={
                submitMessage === "Product edited successfully"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {submitMessage}
            </p>
          )}
        </form>
      )}
    </>
  );
}
