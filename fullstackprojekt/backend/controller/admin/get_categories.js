import db from "../../create_db.js";

export default function getCategories(req, res) {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      console.error("Failed to get categories:", err);
      res.sendStatus(500);
    } else {
      res.send(rows);
    }
  });
}

  