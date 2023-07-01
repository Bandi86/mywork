import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
import { database as db } from "../../services/db/db_create_service.js";

export function multerAvatarUpload() {
    const userImageStorage = multer.diskStorage({
      destination: (req, file, cb) => {          
        console.log(req.body)   
        const userImagesPath = "uploads/user_images/";
        fs.mkdirSync(userImagesPath, { recursive: true }); 
        cb(null, userImagesPath);
      },
      filename: (req, file, cb) => {
        const originalFileName = file.originalname;
        const extension = originalFileName.split(".").pop();
  
        const fileName = "avatar_" + nanoid() + "." + extension;
        cb(null, fileName);
      },
    });
    return multer({ storage: userImageStorage });
  
  }
  
  export function insertDBAvatar(req, res) {
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
          return false;
        } else {
          const uploadId = stmt.lastID;
          console.log("Image inserted with ID:", uploadsID);
          return uploadsID;
        }
      }
    );
  }