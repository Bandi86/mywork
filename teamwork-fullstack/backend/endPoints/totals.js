import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import getCount from "../services/count.js";
import { sessions } from "./auth.js";
import { successes } from "../services/successes.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const table = "products";
const message = "Admin access is required for this action";

//TOTAL EARNING
router.get("/earning", (req, res) => {
    if (sessions[req.cookies.sessionID].role == "admin") {
        const data = {
            db: db,
            table: "orders",
            selectedItems: "SUM (total)",
            options: "WHERE status='delivered'"
        };
        getCount(res, data);
    }
});

//TOTAL REVIEWS
router.get("/reviews", (req, res) => {
    if (sessions[req.cookies.sessionID].role == "admin") {
        const data = {
            db: db,
            table: "reviews",
            selectedItems: "COUNT (id)"
        };
        getCount(res, data);
    }
});

//TOTAL SOLD PRODUCTS
router.get("/sales", (req, res) => {
    if (sessions[req.cookies.sessionID].role == "admin") {
        db.serialize(() => {
            const stmt = db.prepare(`SELECT quantity FROM orders WHERE status='delivered'`);
            stmt.all((err, rows) => {
                if (err) sqlError(res, err, 400);
                else {
                    let total = 0
                    if (Array.isArray(rows)) {
                        rows.map((element) => {
                            element.quantity.split(",").map((i) => {
                                let converter = +i
                                total += converter
                            })
                        })
                    }
                    else {
                        console.log("Need to implement case for object")
                    }
                    successes(res, 201, {total});
                }
            });
        })
    }
});

export default router;
