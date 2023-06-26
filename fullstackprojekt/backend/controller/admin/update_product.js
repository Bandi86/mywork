import db from "../../create_db.js";

export default function updateProduct(req, res) {
  const { id, name, price, description, image, category } = req.body;

  if (!id || !name || !price || !description || !image || !category) {
    return res.status(400).json({ message: "Missing required information" });
  } else {
    db.serialize(() => {
      const categoryCheckStmt = db.prepare(
        "SELECT id FROM category WHERE name = ?"
      );
      categoryCheckStmt.get(category, (err, row) => {
        if (err) {
          console.log("category check error", err);
          res.status(500).json({ message: "Error creating product" });
          return;
        } else {
          if (!row) {
            res.status(400).json({ message: "Invalid category" });
            return;
          }

          const categoryId = row.id;
          updateProductWithCategoryId(id, categoryId);
        }
      });
      categoryCheckStmt.finalize();
    });
  }

  function updateProductWithCategoryId(productId, categoryId) {
    const updated_at = Date.now();
    const stmt = db.prepare(
      "UPDATE products SET name = ?, price = ?, description = ?, image = ?, category_id = ?, updated_at = ? WHERE id = ?"
    );
    stmt.run(
      name,
      price,
      description,
      image,
      categoryId,
      updated_at,
      productId,
      function (err) {
        if (err) {
          console.log("update product error", err);
          res.status(500).json({ message: "Error updating product" });
          return;
        }
        res.status(200).json({ message: "Product updated" });
        console.log(
          "Product updated",
          "id",
          productId,
          "name",
          name,
          "price",
          price,
          "description",
          description,
          "image",
          image,
          "category",
          category
        );
      }
    );
    stmt.finalize();
  }
}





           

