import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { nanoid } from "nanoid";
import { createEntry, readEntry, updateEntry, deleteEntry } from "../services/crud.js";
import { sessions } from "./auth.js";
import getCount from "../services/count.js";

// VARS
sqlite3.verbose()
const router = express.Router()
const table = 'categories'
const message = "Admin access is required for this action"

// ADD NEW CATEGORY
router.post("/", (req, res) => {
const timestamp = Date.now();
    if (sessions[req.cookies.sessionID].role == "admin") {
        const id = nanoid(16)
        const data = {
            db: db,
            table: table,
            columns: 'id, name, created_at, updated_at',
            placeholder: '$id, $name, $created_at, $updated_at',
            values: { $id: id, $name: req.body.name, $created_at: timestamp, $updated_at: timestamp }
        }

        createEntry(res, data)
    }
    else sessionError(res, message)
})

// RECENT Categories 10
router.get("/recent", (req, res) => {
    const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: "ORDER BY created_at DESC LIMIT 10",
    };

    readEntry(res, data);
});

//COUNT CATEGORIES
router.get("/count", (req, res) => {
    const data = {
      db: db,
      table: table,
      selectedItems: "COUNT (id)"
    };
  
    getCount(res, data);
  });

// LIST SINGLE CATEGORY
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const columns = 'id'
    const placeholder = '$id'
    const data = {
        db: db,
        table: table,
        selectedItems: "*",
        values: { $id: id },
        options: `WHERE ${columns} = ${placeholder}`
    }

    readEntry(res, data)
})

// LIST ALL CATEGORIES
router.get("/:limit/:offset", (req, res) => {
    const { limit } = req.params
    const { offset } = req.params
    const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: `ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset} `
    }

    readEntry(res, data)
})

// LIST ALL FILTERED/ORDERED
router.get("/:filter/:order/:reverse/:limit/:offset", (req, res) => {
    const { filter, order, reverse, limit, offset, } = req.params;
    if (reverse == "true") {
        const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `
        WHERE name LIKE '%${filter}%'
        ORDER BY ${order} DESC
        LIMIT ${limit} OFFSET ${offset}
        `
        };
        readEntry(res, data);
    }
    else {
        const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `
        WHERE name LIKE '%${filter}%'
        ORDER BY ${order}
        LIMIT ${limit} OFFSET ${offset}
        `
        };
        readEntry(res, data);
    }
});

// MODIFY CATEGORY
router.patch("/:id", (req, res) => {
    // if (sessions[req.cookies.sessionID].role == "admin") {
    const { id } = req.params;
    const patchColumns = req.body.columns
    const patchData = req.body.data

    const listColumns = 'id'
    const listPlaceholder = '$id'

    const data = {
        db: db,
        table: table,
        values: patchData,
        columns: patchColumns,
        options: `WHERE id=$id`
    }
    const listData = {
        db: db,
        table: table,
        values: { $id: id },
        options: `WHERE ${listColumns} = ${listPlaceholder}`
    }

    updateEntry(res, data, listData)
    // }
    // else sessionError(res, message)
})

// DELETE CATEGORY
router.delete("/:id", (req, res) => {
    if (sessions[req.cookies.sessionID].role == "admin") {
        const { id } = req.params;
        const data = {
            db: db,
            table: table,
            columns: 'id',
            placeholder: '$id',
            values: { $id: id }
        }

        deleteEntry(res, data)
    }
    else sessionError(res, message)
})

export default router