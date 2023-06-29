import express from "express";
import multer from "multer";
import db from "../create_db.js";
import fs from "fs";
import { nanoid } from "nanoid";
import path from "path";

const router = express.Router();

// Multer middleware konfiguráció

const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product_images/");
  },
  filename: (req, file, cb) => {
   
    cb(null, fileName);
  },
});

const userImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user_images/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const productImageUpload = multer({ storage: productImageStorage });
export const userImageUpload = multer({ storage: userImageStorage });

export function uploadImage(req, res, productId) {
  const name = req.body.name;
  const categoryID = req.body.category;
  const parsedFileName = path.parse(req.file.filename);
  const fileNameWindows = `${name}-${nanoid(10)}${parsedFileName.ext}`;
  let categoryName = "";

  db.get("SELECT name FROM category WHERE id = ?", categoryID, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    categoryName = row.name;
    const uploadPath = `uploads/product_images/${categoryName}`;
    const filePath = `${uploadPath}/${fileNameWindows}`;

    fs.mkdirSync(uploadPath, { recursive: true });

    fs.rename(req.file.path, filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      insertProductImageDB(res, fileNameWindows, productId);
    });
  });
}

function insertProductImageDB(res, fileName, productId) {
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
      res.status(200).json({ success: true, message: "Product created", uploadId });
    }
  });
}

// Felhasználói kép feltöltése
export function userImageUploadFunction(req, res, id) {
  if (!req.file) {
    return res.status(400).json({ error: "No File Uploaded" });
  }

  const uploadsID = nanoid(); 
  const user_image = 1;
  const originalFileName = req.file.originalname;
  const extension = originalFileName.split(".").pop();
  const fileName = `avatar_${id}.${extension}`;

  // Felhasználói kép beszúrása az uploads táblába
  const stmt = db.prepare(
    "INSERT INTO uploads (id, filename, user_image, created_at) VALUES (?, ?, ?, ?)"
  );
  stmt.run(uploadsID, fileName, user_image, Date.now(), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    } else {
      const uploadId = stmt.lastID;
      return res.send("File uploaded successfully!", uploadId);
    }
  });
}

export default router;
