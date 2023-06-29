import { nanoid } from "nanoid";
import db from "../../create_db.js";
import { uploadImage} from "../../middleware/multer.js";

export default function createProducts(req, res) {
  const { name, description, price, category, stock } = req.body;  

  const id = nanoid();
  const created_at = Date.now();

  if (
    !name ||
    !description ||
    !price ||
    price === 0 ||
    !category ||
    stock === 0
  ) {
    return res.status(400).json({ message: "Missing required information" });
  }

  // if name already exists in db, return error else create product
  db.get("SELECT name FROM products WHERE name = ?", name, (err, row) => {
    if (err) {
      console.log("error", err);
      res.status(500).json({ success: false, message: "Error creating product" });
      return;
    } else if (row) {
      console.log("product already exists");
      res.status(400).json({ success: false, message: "Product exists" });
      return;
    }

    db.serialize(() => {
      const insertStmt = db.prepare(
        "INSERT INTO products (id, name, description, price, category_id, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
      );
      insertStmt.run(
        id,
        name,
        description,
        Number(price),
        category,
        Number(stock),
        created_at,
        function (err) {
          if (err) {
            console.log("product creation error", err);
            res.status(500).json({ success: false, message: "Error creating product" });
            return;
          } else {
            console.log("product created");
            uploadImage(req, res, id); 
          }
        }
      );
      insertStmt.finalize();
    });
  });
}
