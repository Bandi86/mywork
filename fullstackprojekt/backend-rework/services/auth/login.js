import { nanoid } from "nanoid";
import { database as db } from "../db/db_create_service.js";
import {sessions } from "../../routes/auth.js";


export function getUser(email, callback) {
  // Felhasználó lekérdezése az adatbázisból
  db.get("SELECT * FROM user WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Failed to get user:", err);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

export function addSession(res, id, email, role, username) {  
  const sessionID = nanoid();
  const sessionData = { localId: id, email, role, name: username };
  sessions[sessionID] = sessionData;  

  if (!sessionID) {
    res.status(400).json({ success: false, message: "SessionID is missing" });
    return;
  } else 
  res.json({ success: true, ...sessionData, sessionID });
}