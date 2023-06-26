import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { getUser } from "../create_db.js";
import db from "../create_db.js";

export const sessions = {};

function login(req, res) {  
  db.serialize(() => {
    getUser(req.body.email, (err, row) => {
      if (err) {
        console.error("Failed to get user:", err);
        res.status(500).json({ error: "Hiba történt a bejelentkezés során" });
      } else {
        if (row.email) {
          const hashedPassword = row.password;

          bcrypt.compare(
            req.body.password,
            hashedPassword,
            (compareErr, isMatch) => {
              if (compareErr) {
                console.log("login error", compareErr);
                res
                  .status(500)
                  .json({ error: "Hiba történt a bejelentkezés során" });
              } else {
                if (isMatch) {
                  const sessionID = nanoid(8);
                  const sessionData = { localId: row.id, email: row.email, role: row.role, name: row.username };
                  sessions[sessionID] = sessionData;                  

                  res.send({ ...sessionData, sessionID });
                  console.log(
                    "Sikeres bejelentkezés",
                    "user:",
                    row.username,
                    "role",
                    row.role,
                    "email:",
                    row.email,
                    "sessionID:",
                    sessionID
                  );
                }
              }
            }
          );
        }
      }
    });
  });
}

export default login;
