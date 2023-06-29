import { nanoid } from "nanoid";
import db from "../../create_db.js";

export default function createCategory(req, res) {  
 
  const categoryName  = req.body.categoryName;  
  const id = nanoid();
  const created_at = Date.now();
  

  if (!categoryName) {
    return res.status(400).json({ message: "Missing required information" });
  } else {
    db.serialize(() => {
      const insertStmt = db.prepare(
        "INSERT INTO category (id, name, created_at) VALUES (?, ?, ?)"
      );
      insertStmt.run(id, categoryName, created_at, function (err) {
        if (err) {
          console.log("category creation error", err);
          res.status(500).json({ message: "Error creating category" });
          return;
        } else res.status(200).json({ message: "Category created" });
      });
      insertStmt.finalize();
    });
  }
}
