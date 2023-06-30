import { database } from "./db_create_service.js"

// user table
export function user() {
  database.run(
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
      FOREIGN KEY (image_id) REFERENCES uploads (id),
      FOREIGN KEY (cart_id) REFERENCES cart (id),
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (favorites_id) REFERENCES favorites (id)
    )`,
    (err) => {
      if (err) {
        console.log("user table creation error", err);
      } else {
        console.log("user table created");
      }
    }
  );
}

// cart table
export function cart() {
  database.run(
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
}

export function products() {
  database.run(
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
      FOREIGN KEY (category_id) REFERENCES categories(id),
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
}

// categories table
export function categories() {
  database.run(
    `CREATE TABLE IF NOT EXISTS categories (
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
}

// orders table
export function orders() {
  database.run(
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
}

// favorites table
export function favorites() {
  database.run(
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
}

// uploads table

export function uploads() {
  database.run(
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
}
