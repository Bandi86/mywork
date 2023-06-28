import { nanoid } from "nanoid";
import db from "../../create_db.js";

export default function createProducts(req, res) {
  const {
    productname,
    productdescription,
    productprice,
    productimage,
    productcategory,
    productstock,
  } = req.body;
 

  const id = nanoid();
  const created_at = Date.now();

  if (
    !productname ||
    !productdescription ||
    !productprice ||
    productprice === 0 ||
    !productimage ||
    !productcategory ||
    productstock === 0
  ) {
    return res.status(400).json({ message: "Missing required information" });
  } else {
    db.serialize(() => {
      const insertStmt = db.prepare(
        "INSERT INTO products (id, name, description, price, image, category_id, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );
      insertStmt.run(
        id,
        productname,
        productdescription,
        Number(productprice),
        productimage,
        productcategory,
        Number(productstock),
        created_at,
        function (err) {
          if (err) {
            console.log("product creation error", err);
            res.status(500).json({succes: false, message: "Error creating product" });
            return;
          } else {
            console.log("product created");
            res.status(200).json({ succes: true, message: "Product created" });
          }
        }
      );
      insertStmt.finalize();
    });
  }
}
