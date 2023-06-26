import express from "express";
import createProducts from "../controller/admin/create_products.js";
import getProducts from "../controller/admin/get_products.js"; 
import deleteProduct from "../controller/admin/delete_product.js";
import updateProduct from "../controller/admin/update_product.js";
import createCategory from "../controller/admin/create_category.js";
import getCategories from "../controller/admin/get_categories.js";

const router = express.Router();

// admin products
router.get("/products", getProducts);
router.post("/create-products", createProducts);
router.put("/update-product", updateProduct);
router.post("/delproduct", deleteProduct);

// admin categories
router.get("/categories", getCategories);
router.post("/create-category", createCategory); 

export default router;
