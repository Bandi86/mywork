import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";

export default function avatarUpload() {
    const userImageStorage = multer.diskStorage({
      destination: (req, file, cb) => {
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
    const avatarImageUpload = multer({ storage: userImageStorage });
    return avatarImageUpload.single("file");
  }