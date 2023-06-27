import db from "../../create_db.js";

export default function getProducts(req, res) {
  db.serialize(() => {
    db.all(
      "SELECT * FROM products",
      function (err, rows) {
        if (err) {
          console.log("error", err);
          res.status(500).json({ message: "Error getting products" });
          return;
        } else {          
          res.status(200).json( rows );
        }
      }
    );
  });
}
