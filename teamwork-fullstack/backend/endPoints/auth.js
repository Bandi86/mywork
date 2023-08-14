import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { createEntry } from "../services/crud.js";
import { sqlError } from "../services/errors.js";

// VARS
sqlite3.verbose();
const router = express.Router();
export const sessions = {};
const saltRounds = 10;
const table = "users";

// REGISTER
router.post("/signup", (req, res) => {
  const timestamp = Date.now();
  const userEmail = req.body.email

  db.serialize(() => {
    const stmt = db.prepare(
      "SELECT * FROM users WHERE email=$email",
      { $email: userEmail }
    );
    stmt.get((err, row) => {
      if (err) {
        sqlError(res, err, 400);
        return;
      }
      else {
        console.log(row)
        if (!row) {
          // ADMIN CREATES NEW USER
          if (req.cookies.sessionID) {
            if (sessions[req.cookies.sessionID].role == "admin") {
              bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
                if (err) {
                  console.log("HASHING ERROR", err);
                  res.status(500).json({
                    success: false,
                    message: "REGISTRATION ERROR",
                  });
                  return;
                } else {
                  const id = nanoid(16);
                  const data = {
                    id: id,
                    db: db,
                    table: table,
                    columns:
                      "id, username, email, password, role, created_at, updated_at",
                    placeholder:
                      "$id, $username, $email, $password, $role, $created_at, $updated_at",
                    values: {
                      $id: id,
                      $username: req.body.username,
                      $email: req.body.email,
                      $password: hashedPassword,
                      $role: req.body.role,
                      $created_at: timestamp,
                      $updated_at: timestamp,
                    },
                  };

                  // DB ENTRY CREATION IN USERS TABLE
                  createEntry(res, data);
                }
              });
            }
          }
          else {
            // REGULAR REG
            bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
              if (err) {
                console.log("HASHING ERROR", err);
                res.status(500).json({
                  success: false,
                  message: "REGISTRATION ERROR",
                });
                return;
              } else {
                const id = nanoid(16);
                const data = {
                  id: id,
                  db: db,
                  table: table,
                  columns:
                    "id, username, email, password, role, created_at, updated_at",
                  placeholder:
                    "$id, $username, $email, $password, $role, $created_at, $updated_at",
                  values: {
                    $id: id,
                    $username: req.body.username,
                    $email: req.body.email,
                    $password: hashedPassword,
                    $role: "user",
                    $created_at: timestamp,
                    $updated_at: timestamp,
                  },
                };

                // DB ENTRY CREATION IN USERS TABLE
                createEntry(res, data);
              }
            });
          }
        } else {
          sqlError(res, "This email is already registered", 400);
        }
      }

    })
  })
});

// LOGIN
router.post("/login", (req, res) => {
  console.log("sessionsLOGIN", req.cookies.sessionID);

  if (req.body.email && req.body.password) {
    db.serialize(() => {
      const stmt = db.prepare(
        `SELECT * FROM users WHERE email = ?`,
        req.body.email
      );

      stmt.get((err, row) => {
        console.log("row", row)
        if (err) {
          sqlError(res, err, 400);
          return;
        }
        else {
          if (row != undefined) {
            const hashedPassword = row.password;
            bcrypt.compare(
              req.body.password,
              hashedPassword,
              (compareErr, isMatch) => {
                if (compareErr) sqlError(res, "Invalid password or email", 400);
                else {
                  if (isMatch) {
                    const sessionID = nanoid(16);
                    const sessionData = {
                      success: true,
                      localId: row.id,
                      email: row.email,
                      role: row.role,
                      username: row.username,
                    };
                    sessions[sessionID] = sessionData;
                    res.cookie("sessionID", sessionID, {
                      maxAge: 900000,
                      httpOnly: true,
                      path: "/",
                    });
                    res.send({ ...sessionData, sessionID });
                    console.log(
                      "Successful login",
                      "user:",
                      row.username,
                      "email:",
                      row.email,
                      "sessionID:",
                      sessionID
                    );
                  }
                  else sqlError(res, "Invalid password or email", 400);
                }
              }
            );
          }
          else sqlError(res, "Account not exists", 400);
        }
      });
    });
  } else sqlError(res, err, 400);
});

// LOGOUT
router.get("/logout", (req, res) => {
  console.log(req.cookies);
  console.log("sessions", sessions);
  console.log("LOGOUT", req.cookies.sessionID);
  // delete sessions[req.cookies.sessionID];
  // Object.keys(sessions).forEach(element => {
  //   delete sessions[element];
  // });
  delete sessions[req.cookies.sessionID];

  res.clearCookie("sessionID");
  // res.clearCookie('sessionID', {path: "/"});
  // res.clearCookie('sessionID', {path: "/admin"});
  // res.cookie('sessionID', {expires: Date.now(), path: "/"})
  // res.cookie('sessionID', {expires: Date.now(), path: "/admin"})

  // res.setHeader("Set-Cookie", "sessionID=; Max-Age=0; Path=/admin;");
  // res.setHeader("Set-Cookie", "sessionID=; Max-Age=0; Path=/;");

  console.log("sessionsAfterDelete", sessions);

  res.send({ success: true });
});

// SESSION, COOKIE VERIFY
router.post("/verify", (req, res) => {
  const sessionID = req.body.sessionID;
  if (sessionID in sessions) {
    console.log("sessions", { ...sessions[sessionID], sessionID });
    res.send({ ...sessions[sessionID], sessionID });
  }
});

export default router;
