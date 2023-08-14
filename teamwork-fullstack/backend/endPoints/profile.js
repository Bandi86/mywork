import db from "../sql/db.js";
import express from "express";
import sqlite3 from "sqlite3";
import { nanoid } from "nanoid";
import { sessions } from "./auth.js";
import sessionCheck from "../services/sessionCheck.js";
import { sqlError, sessionError } from "../services/errors.js";
import {
  createEntry,
  deleteEntry,
  readEntry,
  updateEntry,
} from "../services/crud.js";
import avatarUpload from "../middleware/avatar_upload.js";

// VARS
sqlite3.verbose();
const router = express.Router();
const message = "Please login to access this action";

// IMAGE UPLOAD
router.post("/profilePicture/:id", avatarUpload(), (req, res) => {
  const timestamp = Date.now();
  const { id } = req.params;
  const file = req.file;

  // CHECK IF ENTRY EXISTS
  const stmt = db.prepare(`SELECT * FROM uploads WHERE owner_id='${id}'`);
  stmt.get((err, row) => {
    // UPLOADS UPDATE
    try {
      if (row) {
        const patchColumns = "id=$id, filename=$filename, path=$path";

        const patchData = {
          $id: file.filename.substring(0, 16),
          $owner_id: id,
          $filename: file.filename,
          $path: file.path,
        };

        const listColumns = "owner_id";
        const listPlaceholder = "$owner_id";

        const data = {
          db: db,
          table: "uploads",
          values: patchData,
          columns: patchColumns,
          options: `WHERE owner_id=$owner_id`,
        };

        const listData = {
          db: db,
          table: "uploads",
          values: { $owner_id: id },
          options: `WHERE ${listColumns} = ${listPlaceholder}`,
        };
        updateEntry(res, data, listData);
      }
      // UPLOADS CREATE
      else {
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
            $id: file.filename.substring(0, 16),
            $owner_id: id,
            $filename: file.filename,
            $path: file.path,
            $created_at: timestamp,
            $isDeleted: false,
          },
        };
        createEntry(res, imageData, true);
      }
    } catch (err) { }

  });
});

// CREATE/UPDATE BILLING/COMPANY DATA
router.post("/billing/:id", (req, res) => {
  const timestamp = Date.now();
  const { id } = req.params;
  try {
    if (sessions[req.cookies.sessionID].localId == id) {
      // const id = sessions[req.cookies.sessionID].localId;
      db.serialize(() => {
        const stmt = db.prepare(`SELECT * FROM billing WHERE user_id='${id}'`);
        stmt.get((err, rows) => {
          if (err) sqlError(res, err, 400);
          else {
            if (rows) {
              console.log("rows", rows);
              // UPDATE BILLING
              const patchColumns =
                "user_id=$user_id, name=$name, address=$address, updated_at=$updated_at";

              const patchData = {
                $user_id: id,
                $name: req.body.name,
                $address: req.body.address,
              };

              const listColumns = "user_id";
              const listPlaceholder = "$user_id";

              const data = {
                db: db,
                table: "billing",
                values: patchData,
                columns: patchColumns,
                options: `WHERE user_id=$user_id`,
              };

              const listData = {
                db: db,
                table: "billing",
                values: { $user_id: id },
                options: `WHERE ${listColumns} = ${listPlaceholder}`,
              };
              updateEntry(res, data, listData);

              if (req.body.taxNumber && req.body.company) {
                const patchColumns =
                  "user_id=$user_id, company=$company, taxNumber=$taxNumber, updated_at=$updated_at";
                const listColumns = "user_id";
                const listPlaceholder = "$user_id";
                const patchData = {
                  $user_id: id,
                  $company: req.body.company,
                  $taxNumber: req.body.taxNumber,
                };

                const data = {
                  db: db,
                  table: "company",
                  values: patchData,
                  columns: patchColumns,
                  options: `WHERE user_id=$user_id`,
                };

                const listData = {
                  db: db,
                  table: "company",
                  values: { $user_id: id },
                  options: `WHERE ${listColumns} = ${listPlaceholder}`,
                };

                // CHECK IF COMPANY ENTRY EXISTS
                const stmtcmp = data.db.prepare(
                  `SELECT * FROM company WHERE user_id='${id}'`
                );
                stmtcmp.get((err, row) => {
                  // COMPANY UPDATE
                  if (row) updateEntry(res, data, listData, true);
                  // COMPANY CREATE
                  else {
                    const data = {
                      db: db,
                      table: "company",
                      columns: "user_id, company, taxNumber, updated_at",
                      placeholder: "$user_id, $company, $taxNumber, $updated_at",
                      values: {
                        $user_id: id,
                        $company: req.body.company,
                        $taxNumber: req.body.taxNumber,
                        $updated_at: timestamp,
                      },
                    };
                    createEntry(res, data, true);
                  }
                });
              }
            }
            // CREATE BILLING
            else {
              const data = {
                db: db,
                table: "billing",
                columns: "user_id, name, address, updated_at",
                placeholder: "$user_id, $name, $address, $updated_at",
                values: {
                  $user_id: id,
                  $name: req.body.name,
                  $address: req.body.address,
                  $updated_at: timestamp,
                },
              };
              createEntry(res, data);
              if (req.body.taxNumber && req.body.company) {
                // COMPANY CREATE
                const data = {
                  db: db,
                  table: "company",
                  columns: "user_id, company, taxNumber, updated_at",
                  placeholder: "$user_id, $company, $taxNumber, $updated_at",
                  values: {
                    $user_id: id,
                    $company: req.body.company,
                    $taxNumber: req.body.taxNumber,
                    $updated_at: timestamp,
                  },
                };
                createEntry(res, data, true);
              }
            }
          }
        });
      });
    } else sessionError(res, message);
  } catch (err) { }
});

// CREATE/UPDATE SHIPPING/CONTACT DATA
router.post("/shipping/:id", (req, res) => {
  const timestamp = Date.now();
  const { id } = req.params;
  try {
    if (sessions[req.cookies.sessionID].localId == id) {
      // const id = sessions[req.cookies.sessionID].localId;
      db.serialize(() => {
        const stmt = db.prepare(`SELECT * FROM shipping WHERE user_id='${id}'`);
        stmt.get((err, rows) => {
          if (err) sqlError(res, err, 400);
          else {
            // IF ENTRY ALREADY EXISTS, IT UPDATES
            if (rows) {
              // UPDATE SHIPPING
              const patchColumns =
                "user_id=$user_id, name=$name, address=$address, updated_at=$updated_at";
              const patchData = {
                $user_id: id,
                $name: req.body.name,
                $address: req.body.address,
              };

              const listColumns = "user_id";
              const listPlaceholder = "$user_id";

              const data = {
                db: db,
                table: "shipping",
                values: patchData,
                columns: patchColumns,
                options: `WHERE user_id=$user_id`,
              };

              const listData = {
                db: db,
                table: "shipping",
                values: { $user_id: id },
                options: `WHERE ${listColumns} = ${listPlaceholder}`,
              };
              updateEntry(res, data, listData);

              if (req.body.email && req.body.phone) {
                const patchColumns =
                  "user_id=$user_id, email=$email, phone=$phone, updated_at=$updated_at";

                const listColumns = "user_id";
                const listPlaceholder = "$user_id";

                const patchData = {
                  $user_id: id,
                  $email: req.body.email,
                  $phone: req.body.phone,
                };

                const data = {
                  db: db,
                  table: "contact",
                  values: patchData,
                  columns: patchColumns,
                  options: `WHERE user_id=$user_id`,
                };

                const listData = {
                  db: db,
                  table: "contact",
                  values: { $user_id: id },
                  options: `WHERE ${listColumns} = ${listPlaceholder}`,
                };

                // CHECK IF CONTACT ENTRY EXISTS
                const stmtcnt = data.db.prepare(
                  `SELECT * FROM contact WHERE user_id='${id}'`
                );
                stmtcnt.get((err, row) => {
                  // CONTACT UPDATE
                  if (row) updateEntry(res, data, listData, true);
                  // CONTACT CREATE
                  else {
                    const data = {
                      db: db,
                      table: "contact",
                      columns: "user_id, email, phone, updated_at",
                      placeholder: "$user_id, $email, $phone, $updated_at",
                      values: {
                        $user_id: id,
                        $email: req.body.email,
                        $phone: req.body.phone,
                        $updated_at: timestamp,
                      },
                    };
                    createEntry(res, data, true);
                  }
                });
              }
            } else {
              const data = {
                db: db,
                table: "shipping",
                columns: "user_id, name, address, updated_at",
                placeholder: "$id, $name, $address, $updated_at",
                values: {
                  $id: id,
                  $name: req.body.name,
                  $address: req.body.address,
                  $updated_at: timestamp,
                },
              };
              createEntry(res, data);
              if (req.body.email && req.body.phone) {
                // CONTACT CREATE
                const data = {
                  db: db,
                  table: "contact",
                  columns: "user_id, email, phone, updated_at",
                  placeholder: "$id, $email, $phone, $updated_at",
                  values: {
                    $id: id,
                    $email: req.body.email,
                    $phone: req.body.phone,
                    $updated_at: timestamp,
                  },
                };
                createEntry(res, data, true);
              }
            }
          }
        });
      });
    } else sessionError(res, message);
  } catch (err) { }

});

// LIST PROFILE DATA
router.get("/:id", (req, res) => {
  // JOIN USERS, BILLING, SHIPPING, COMPANY, CONTACT, UPLOADS TABLES
  const { id } = req.params;
  try {
    if (sessions[req.cookies.sessionID].localId == id) {
      const user_id = sessions[req.cookies.sessionID].localId;
      const data = {
        db: db,
        table: "users",
        values: { $user_id: user_id },
        selectedItems: `
                  users.id AS userId, 
                  users.username AS userName,
                  users.email AS userEmail,
                  users.created_at AS userCreatedAt,
                  users.updated_at AS userUpdatedAt,
                  billing.name AS billingName,
                  billing.address AS billingAddress,
                  billing.updated_at AS billingUpdatedAt,
                  company.company,
                  company.taxNumber,
                  company.updated_at AS companyUpdatedAt,
                  shipping.name AS shippingName,
                  shipping.address AS shippingAddress,
                  shipping.updated_at AS shippingUpdatedAt,
                  contact.email AS contactEmail,
                  contact.phone contactPhone,
                  contact.updated_at AS contactUpdatedAt,
                  uploads.path AS imagePath`,
        options: `
                  LEFT JOIN billing
                  ON users.id = billing.user_id
                  LEFT JOIN company
                  ON users.id = company.user_id
                  LEFT JOIN shipping
                  ON users.id = shipping.user_id
                  LEFT JOIN contact
                  ON users.id = contact.user_id
                  LEFT JOIN uploads
                  ON users.id = uploads.owner_id
                  WHERE users.id=$user_id`,
      };

      readEntry(res, data);
    }
  } catch (err) { }

});

// DELETE BILLING/COMPANY
router.delete("/billing/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (sessions[req.cookies.sessionID].localId == id) {
      // const { id } = sessions[req.cookies.sessionID].localId;
      db.serialize(() => {
        const stmt = db.prepare(`SELECT * FROM company WHERE user_id='${id}'`);
        stmt.get((err, rows) => {
          if (err) sqlError(res, err, 400);
          else {
            console.log();
            const { id } = req.params;
            const billingData = {
              db: db,
              table: "billing",
              columns: "user_id",
              placeholder: "$id",
              values: { $id: id },
            };
            const companyData = {
              db: db,
              table: "company",
              columns: "user_id",
              placeholder: "$id",
              values: { $id: id },
            };
            if (rows) {
              // DELETE BILLING AND COMPANY
              deleteEntry(res, billingData);
              deleteEntry(res, companyData, true);
            }
            // DELETE BILLING
            else deleteEntry(res, billingData);
          }
        });
      });
    }
  } catch (err) { }
});

// DELETE SHIPPING/CONTACT
router.delete("/shipping/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (sessions[req.cookies.sessionID].localId == id) {
      // const { id } = sessions[req.cookies.sessionID].localId;
      db.serialize(() => {
        const stmt = db.prepare(`SELECT * FROM contact WHERE user_id='${id}'`);
        stmt.get((err, rows) => {
          if (err) sqlError(res, err, 400);
          else {
            const { id } = req.params;
            const shippingData = {
              db: db,
              table: "shipping",
              columns: "user_id",
              placeholder: "$id",
              values: { $id: id },
            };
            const companyData = {
              db: db,
              table: "contact",
              columns: "user_id",
              placeholder: "$id",
              values: { $id: id },
            };
            if (rows) {
              // DELETE BILLING AND COMPANY
              deleteEntry(res, shippingData);
              deleteEntry(res, companyData, true);
            }
            // DELETE BILLING
            else deleteEntry(res, shippingData);
          }
        });
      });
    }
  } catch (err) { }

});

export default router;
