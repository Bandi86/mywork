import sqlite3 from "sqlite3";
sqlite3.verbose();

// error handling
function errorHandling(err) {
  if (err) {
    console.log(err);
  }
}

//connect db
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    errorHandling(err);
  }
  // foreign keys bekapcsolása mert a sqlite nem kapcsolja be alapból
  else {
    db.run("PRAGMA foreign_keys = ON", errorHandling);
    console.log("Connected to the user database.");
  }
});

// create database
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY,
      email VARCHAR(32) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      username TEXT,
      role VARCHAR(32) NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.log("user table creation error", err);
      } else {
        console.log("user table created");
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY,
      category_id INT NOT NULL,
      name VARCHAR(32) UNIQUE NOT NULL,
      price INTEGER NOT NULL,
      description TEXT,
      image TEXT,
      stock INTEGER NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES category(id)
    )`,
    (err) => {
      if (err) {
        console.log("products table creation error", err);
      } else {
        console.log("products table created");
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS category (
      id INT PRIMARY KEY,
      name VARCHAR(32) UNIQUE NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.log("category table creation error", err);
      } else {
        console.log("category table created");
      }
    }
  );
});


// Felhasználó létrehozása az adatbázisban
export function createUser(
  id,
  email,
  hashedPassword,
  username,
  sessionID,
  role,
  created_at,
  callback
) {
  // Adatbázis művelet
  db.run(
    `INSERT INTO user (id, email, password, username, role, session_id, created_at)
        VALUES ($id, $email, $password, $username, $role, $sessionID, $created_at)`,
    {
      $id: id,
      $email: email,
      $password: hashedPassword,
      $username: username,
      $role: role,
      $sessionID: sessionID,
      $created_at: created_at,
    },
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
}

// Felhasználó sessionID-jének frissítése
export function updateUserSessionID(email, sessionID, callback) {
  db.run(
    "UPDATE user SET session_id = ? WHERE email = ?",
    [sessionID, email],
    (err) => {
      if (err) {
        console.error("Failed to update sessionID:", err);
        callback(err);
      } else {
        callback(null);
      }
    }
  );
}

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

export default db;