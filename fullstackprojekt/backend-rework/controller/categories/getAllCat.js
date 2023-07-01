import { database as db } from "../../services/db/db_create_service.js";

export default function getCategories(req, res) {
  try {
    db.all("SELECT * FROM categories", (err, rows) => {
      if (err) {
        console.error("Failed to get categories:", err);
        res.status(500).json({ error: "Error getting categories", details: err.message });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ message: "No categories found" });
        } else {
          res.status(200).json(rows);
        }
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error", details: error.message });
  } 
}
