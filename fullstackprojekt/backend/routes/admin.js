import express from "express";
import createProducts from "../controller/admin/create_products.js";
import getProducts from "../controller/admin/get_products.js"; 
import deleteProduct from "../controller/admin/delete_product.js";
import updateProduct from "../controller/admin/update_product.js";
import createCategory from "../controller/admin/create_category.js";
import getCategories from "../controller/admin/get_categories.js";
import getSingleProduct from "../controller/admin/get_single_product.js";
import { productImageUpload } from "../middleware/multer.js";

const router = express.Router();

// admin products
router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct)
router.post("/create-products",productImageUpload.single('file'), createProducts);
router.put("/products/edit/:id", updateProduct);
router.put("/products/delete/:id", deleteProduct);

// admin categories
router.get("/categories", getCategories);
router.post("/create-category", createCategory); 

export default router;
