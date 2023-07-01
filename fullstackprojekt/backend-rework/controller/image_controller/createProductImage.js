import { createFolder } from "../../services/imageService.js";
import multer from "multer";
import { nanoid } from "nanoid";

export default function createProductImage() {
  
  const productImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const category = req.body.category;
      cb(null, `uploads/product_images/${category}`);
    },
    filename: (req, file, cb) => {
      const id = nanoid();
      const originalFileName = file.originalname;
      const extension = originalFileName.split(".").pop();
      const fileName = `product_image-${id}.${extension}`;
      cb(null, fileName);
    },    
  });
  
  
  return new Promise((resolve, reject) => {
    if (!req.file) {
      reject({ success: false, message: "File Missing" });
      return;
    }
    
    if (!category) {
      reject({ success: false, message: "Category ID is missing" });
      return;
    }
    
    createFolder(category, productId)
    .then(() => {
      //resolve({ success: true, message: "Product image created" });
    })
    .catch((error) => {
      reject({ success: false, message: error.message });
    });
    return multer({ storage: productImageStorage });
  });
  }