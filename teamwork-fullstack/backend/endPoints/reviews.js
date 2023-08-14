import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { sessionError } from "../services/errors.js";
import { nanoid } from "nanoid";
import { createEntry, readEntry, updateEntry, deleteEntry } from "../services/crud.js";
import { sessions } from "./auth.js";

// VARS
sqlite3.verbose()
const router = express.Router()
const table = 'reviews'
const message = "Admin access is required for this action"

////////////////////////// WORK IN PROGRESS /////////////////////////

// ADD NEW REVIEW
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

// LIST PRODUCT REVIEWS
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

// LIST ALL REVIEWS
router.get("/", (req, res) => {
    const data = {
        db: db,
        table: table,
        selectedItems: "*",
    }
    readEntry(res, data)
})

// MODIFY REVIEW
// router.patch("/:id", (req, res) => {
//     if (sessions[req.cookies.sessionID].role == "admin") {
//         const { id } = req.params;
//         const patchColumns = req.body.columns
//         const patchData = req.body.data

//         const listColumns = 'id'
//         const listPlaceholder = '$id'

//         const data = {
//             db: db,
//             table: table,
//             values: patchData,
//             columns: patchColumns,
//             options: `WHERE id=$id`
//         }
//         const listData = {
//             db: db,
//             table: table,
//             values: { $id: id },
//             options: `WHERE ${listColumns} = ${listPlaceholder}`
//         }

//         updateEntry(res, data, listData)
//     }
//     else sessionError(res, message)
// })

// DELETE REVIEW
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