import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { nanoid } from "nanoid";
import { readEntry, updateEntry, deleteEntry } from "../services/crud.js";
import { sessionError } from "../services/errors.js";
import { sessions } from "./auth.js";
import sessionCheck from "../services/sessionCheck.js";
import avatarUpload from "../middleware/avatar_upload.js";
import getCount from "../services/count.js";
import bcrypt from "bcrypt";

// VARS
sqlite3.verbose()
const router = express.Router()
const table = 'users'
const message = "Access denied!"
const saltRounds = 10;

// CREATE USER AVATAR
router.post("/ownerid", avatarUpload(), (req, res) => {
    const { sessionID } = req.cookies
    const { localId } = sessions[sessionID]
    const avatar = req.file.filename
    const columns = 'id'
    const placeholder = '$id'

    const data = {
        db: db,
        table: table,
        columns: 'avatar',
        values: { $id: localId, $avatar: avatar },
        options: `WHERE ${columns} = ${placeholder}`
    }
    updateEntry(res, data)
})

// RECENT USERS 10
router.get("/recent", (req, res) => {
    const data = {
        db: db,
        table: table,
        selectedItems: "*",
        options: "ORDER BY created_at DESC LIMIT 10",
    };

    readEntry(res, data);
});


//COUNT USERS
router.get("/count", (req, res) => {
    const data = {
        db: db,
        table: table,
        selectedItems: "COUNT (id)"
    };

    getCount(res, data);
});

// LIST SINGLE USER
router.get("/:id", (req, res) => {
    const { id } = req.params;
    if (
        sessions[req.cookies.sessionID].localId == id ||
        sessions[req.cookies.sessionID].role == "admin"
    ) {
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
    } else {
        sessionError(res, message);
    }
});

// LIST ALL USERS
router.get("/:limit/:offset", (req, res) => {
    // NEED JOIN WITH UPLOADS
    if (sessions[req.cookies.sessionID].role == "admin") {
        const { limit } = req.params
        const { offset } = req.params
        const data = {
            db: db,
            table: table,
            selectedItems: "*",
            options: `LIMIT ${limit} OFFSET ${offset}`
        }
        readEntry(res, data)
    }
    else sessionError(res, message)
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
        WHERE username LIKE '%${filter}%' OR email LIKE '%${filter}%'
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
        WHERE username LIKE '%${filter}%' OR email LIKE '%${filter}%'
        ORDER BY ${order} ASC
        LIMIT ${limit} OFFSET ${offset}
        `
        };
        readEntry(res, data);
    }
});

// MODIFY USER
router.patch("/:id", (req, res) => {
    const { id } = req.params;

    if (sessions[req.cookies.sessionID].localId == id || sessions[req.cookies.sessionID].role == "admin") {
        const patchColumns = req.body.columns

        const listColumns = 'id'
        const listPlaceholder = '$id'
        const listData = {
            db: db,
            table: table,
            values: { $id: id },
            options: `WHERE ${listColumns} = ${listPlaceholder}`
        }
        if (req.body.data.$password) {
            bcrypt.hash(req.body.data.$password, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.log("HASHING ERROR", err);
                    res.status(500).json({
                        success: false,
                        message: "PASSWORD CHANGE ERROR",
                    });
                    return;
                }
                else {
                    let patchData = req.body.data
                    patchData['$password'] = hashedPassword
                    const data = {
                        db: db,
                        table: table,
                        values: patchData,
                        columns: patchColumns,
                        options: `WHERE id=$id`
                    }
                    updateEntry(res, data, listData)
                }
            })
        }
        else {
            const patchData = req.body.data
            const data = {
                db: db,
                table: table,
                values: patchData,
                columns: patchColumns,
                options: `WHERE id=$id`
            }
            updateEntry(res, data, listData)
        }
    }
    else sessionError(res, message)
})

// DELETE USER
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (sessions[req.cookies.sessionID].localId == id || sessions[req.cookies.sessionID].role == "admin") {
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
