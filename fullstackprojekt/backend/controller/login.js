import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { getUser } from "../create_db.js";

export const sessions = {};

function login(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "No request body" });
  }

  const { email, password } = req.body;

  getUser(email, (err, user) => {
    if (err) {
      console.error("Failed to get user:", err);
      return res.status(500).json({ error: "Error during login" });
    }

    if (!user) {
      return res.status(401).json({ error: "No registered users found" });
    }

    const { id, password: hashedPassword, username, role } = user;

    bcrypt.compare(password, hashedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        console.error("Login error:", compareErr);
        return res.status(500).json({ error: "Error during login" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const sessionID = nanoid();
      const sessionData = { localId: id, email, role, name: username };
      sessions[sessionID] = sessionData;

      console.log(
        "Successful login",
        "user:", username,
        "role:", role,
        "email:", email,
        "sessionID:", sessionID
      );

      res.json({ success: true, ...sessionData, sessionID });
    });
  });
}

export default login;

