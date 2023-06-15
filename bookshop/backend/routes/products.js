import sqlite3 from "sqlite3";
import express from "express";
import crypto from "crypto";
import products_pagination from "../utils/pagination.js";

sqlite3.verbose();

const router = express.Router();

// open the database file-based
const db = new sqlite3.Database("./db/products.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the products database.");
  }
});

// Definiáljuk a termékek lekérdezésének útvonalát
router.get("/products", (req, res) => {
  // termékek lekérdezésére és a válasz visszaküldésére
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error("select products", err);
      res.status(500).json({ error: "adatbázis hiba" });
    } else {
      res.json(rows);
    }
  });
});

//Egy adat lekérdezése (id)
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("get car", err);
      res.status(500).json({ error: "adatbázis hiba" });
    } else {
      res.json(row || {});
    }
  });
});

// Adat hozzáadása POST
router.post("/products", (req, res) => {
  console.log(req.body);
  const { title, price, image, created_at } = req.body;
  const id = crypto.randomUUID();

  db.run(
    "INSERT INTO products (id, title, price, image, created_at) VALUES ($id, $title, $price, $image, $created_at)",
    {
      $id: id,
      $title: title,
      $price: price,
      $image: image,
      $created_at: created_at || Date.now(),
    },
    (err) => {
      if (err) {
        console.error("insert product", err);
        res.status(500).json({ error: "adatbázis hiba" });
      } else {
        res.json({ id });
      }
    }
  );
});

// Adat módosítása PATCH
router.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, image } = req.body;

  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("get products", err);
      res.status(500).json({ error: "adatbázis hiba" });
    } else {
      const patchData = {
        $id: id,
        $title: title || row.title,
        $price: price || row.price,
        $image: image || row.image,
      };
      db.run(
        "UPDATE products SET title = $title, price = $price WHERE id = $id",
        patchData,
        (err) => {
          if (err) {
            console.error("update product", err);
            res.status(500).json({ error: "adatbázis hiba" });
          } else {
            res.json({
              id: id,
              title: patchData.$title,
              price: patchData.$price,
              image: patchData.$image,
              created_at: row.created_at,
              updated_at: Date.now(),
            });
          }
        }
      );
    }
  });
});

// Adat törlése DELETE
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("delete product", err);
      res.status(500).json({ error: "adatbázis hiba" });
    } else {
      res.json({ id: id });
    }
  });
});


// GET products
router.get('/products', (req, res) => {
  // Oldalszám és oldalonkénti elemek számának meghatározása
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Adatok lekérdezése és válasz küldése
  const items = products_pagination(page, pageSize); // products_pagination függvény importálása az adatbáziskezelő fájlból
  res.json(items);
});



// Exportáljuk a router objektumot
export default router;
