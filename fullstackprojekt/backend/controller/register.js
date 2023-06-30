import { nanoid } from "nanoid";
import { hash } from "bcrypt";
import db from "../create_db.js";
import { userImageUploadFunction } from "../middleware/multer.js";

export default async function registerUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ success: false, message: "No request body" });
  }

  // Felhasználói regisztrációs adatok
  const registrationData = JSON.parse(req.body.registrationData);
  const { username, email, password } = registrationData;

  let role = "";
  if (email === "susutechno@gmail.com") {
    role = "admin";
  } else {
    role = "user";
  }

  const id = nanoid();
  const created_at = Date.now();
  const saltRounds = 10;

  // Dátum formázása
  function convertDate(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } else {
      return "Date was not updated";
    }
  }

  // Ellenőrzés, hogy a mezők ki vannak-e töltve
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ success: false, message: "fill in all fields" });
  }

  // input validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password needs to be 6 characters or longer",
    });
  } else if (username.length < 3) {
    return res.status(400).json({
      success: false,
      message: "name must be at least 3 characters long",
    });
  } else if (!email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "email must include @",
    });
  } else if (!email.includes(".")) {
    return res.status(400).json({
      success: false,
      message: "email must include .",
    });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "email cannot be used because it's already in use",
      });
    }
  
    const hashedPassword = await hashPassword(password, saltRounds);
  
    await userImageUploadFunction(req, res, id); // Felhasználói kép feltöltése
  
    await createUser(id, username, email, hashedPassword, role, created_at); // Felhasználó létrehozása
  
    console.log(
      "Felhasználó létrehozva",
      "Felhasználónév",
      username,
      "Email",
      email,
      "Jelszó",
      hashedPassword,
      "Idő",
      convertDate(created_at)
    );
  
    return res.status(200).json({ success: true, message: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Registration Failed" });
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
      stmt.run(id, username, email, hashedPassword, role, created_at, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  });
}
}
