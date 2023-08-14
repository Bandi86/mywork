import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { nanoid } from "nanoid";
import {
  createEntry,
  readEntry,
  updateEntry,
  deleteEntry,
} from "../services/crud.js";
import { sessions } from "./auth.js";
import sessionCheck from "../services/sessionCheck.js";
import createProductImage from "../middleware/products_images.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const table = "uploads";
const message = "Admin access is required for this action";

// CREATE UPLOAD FOR OWNER
router.post("/:ownerid", createProductImage(), (req, res) => {
  const timestamp = Date.now();
  const owner_id = req.params.ownerid;

  if (sessions[req.cookies.sessionID].role == "admin") {
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
          $owner_id: owner_id,
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

// LIST ALL UPLOADS FOR OWNER (product or user)
router.get("/:ownerid", (req, res) => {
  const owner_id = req.params.ownerid;
  const columns = "owner_id";
  const placeholder = "$owner_id";
  const data = {
    db: db,
    table: table,
    selectedItems: "*",
    values: { $owner_id: owner_id },
    options: `WHERE ${columns} = ${placeholder} AND isDeleted=false`,
  };
  readEntry(res, data);
});

// LIST SINGLE UPLOAD FOR OWNER (product or user)
router.get("/:ownerid/:id", (req, res) => {
  const owner_id = req.params.ownerid;
  const id = req.params.id;
  const data = {
    db: db,
    table: table,
    selectedItems: "*",
    options: `WHERE owner_id = $owner_id AND id = $id AND isDeleted=false`,
    values: { $owner_id: owner_id, $id: id },
  };
  readEntry(res, data);
});

// DELETE SINGLE UPLOAD FOR OWNER (SET isDeleted TRUE)
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const patchColumns = "id=$id, isDeleted=$isDeleted";
  const patchData = {
    $id: id,
    $isDeleted: true,
  };

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
    options: `WHERE ${listColumns} = ${listPlaceholder} AND isDeleted=false`,
  };

  updateEntry(res, data, listData);
});

export default router;
