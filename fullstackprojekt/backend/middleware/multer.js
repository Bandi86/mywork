import express from "express";
import multer from "multer";
import db from "../create_db.js";
import fs from "fs";
import { nanoid } from "nanoid";


const router = express.Router();

const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req.body.categoryName", req.body);
    cb(null, `uploads/product_images/balatonpart`);
  },
  filename: (req, file, cb) => {
    const id = nanoid();
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const fileName = `${id}.${extension}`;
    cb(null, fileName);
  },
});

const userImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user_images/");
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();

    const fileName = "avatar_" + nanoid() + "." + extension;
    cb(null, fileName);
  },
});

export const productImageUpload = multer({ storage: productImageStorage });
export const userImageUpload = multer({ storage: userImageStorage });

 export function uploadImage(req, res, productId) {
  const uploadPath = `uploads/product_images/${categoryName}`;  

  fs.mkdirSync(uploadPath, { recursive: true });

  insertProductImageDB(res, fileNameWindows, productId);
} 

function insertProductImageDB(res, fileName) {
  const id = nanoid();
  const stmt = db.prepare(
    "INSERT INTO uploads (id, filename, product_image, created_at) VALUES (?, ?, ?, ?)"
  );
  stmt.run(id, fileName, 1, Date.now(), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      const uploadId = stmt.lastID;
      res
        .status(200)
        .json({ success: true, message: "Product created", uploadId });
    }
  });
}

// Felhasználói kép feltöltése
export function userImageUploadFunction(req, res) {
  if (!req.file) {
    return false;
  }

  const uploadsID = nanoid();
  const user_image = 1;

  // Felhasználói kép beszúrása az uploads táblába
  const stmt = db.prepare(
    "INSERT INTO uploads (id, filename, path, user_image, created_at) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(
    uploadsID,
    req.file.filename,
    req.file.path,
    user_image,
    Date.now(),
    (err) => {
      if (err) {
        console.error(err);
        //return res.status(500).send("Internal Server Error");
      } else {
        const uploadId = stmt.lastID;
        //res.json({ success: true, message: "avatar created", uploadId });
      }
    }
  );
}

export default router;
