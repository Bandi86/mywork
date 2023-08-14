import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { nanoid } from "nanoid";
import {
  createEntry,
  deleteEntry,
  readEntry,
  updateEntry,
} from "../services/crud.js";
import { sessions } from "./auth.js";
import sessionCheck from "../services/sessionCheck.js";
import getCount from "../services/count.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const table = "orders";
const message = "Admin access is required for this action";

// ADD NEW ORDER
router.post("/", (req, res) => {
  const timestamp = Date.now();
  const id = nanoid(16);
  let userid = 0;
  const products = req.body.products;
  const quantity = req.body.quantity;
  const total = req.body.total;
  const billing = req.body.billing;
  const shipping = req.body.shipping;
  const contact = req.body.contact;
  console.log(req.body);

  if (req.cookies.sessionID) userid = sessions[req.cookies.sessionID].localId;
  const data = {
    db: db,
    table: table,
    columns: `
            id,
            user_id,
            product_ids,
            quantity,
            total,
            status,
            billing,
            shipping,
            contactEmail,
            contactPhone,
            created_at,
            updated_at,
            isDeleted
            `,

    placeholder: `
            $id,
            $user_id,
            $product_ids,
            $quantity,
            $total,
            $status,
            $billing,
            $shipping,
            $contactEmail,
            $contactPhone,
            $created_at,
            $updated_at,
            $isDeleted`,
    values: {
      $id: id,
      $user_id: userid,
      $product_ids: products,
      $quantity: quantity,
      $total: total,
      $status: "processing",
      $billing: billing,
      $shipping: shipping,
      $contactEmail: contact.email,
      $contactPhone: contact.phone,
      $created_at: timestamp,
      $updated_at: timestamp,
      $isDeleted: false,
    },
  };
  createEntry(res, data);

  // // UPDATE STOCK
  //   db.serialize(() => {
  //     const productsArray = products.split(',')
  //     const quantityArray = quantity.split(',')
  //     productsArray.forEach((element, idx) => {
  //         const stmt = data.db.prepare(
  //             `SELECT * FROM products WHERE id=${element}`
  //         );
  //         stmt.all((err, rows) => {
  //             if (err) sqlError(res, err, 400);
  //             else if (rows - quantityArray[idx] >= 0) {
  //                 const { id } = element;
  //                 const patchColumns = 'stock=$stock'
  //                 const patchData = { $stock: rows - quantityArray[idx] }

  //                 const listColumns = 'id'
  //                 const listPlaceholder = '$id'

  //                 const data = {
  //                     db: db,
  //                     table: "products",
  //                     values: patchData,
  //                     columns: patchColumns,
  //                     options: `WHERE id=$id`
  //                 }
  //                 const listData = {
  //                     db: db,
  //                     table: "products",
  //                     values: { $id: id },
  //                     options: `WHERE ${listColumns} = ${listPlaceholder}`
  //                 }
  //                 updateEntry(res, data, listData)
  //             }
  //             else {
  //                 res.status(400).json({ success: false, message: `${element} is out of stock` })
  //                 return
  //             }
  //         })
  //     })

  // EMPTY CUSTOMER CART
  const stmtRead = db.prepare(`SELECT * FROM cart WHERE user_id='${userid}'`);
  stmtRead.all((err, rows) => {
    if (err) sqlError(res, err, 400);
    else {
      rows.forEach((element) => {
        const stmt = db.prepare(`DELETE FROM cart WHERE user_id='${userid}'`);
        stmt.run(function (err) {
          if (err) sqlError(res, err, 400);
          else console.log({ success: this.changes > 0 ? true : false });
        });
      });
    }
  });
  //   });
});

// RECENT ORDERS 10
router.get("/recent", (req, res) => {
  console.log("ittvagyokgec");
  const data = {
    db: db,
    table: table,
    selectedItems: "*",
    options: "ORDER BY created_at DESC LIMIT 10",
  };

  readEntry(res, data);
});

//COUNT ORDERS
router.get("/count", (req, res) => {
  const data = {
    db: db,
    table: table,
    selectedItems: "COUNT (id)",
  };

  getCount(res, data);
});

// LIST ALL USER ORDERS
router.get("/orderhistory", (req, res) => {
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const user_id = sessions[req.cookies.sessionID].localId;
    const columns = "user_id";
    const placeholder = "$user_id";
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      values: { $user_id: user_id },
      options: `WHERE ${columns} = ${placeholder} ORDER BY created_at DESC`,
    };
    readEntry(res, data);
  } else sessionError(res, message);
});

// LIST SINGLE ORDER
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (sessionCheck(req.cookies.sessionID, sessions)) {
    const columns = "id";
    const placeholder = "$id";
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      values: { $id: id },
      options: `WHERE ${columns} = ${placeholder}`,
    };
    readEntry(res, data);
  }
});

// LIST ALL ORDERS
router.get("/:limit/:offset", (req, res) => {
  if (sessions[req.cookies.sessionID].role == "admin") {
    const { limit } = req.params;
    const { offset } = req.params;
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      options: `ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    };
    readEntry(res, data);
  } else sessionError(res, message);
});

// LIST ALL FILTERED/ORDERED
router.get("/:filter/:order/:reverse/:limit/:offset", (req, res) => {
  const { filter, order, reverse, limit, offset } = req.params;
  if (reverse == "true") {
    const data = {
      db: db,
      table: table,
      selectedItems: "*",
      options: `
      WHERE contactEmail LIKE '%${filter}%' OR contactPhone LIKE '%${filter}%' OR status LIKE '%${filter}%' OR total LIKE '%${filter}%'
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
        WHERE contactEmail LIKE '%${filter}%' OR contactPhone LIKE '%${filter}%' OR status LIKE '%${filter}%' OR total LIKE '%${filter}%'
        ORDER BY ${order}
        LIMIT ${limit} OFFSET ${offset}
        `,
    };
    readEntry(res, data);
  }
});

// MODIFY ORDER
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

// DELETE ORDER
router.delete("/:id", (req, res) => {
  if (sessions[req.cookies.sessionID].role == "admin") {
    const { id } = req.params;
    const patchColumns = "id=$id, isDeleted=$isDeleted, status=$status";
    const patchData = { $id: id, $isDeleted: true, $status: "deleted" };

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

export default router;
