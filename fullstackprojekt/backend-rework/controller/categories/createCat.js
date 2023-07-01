import { database as db } from "../../services/db/db_create_service.js";
import { nanoid } from "nanoid";

export default function createCategory(req, res) {
  const categoryName = req.body.categoryName;

  const id = nanoid();
  const created_at = Date.now();

  if (!categoryName) {
    return res.status(400).json({ message: "Category name is missing" });
  } else {
    try {
      db.get("SELECT id FROM categories WHERE name = ?", [categoryName], (err, row) => {
        if (err) {
          console.log("Category check error:", err);
          res.status(500).json({ message: "Error checking category", error: err.message });
        } else if (row) {
          res.status(409).json({ message: "Category already exists" });
        } else {
          db.serialize(() => {
            const insertStmt = db.prepare(
              "INSERT INTO categories (id, name, created_at) VALUES (?, ?, ?)"
            );
            insertStmt.run(id, categoryName, created_at, function (err) {
              if (err) {
                console.log("Category creation error:", err);
                res.status(500).json({ message: "Error creating category", error: err.message });
              } else {
                res.status(200).json({ message: "Category created" });
              }
            });
            insertStmt.finalize();
          });
        }
      });
    } catch (error) {
      console.log("Unexpected error:", error);
      res.status(500).json({ message: "Unexpected error", error: error.message });
    } finally {
      db.close(); 
    }
  }
}


