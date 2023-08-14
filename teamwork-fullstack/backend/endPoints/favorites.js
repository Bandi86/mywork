import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { createEntry, readEntry, deleteEntry } from "../services/crud.js";
import { sessions } from "./auth.js";
import sessionCheck from "../services/sessionCheck.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const table = "favorites";
const message = "Please login to access this action";

// ADD TO FAVORITES
router.post("/", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    const data = {
      db: db,
      table: table,
      columns: "user_id, product_id",
      placeholder: "$user_id, $product_id",
      values: { $user_id: user_id, $product_id: req.body.product_id },
    };

    // CHECK ENTRY
    db.serialize(() => {
      const stmt = db.prepare(
        "SELECT * FROM favorites WHERE user_id=$user_id AND product_id=$product_id",
        { $user_id: user_id, $product_id: req.body.product_id }
      );
      stmt.get((err, row) => {
        if (err) {
          console.log("SQL error:", err);
        } else {
          console.log("CHECK RESULT:", row);
          if (row) res.status(400).json({ success: false, msg: "already a favorite" })
          else createEntry(res, data)
        }
      });
    });
  } else sessionError(res, message);
});

// LIST ALL FAVORITES
router.get("/", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      values: { $user_id: user_id },
      selectedItems:
        "favorites.'product_id', products.'id', products.'name', products.'price'",
      options: `JOIN products ON favorites.'product_id'=products.id WHERE favorites.'user_id'=$user_id`,
    };
    readEntry(res, data);
  } else sessionError(res, message);
});

// DELETE ALL FAVORITES ITEMS
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

// DELETE SINGLE FAVORITES ITEM
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
