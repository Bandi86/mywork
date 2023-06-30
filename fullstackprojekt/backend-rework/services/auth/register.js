import { database as db } from "../db/db_create_service.js";

export function validateFields(fields) {
    for (const field of Object.values(fields)) {
      if (!field) {
        return { success: false, message: `${field.name} is required` };
      }
    }
    return { success: true };
  }

  export function validatePassword(password) {
    if (password.length < 6) {
      return { success: false, message: "Password needs to be 6 characters or longer" };
    }
    return { success: true };
  }
  
  export function validateUsername(username) {
    if (username.length < 3) {
      return { success: false, message: "Name must be at least 3 characters long" };
    }
    return { success: true };
  }
  
  export function validateEmail(email) {
    if (!email.includes("@")) {
      return { success: false, message: "Email must include @" };
    }
    if (!email.includes(".")) {
      return { success: false, message: "Email must include ." };
    }
    return { success: true };
  }

  export async function isEmailTaken(email) {
    const existingUser = await getUserByEmail(email);
    return !!existingUser;
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

  export function createUser(id, username, email, hashedPassword, role, created_at) {
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