import { nanoid } from "nanoid";


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

export function addSession(res, id, email, role, username, sessions) {
  const sessionID = nanoid();
  const sessionData = { localId: id, email, role, name: username };
  sessions[sessionID] = sessionData;

  res.json({ success: true, ...sessionData, sessionID });
}