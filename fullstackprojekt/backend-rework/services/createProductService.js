import { nanoid } from "nanoid";
import { database as db } from "./db/db_create_service.js";

export async function createProductDB(name, description, price, category, stock) {
    const id = nanoid();
    const created_at = Date.now();
  // a select felesleges rész mert itt id-t kell adni nem pedig nevet azért mert f-key validálja a category_id-t
    try {
      const row = await db.get("SELECT name FROM products WHERE name = ?", name);
      if (row) {
        console.log("Product already exists");
        return { success: false, message: "Product exists", status: 400 };
      } else {
        await new Promise((resolve, reject) => {
          db.serialize(() => {
            const insertStmt = db.prepare(
              "INSERT INTO products (id, name, description, price, category_id, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
            );
            insertStmt.run(
              id,
              name,
              description,
              Number(price),
              category,
              Number(stock),
              created_at,
              function (err) {
                if (err) {
                  console.error("Product creation error:", err);
                  reject({ success: false, message: "Error creating product", status: 500 });
                } else {
                  console.log("Product created");
                  resolve({ success: true, message: "Product created" });
                }
              }
            );
            insertStmt.finalize();
          });
        });
      }
    } catch (error) {
      console.error("Error checking product existence:", error);
      return { success: false, message: "Error creating product", status: 500 };
    }
  }
