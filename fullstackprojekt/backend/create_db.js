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
      id INT PRIMARY KEY,
      username VARCHAR(32) UNIQUE NOT NULL,
      email VARCHAR(64) UNIQUE NOT NULL,
      password VARCHAR(64) NOT NULL,
      role VARCHAR(16) NOT NULL,
      isDeleted BOOLEAN DEFAULT false,
      image_id INT,
      cart_id INT,
      order_id INT,
      favorites_id INT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY (image_id) REFERENCES uploads(id),
      FOREIGN KEY (cart_id) REFERENCES cart(id),
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (favorites_id) REFERENCES favorites(id)
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
    `CREATE TABLE IF NOT EXISTS cart (
      id INT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (product_id) REFERENCES uploads(id)
    )`,
    (err) => {
      if (err) {
        console.log("cart table creation error", err);
      } else {
        console.log("cart table created");
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
      image_id INT,
      stock INTEGER NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      isDeleted BOOLEAN DEFAULT false,
      FOREIGN KEY (category_id) REFERENCES category(id),
      FOREIGN KEY (image_id) REFERENCES uploads(id)
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
      isDeleted BOOLEAN DEFAULT false,
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

  db.run(
    `CREATE TABLE IF NOT EXISTS favorites (
      id INT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`,
    (err) => {
      if (err) {
        console.log("favorites table creation error", err);
      } else {
        console.log("favorites table created");
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      isDeleted BOOLEAN DEFAULT false,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`,
    (err) => {
      if (err) {
        console.log("orders table creation error", err);
      } else {
        console.log("orders table created");
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS uploads (
      id INT PRIMARY KEY,
      filename TEXT,
      path TEXT,
      product_image INTEGER DEFAULT 0,
      user_image INTEGER DEFAULT 0,

      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      isDeleted BOOLEAN DEFAULT false
    )`,
    (err) => {
      if (err) {
        console.log("uploads table creation error", err);
      } else {
        console.log("uploads table created");
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

// Felhasználó sessionID-jének frissítése ha szükséges
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
