import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { sessions } from "./auth.js";
import sessionCheck from "../services/sessionCheck.js";
import {
  createEntry,
  readEntry,
  updateEntry,
  deleteEntry,
} from "../services/crud.js";
import increaseDecreaseEntry from "../services/increaseDecreaseEntry.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const table = "cart";
const message = "Please login to access this action";

// ADD NEW CART ITEM
router.post("/", (req, res) => {
const timestamp = Date.now();
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    console.log("USER ID:", user_id);
    const data = {
      db: db,
      table: table,
      columns: "user_id, product_id, quantity, updated_at",
      placeholder: "$user_id, $product_id, $quantity, $updated_at",
      values: {
        $user_id: user_id,
        $product_id: req.body.product_id,
        $quantity: req.body.quantity,
        $updated_at: timestamp,
      },
    };

    // CHECK ENTRY
    db.serialize(() => {
      const stmt = db.prepare(
        "SELECT * FROM cart WHERE user_id=$user_id AND product_id=$product_id",
        { $user_id: user_id, $product_id: req.body.product_id }
      );
      stmt.get((err, row) => {
        if (err) {
          console.log("SQL error:", err);
        } else {
          console.log("CHECK RESULT:", row);
          if (row) {
            const product_id = req.body.product_id;
            const patchColumn = `quantity`;

            const listColumns = {
              user_id: "user_id",
              product_id: "product_id",
            };
            const listPlaceholder = {
              user_id: "$user_id",
              product_id: "$product_id",
            };

            const updateData = {
              db: db,
              table: table,
              column: patchColumn,
              options: "WHERE user_id=$user_id AND product_id=$product_id",
              action: "+",
              amount: req.body.quantity,
              values: { $user_id: user_id, $product_id: product_id },
            };

            const listData = {
              db: db,
              table: table,
              values: { $user_id: user_id, $product_id: product_id },
              options: `WHERE ${listColumns.user_id} = ${listPlaceholder.user_id} 
                          AND ${listColumns.product_id} = ${listPlaceholder.product_id}`,
            };

            const deleteData = {
              db: db,
              table: table,
              columns: "user_id",
              placeholder: "$user_id",
              values: { $user_id: user_id, $product_id: req.body.product_id },
              options: `AND product_id=$product_id`,
            };
            
            increaseDecreaseEntry(res, updateData, listData, deleteData);
          } else {
            createEntry(res, data);
          }
        }
      });
    });
  } else sessionError(res, message);
});

// LIST ALL CART ITEMS
router.get("/", (req, res) => {
  // NEED JOIN WITH UPLOADS
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    const data = {
      db: db,
      table: table,
      values: { $user_id: user_id },
      selectedItems:
        "cart.'product_id', cart.'quantity', cart.'updated_at', products.'id', products.'name', products.'price'",
      options: `JOIN products ON cart.'product_id'=products.id WHERE cart.'user_id'=$user_id`,
    };

    readEntry(res, data);
  } else sessionError(res, message);
});

// DECREASE CART ITEM
router.patch("/decrease", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;

    // CHECK ENTRY
    db.serialize(() => {
      const stmt = db.prepare(
        "SELECT * FROM cart WHERE user_id=$user_id AND product_id=$product_id",
        { $user_id: user_id, $product_id: req.body.product_id }
      );
      stmt.get((err, row) => {
        if (err) {
          console.log("SQL error:", err);
        } else {
          console.log("CHECK RESULT:", row);
          if (row) {
            const product_id = req.body.product_id;
            const patchColumn = `quantity`;

            const listColumns = {
              user_id: "user_id",
              product_id: "product_id",
            };
            const listPlaceholder = {
              user_id: "$user_id",
              product_id: "$product_id",
            };

            const updateData = {
              db: db,
              table: table,
              column: patchColumn,
              options: "WHERE user_id=$user_id AND product_id=$product_id",
              action: "-",
              amount: req.body.quantity,
              values: { $user_id: user_id, $product_id: product_id },
            };

            const listData = {
              db: db,
              table: table,
              values: { $user_id: user_id, $product_id: product_id },
              options: `WHERE ${listColumns.user_id} = ${listPlaceholder.user_id} 
                      AND ${listColumns.product_id} = ${listPlaceholder.product_id}`,
            };

            const deleteData = {
              db: db,
              table: table,
              columns: "user_id",
              placeholder: "$user_id",
              values: { $user_id: user_id, $product_id: req.body.product_id },
              options: `AND product_id=$product_id`,
            };

            increaseDecreaseEntry(res, updateData, listData, deleteData);
          } else {
            res.status(401).json({ success: false });
          }
        }
      });
    });
  } else sessionError(res, message);
});

// UPDATE CART ITEM
router.patch("/", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    const product_id = req.body.data.id;
    const patchColumns = req.body.columns;
    const patchData = req.body.data;

    const listColumns = {
      user_id: "user_id",
      product_id: "product_id",
    };
    const listPlaceholder = {
      user_id: "$user_id",
      product_id: "$product_id",
    };

    const data = {
      db: db,
      table: table,
      values: patchData,
      columns: patchColumns,
      options: `WHERE user_id=$user_id AND product_id=$product_id`,
    };
    const listData = {
      db: db,
      table: table,
      values: { $user_id: user_id, $product_id: product_id },
      options: `WHERE ${listColumns.user_id} = ${listPlaceholder.user_id} 
            AND ${listColumns.product_id} = ${listPlaceholder.product_id}`,
    };

    if (patchData.quantity == 0) deleteEntry(res, data);
    else updateEntry(res, data, listData);
  } else sessionError(res, message);
});

// DELETE ALL CART ITEMS
router.delete("/removeall", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    const data = {
      db: db,
      table: table,
      columns: "user_id",
      placeholder: "$user_id",
      values: { $user_id: user_id },
    };

    deleteEntry(res, data);
  } else sessionError(res, message);
});

// DELETE SINGLE CART ITEM
router.delete("/:productid", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const { productid } = req.params;
    const user_id = sessions[req.cookies.sessionID].localId;
    const data = {
      db: db,
      table: table,
      columns: "user_id",
      placeholder: "$user_id",
      values: { $user_id: user_id, $product_id: productid },
      options: `AND product_id=$product_id`,
    };

    deleteEntry(res, data);
  } else sessionError(res, message);
});

export default router;
