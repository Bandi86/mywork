import { database as db } from "../../services/db/db_create_service.js";

export default function getAllProducts(req, res) {
  try {
    db.serialize(() => {
      db.all("SELECT * FROM products WHERE isDeleted = 0", (err, rows) => {
        if (err) {
          console.error("Error getting products:", err);
          res.status(500).json({ error: "Error getting products", details: err.message });
        } else {
          if (rows.length === 0) {
            res.status(404).json({ message: "No products found" });
          } else {
            res.status(200).json(rows);
          }
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error", details: error.message });
  } 
}
