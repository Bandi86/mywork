import multer from "multer";
import fs from "fs";
import { nanoid } from "nanoid";

export default function createProductImage() {

  const productImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/product_images/${req.body.category_id}`;
      fs.mkdirSync(uploadPath, { recursive: true });      
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const id = nanoid(16);
      const originalFileName = file.originalname;
      const extension = originalFileName.split(".").pop();
      const fileName = `${id}.${extension}`;
      cb(null, fileName);
    },
    allowedFiles: function (req, file, cb) {
      // Accept images only
      if (
        !file.originalname.match(
          /\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
        )
      ) {
        req.fileValidationError =
          "Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!";
        return cb(
          new Error(
            "Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!"
          ),
          false
        );
      }
      cb(null, true);
    },
  });

  const productImageUpload = multer({ storage: productImageStorage });
  return productImageUpload.array("files", 10);
}