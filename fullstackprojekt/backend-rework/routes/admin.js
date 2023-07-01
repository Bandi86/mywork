import express from "express";
import getAllProducts from "../controller/products/allProducts.js";
import getSingleProduct from "../controller/products/singleProduct.js";
import createProduct from "../controller/products/createProduct.js";
import updateProduct from "../controller/products/updateProduct.js";
import deleteProduct from "../controller/products/deleteProduct.js";
import createCategory from "../controller/categories/createCat.js";
import getCategories from "../controller/categories/getAllCat.js";
import createProductImage from "../controller/image_controller/createProductImage.js";


const router = express.Router();


// admin products
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct)
router.post("/create-products", createProductImage().single("file"), createProduct);
router.put("/products/edit/:id", updateProduct);
router.put("/products/delete/:id", deleteProduct);

// admin categories
router.get("/categories", getCategories);
router.post("/create-category", createCategory);

export default router;