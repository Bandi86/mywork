import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { nanoid } from "nanoid";
import {
  createEntry,
  readEntry,
  updateEntry,
} from "../services/crud.js";
import { sessions } from "./auth.js";
import createProductImage from "../middleware/products_images.js";
import getCount from "../services/count.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const table = "products";
const message = "Admin access is required for this action";

// ADD NEW PRODUCT
router.post("/", createProductImage(), (req, res) => {
  const timestamp = Date.now();

  if (sessions[req.cookies.sessionID].role == "admin") {
    const id = nanoid(16);
    const data = {
      db: db,
      table: table,
      columns: `
        id, 
        category_id, 
        name, 
        price, 
        description,
        stock,
        created_at,
        updated_at`,
      placeholder: `
            $id, 
            $category_id, 
            $name, 
            $price, 
            $description,
            $stock,
            $created_at,
            $updated_at`,
      values: {
        $id: id,
        $category_id: req.body.category_id,
        $name: req.body.name,
        $price: req.body.price,
        $description: req.body.description,
        $stock: 0,
        $created_at: timestamp,
        $updated_at: timestamp,
      },
    };

    // PRODUCT UPLOAD
    createEntry(res, data);
    // IMAGE UPLOAD
    req.files.forEach((element) => {
      const imageData = {
        db: db,
        table: "uploads",
        columns: `
        id, 
        owner_id,
        filename,
        path,
        created_at,
        isDeleted`,
        placeholder: `
            $id,
            $owner_id,
            $filename, 
            $path, 
            $created_at,
            $isDeleted`,
        values: {
          $id: element.filename.substring(0, 16),
          $owner_id: id,
          $filename: element.filename,
          $path: element.path,
          $created_at: timestamp,
          $isDeleted: false,
        },
      };
      createEntry(res, imageData, true);
    });
  } else sessionError(res, message);
});

// RECENT PRODUCTS 10
router.get("/recent", (req, res) => {
  if (req.cookies.sessionID) {
    if (sessions[req.cookies.sessionID].role == "admin") {
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: "ORDER BY created_at DESC LIMIT 10",
      };

      readEntry(res, data);
    }
    else {
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: "WHERE isDeleted=false ORDER BY created_at DESC LIMIT 10",
      };

      readEntry(res, data);
    }
  }
  else {
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      options: "WHERE isDeleted=false ORDER BY created_at DESC LIMIT 10",
    };

    readEntry(res, data);
  }
});

// COUNT PRODUCTS
router.get("/count", (req, res) => {
  if (req.cookies.sessionID) {
    if (sessions[req.cookies.sessionID].role == "admin") {
      const data = {
        db: db,
        table: table,
        selectedItems: "COUNT (id)",
      };
      getCount(res, data);
    }
    else {
      const data = {
        db: db,
        table: table,
        selectedItems: "COUNT (id)",
        options: "WHERE isDeleted=false"
      };
      getCount(res, data);
    }
  }
  else {
    const data = {
      db: db,
      table: table,
      selectedItems: "COUNT (id)",
      options: "WHERE isDeleted=false"
    };
    getCount(res, data);
  }
});

// LIST SINGLE PRODUCT
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const columns = "id";
  const placeholder = "$id";
  const data = {
    db: db,
    table: table,
    values: { $id: id },
    selectedItems: "*",
    options: `
    WHERE ${columns} = ${placeholder}
    `,
  };
  readEntry(res, data);
});

// LIST ALL PRODUCTS
router.get("/:limit/:offset", (req, res) => {
  if (req.cookies.sessionID) {
    if (sessions[req.cookies.sessionID].role == "admin") {
      const { limit, offset } = req.params;
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `  
      ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      };
      readEntry(res, data);
    }
    else {
      const { limit, offset } = req.params;
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `  
      WHERE isDeleted=false ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      };
      readEntry(res, data);
    }
  }

  else {
    const { limit, offset } = req.params;
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      options: `  
    WHERE isDeleted=false ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    };
    readEntry(res, data);
  }
});

// LIST ALL FILTERED/ORDERED
router.get("/:filter/:order/:reverse/:limit/:offset", (req, res) => {
  if (req.cookies.sessionID) {
    if (sessions[req.cookies.sessionID].role == "admin") {
      const { filter, order, reverse, limit, offset } = req.params;
      if (reverse == "true") {
        const data = {
          db: db,
          table: table,
          selectedItems: "*",
          options: `
      WHERE name LIKE '%${filter}%' OR price LIKE '%${filter}%'
      ORDER BY ${order} DESC
      LIMIT ${limit} OFFSET ${offset}
      `,
        };
        readEntry(res, data);
      } else {
        const data = {
          db: db,
          table: table,
          selectedItems: "*",
          options: `
      WHERE name LIKE '%${filter}%' OR price LIKE '%${filter}%'
      ORDER BY ${order}
      LIMIT ${limit} OFFSET ${offset}
      `,
        };
        readEntry(res, data);
      }
    }
    else {
      const { filter, order, reverse, limit, offset } = req.params;
      if (reverse == "true") {
        const data = {
          db: db,
          table: table,
          selectedItems: "*",
          options: `
      WHERE isDeleted=false AND name LIKE '%${filter}%' OR price LIKE '%${filter}%'
      ORDER BY ${order} DESC
      LIMIT ${limit} OFFSET ${offset}
      `,
        };
        readEntry(res, data);
      } else {
        const data = {
          db: db,
          table: table,
          selectedItems: "*",
          options: `
      WHERE isDeleted=false AND name LIKE '%${filter}%' OR price LIKE '%${filter}%'
      ORDER BY ${order}
      LIMIT ${limit} OFFSET ${offset}
      `,
        };
        readEntry(res, data);
      }
    }
  }
  else {
    const { filter, order, reverse, limit, offset } = req.params;
    if (reverse == "true") {
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `
    WHERE isDeleted=false AND name LIKE '%${filter}%' OR price LIKE '%${filter}%'
    ORDER BY ${order} DESC
    LIMIT ${limit} OFFSET ${offset}
    `,
      };
      readEntry(res, data);
    } else {
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `
    WHERE isDeleted=false AND name LIKE '%${filter}%' OR price LIKE '%${filter}%'
    ORDER BY ${order}
    LIMIT ${limit} OFFSET ${offset}
    `,
      };
      readEntry(res, data);
    }
  }
});

// LIST ALL PRODUCTS BY CATEGORY
router.get("/category/:categoryid/:limit/:offset", (req, res) => {
  if (req.cookies.sessionID) {
    if (sessions[req.cookies.sessionID].role == "admin") {
      const { categoryid, limit, offset } = req.params;

      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `  
    WHERE category_id='${categoryid}' ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      };

      readEntry(res, data);
    }
    else {
      const { categoryid, limit, offset } = req.params;
      const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `  
      WHERE isDeleted=false AND category_id='${categoryid}' ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      };

      readEntry(res, data);
    }
  }
  else {
    const { categoryid, limit, offset } = req.params;
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      options: `  
    WHERE isDeleted=false AND category_id='${categoryid}' ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    };

    readEntry(res, data);
  }
});

// LIST ALL FILTERED/ORDERED BY CATEGORY
router.get(
  "/category/:categoryid/:filter/:order/:reverse/:limit/:offset",
  (req, res) => {
    const { categoryid, filter, order, reverse, limit, offset } = req.params;
    if (req.cookies.sessionID) {
      if (sessions[req.cookies.sessionID].role == "admin") {
        if (reverse == true) {
          const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `
      WHERE category_id='${categoryid}' AND name LIKE '%${filter}%'
      ORDER BY ${order} DESC
      LIMIT ${limit} OFFSET ${offset}
      `,
          };
          readEntry(res, data);
        } else {
          const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `
      WHERE category_id='${categoryid}' AND name LIKE '%${filter}%'
      ORDER BY ${order}
      LIMIT ${limit} OFFSET ${offset}
      `,
          };
          readEntry(res, data);
        }
      }
      else {
        if (reverse == true) {
          const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `
      WHERE isDeleted=false AND category_id='${categoryid}' AND name LIKE '%${filter}%'
      ORDER BY ${order} DESC
      LIMIT ${limit} OFFSET ${offset}
      `,
          };
          readEntry(res, data);
        } else {
          const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `
      WHERE isDeleted=false category_id='${categoryid}' AND name LIKE '%${filter}%'
      ORDER BY ${order}
      LIMIT ${limit} OFFSET ${offset}
      `,
          };
          readEntry(res, data);
        }
      }
    }
    else {
      if (reverse == true) {
        const data = {
          db: db,
          table: table,
          selectedItems: "*",
          options: `
    WHERE isDeleted=false AND category_id='${categoryid}' AND name LIKE '%${filter}%'
    ORDER BY ${order} DESC
    LIMIT ${limit} OFFSET ${offset}
    `,
        };
        readEntry(res, data);
      } else {
        const data = {
          db: db,
          table: table,
          selectedItems: "*",
          options: `
    WHERE isDeleted=false category_id='${categoryid}' AND name LIKE '%${filter}%'
    ORDER BY ${order}
    LIMIT ${limit} OFFSET ${offset}
    `,
        };
        readEntry(res, data);
      }
    }
  }
);

// MODIFY PRODUCT
router.patch("/:id", (req, res) => {
  if (sessions[req.cookies.sessionID].role == "admin") {
    const { id } = req.params;
    const patchColumns = req.body.columns;
    const patchData = req.body.data;

    const listColumns = "id";
    const listPlaceholder = "$id";

    const data = {
      db: db,
      table: table,
      values: patchData,
      columns: patchColumns,
      options: `WHERE id=$id`,
    };
    const listData = {
      db: db,
      table: table,
      values: { $id: id },
      options: `WHERE ${listColumns} = ${listPlaceholder}`,
    };

    updateEntry(res, data, listData);
  } else sessionError(res, message);
});

// DELETE PRODUCT
router.delete("/:id", (req, res) => {
  if (sessions[req.cookies.sessionID].role == "admin") {
    // SET PRODUCT isDeleted TRUE
    const { id } = req.params;
    const patchColumns = "id=$id, isDeleted=$isDeleted";
    const patchData = { $id: id, $isDeleted: true };

    const listColumns = "id";
    const listPlaceholder = "$id";

    const data = {
      db: db,
      table: table,
      values: patchData,
      columns: patchColumns,
      options: `WHERE id=$id`,
    };
    const listData = {
      db: db,
      table: table,
      values: { $id: id },
      options: `WHERE ${listColumns} = ${listPlaceholder}`,
    };

    updateEntry(res, data, listData);

    // OLD: REGULAR DELETE
    // const data = {
    //   db: db,
    //   table: table,
    //   columns: "id",
    //   placeholder: "$id",
    //   values: { $id: id },
    // };

    // deleteEntry(res, data);

    // // SET ALL OWNER UPLOADS isDeleted TRUE
    // const stmtRead = db.prepare(`SELECT * FROM uploads WHERE owner_id='${id}'`);
    // stmtRead.all((err, rows) => {
    //   if (err) sqlError(res, err, 400);
    //   else {
    //     rows.forEach((element) => {
    //       const stmt = db.prepare(
    //         `UPDATE uploads SET isDeleted=true WHERE id='${element.id}'`
    //       );
    //       stmt.run((err, result) => {
    //         if (err) sqlError(res, err, 400);
    //       });
    //     });
    //   }
    // });
  } else sessionError(res, message);
});

export default router;
