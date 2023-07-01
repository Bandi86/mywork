import { database as db } from "../../services/db/db_create_service.js";

export default function getSingleProduct(req, res) {
    const id = req.params.id;
    db.serialize(() => {
      db.get(
        "SELECT * FROM products WHERE isDeleted = 0",
        id,
        function (err, row) {
          if (err) {
            console.log("error", err);
            res.status(500).json({ message: "Error getting product" });
            return;
          } else {
            console.log("product", row);
            res.status(200).json( row );
          }
        }
      );
    });
}