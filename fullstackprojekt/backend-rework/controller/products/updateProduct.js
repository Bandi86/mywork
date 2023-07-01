import { database as db } from "../../services/db/db_create_service.js";

export default function updateProduct(req, res) {
    const {
      editedProductName,
      editedProductPrice,
      editedProductDescription,
      editedProductImage,
      editedProductCategory,
      editedProductStock
    } = req.body;
  
    const id = req.params.id;
    const updated_at = Date.now();
  
    if (
      !id ||
      !editedProductName ||
      !editedProductDescription ||
      !editedProductPrice ||
      editedProductPrice === 0 ||
      !editedProductImage ||
      !editedProductCategory ||
      editedProductStock === 0
    ) {
      return res.status(400).json({ message: "Missing required information" });
    } else {
      db.serialize(() => {
        const stmt = db.prepare(
          "UPDATE products SET name = ? WHERE isDeleted = 0, price = ?, description = ?, image = ?, category_id = ?, stock = ?, updated_at = ? WHERE id = ?"
        );
        stmt.run(
          editedProductName,
          editedProductPrice,
          editedProductDescription,
          editedProductImage,
          editedProductCategory,
          editedProductStock,
          updated_at,
          id,
          function (err) {
            if (err) {
              console.log("product update error", err);
              res
                .status(500)
                .json({ success: false, message: "Error updating product" });
              return;
            } else {
              console.log("product updated");
              res
                .status(200)
                .json({ success: true, message: "Product updated" });
            }
          }
        );
      });
    }
  }