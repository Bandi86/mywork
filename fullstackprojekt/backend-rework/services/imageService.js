import { nanoid } from "nanoid";
import { database as db } from "../services/db/db_create_service.js";
import fs from "fs";



function insertProductImageDB(res, fileName, productId) {
    const id = nanoid();
    const stmt = db.prepare(
      "INSERT INTO uploads (id, filename, product_id, created_at) VALUES (?, ?, ?, ?)"
    );
    stmt.run(id, fileName, productId, Date.now(), (err) => {
      if (err) {
        console.error("Error inserting product image into DB:", err);
      } else {
        const uploadId = stmt.lastID;
      }
    });
  }

  export function createFolder(category, productId) {
    return new Promise((resolve, reject) => {
      const uploadPath = `uploads/product_images/22222`;
  
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          console.error("Error creating image directory:", err);
          reject({ message: "Error creating product image" });
        } else {
          const upload = productImageUpload.single("productImage");
          upload(req, res, function (err) {
            if (err) {
              console.error("Error uploading image:", err);
              reject({ message: "Error uploading product image" });
            } else {
              const fileName = req.file.filename;
              insertProductImageDB(res, fileName, productId);
              resolve();
            }
          });
        }
      });
    });
  }


