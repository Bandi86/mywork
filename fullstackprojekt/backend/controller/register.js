import { nanoid } from "nanoid";
import { hash } from "bcrypt";
import db from "../create_db.js";

export default async function registerUser(req, res) {  
  const { username, email, password } = req.body;
  const id = nanoid();
  const created_at = Date.now();
  const role = "user";
  const saltRounds = 10;

  // Dátum formázása
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

  // input validation
  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
    return;
  } else if (username.length < 3) {
    res.status(400).json({
      success: false,
      message: "Username must be at least 3 characters",
    });
    return;    
  } else if (!email.includes("@")) {
    res.status(400).json({
      success: false,
      message: "Email must contain @",
    });
    return;    
  } else if (!email.includes(".")) {
    res.status(400).json({
      success: false,
      message: "Email must contain .",
    });
    return;
  }

  try {
    // Ellenőrzés, hogy az email cím már foglalt-e
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res
        .status(409)
        .json({ success: false, message: "Az email cím már foglalt" });
      return;
    }

    // Jelszó hashelése
    const hashedPassword = await hashPassword(password, saltRounds);

    await createUser(id, username, email, hashedPassword, role, created_at);

    res.status(200).json({ success: true, message: "User created" });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Hiba történt a regisztráció során" });
  }
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function hashPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
    hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
}

function createUser(id, username, email, hashedPassword, role, created_at) {
  return new Promise((resolve, reject) => {
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
            reject(err);
          } else {
            resolve();
          }
        }
      );
      stmt.finalize();
    });
  });
}

