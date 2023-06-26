import { nanoid } from "nanoid";
import { hash } from "bcrypt";
import db from "../create_db.js";

export default function registerUser(req, res) {
  const { username, email, password } = req.body;
  const id = nanoid();
  const created_at = Date.now();
  const role = "user";
  const saltRounds = 10;

  function convertDate(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } else {
      return "Még nem volt módosítva";
    }
  }

  // Ellenőrzés, hogy a mezők ki vannak-e töltve
  if (!email || !password || !username) {
    res
      .status(400)
      .json({ success: false, message: "Kérlek töltsd ki az összes mezőt!" });
    return;
  }

 // Ellenőrzés, hogy az email cím már foglalt-e
db.get("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log("register error", err);
      res
        .status(500)
        .json({ success: false, message: "Hiba történt a regisztráció során" });
      return;
    }
  
    if (result) {
      res
        .status(409)
        .json({ success: false, message: "Az email cím már foglalt" });
      return;
    }
  
    // Jelszó hashelése
    hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.log("Hiba történt a jelszó hashelése során", err);
        res.status(500).json({
          success: false,
          message: "Hiba történt a regisztráció során",
        });
        return;
      }
  
      db.serialize(() => {
        const stmt = db.prepare(
          "INSERT INTO user (id, username, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)"
        );
        stmt.run(
          id,
          username,
          email,
          hashedPassword,
          role,
          created_at,
          (err) => {
            if (err) {
              console.error("Failed to create user:", err);
              res.status(500).json({
                success: false,
                message: "Hiba történt a regisztráció során",
              });
              return;
            }
            res.status(200).json({ message: "User created" });
            console.log(
              "User created",
              "username",
              username,
              "email",
              email,
              "pass",
              hashedPassword,
              "Time",
              convertDate(created_at)
            );
          }
        );
        stmt.finalize();
      });
    });
  });
}  
