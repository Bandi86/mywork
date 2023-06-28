import db from "../../create_db.js";

export default function deleteProduct(req, res) {
  const id = req.params.id;
  const isDeleted = true; 
  const updated_at = Date.now();

  if (!id) {
    return res.status(400).json({ message: "Missing required information" });
  } else {
    db.serialize(() => {
      const stmt = db.prepare(
        "UPDATE products SET isDeleted = ?, updated_at = ? WHERE id = ?"
      );
      stmt.run(isDeleted, updated_at, id, (err) => {
        if (err) {
          console.log("Error updating product:", err);
          return res.status(500).json({ success: false, message: "Failed to update product" });
        }
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
      });
    });
  }
}

