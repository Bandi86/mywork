import db from "./db.js";

export default function tablesInit() {
  db.serialize(() => {
    // users Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY, 
      username VARCHAR(128) NOT NULL, 
      email VARCHAR(128) NOT NULL, 
      password VARCHAR(256) NOT NULL, 
      role VARCHAR(16) NOT NULL, 
      created_at TIMESTAMP, 
      updated_at TIMESTAMP
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // products Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY, 
      category_id INT NOT NULL, 
      name VARCHAR(32) UNIQUE NOT NULL, 
      price INTEGER NOT NULL, 
      description TEXT, 
      stock INTEGER NOT NULL, 
      created_at TIMESTAMP, 
      updated_at TIMESTAMP, 
      isDeleted BOOLEAN DEFAULT false, 
      FOREIGN KEY(category_id) REFERENCES categories(id)
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // reviews Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS reviews (
      id INT PRIMARY KEY,
      productid INT NOT NULL,
      comment TEXT,
      points INT NOT NULL,
      created_at TIMESTAMP,
      FOREIGN KEY (productid) REFERENCES products(id)
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // categories Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS categories (
      id INT PRIMARY KEY, 
      name VARCHAR(32) UNIQUE NOT NULL, 
      created_at TIMESTAMP, 
      updated_at TIMESTAMP
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // orders Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      product_ids TEXT NOT NULL,
      quantity TEXT NOT NULL,
      total INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT processing,
      billing TEXT NOT NULL,
      shipping TEXT NOT NULL,
      contactEmail TEXT NOT NULL,
      contactPhone INTEGER NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      isDeleted BOOLEAN DEFAULT false
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // billing table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS billing (
      user_id INT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      updated_at TIMESTAMP
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // shipping table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS shipping (
      user_id INT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      updated_at TIMESTAMP
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // company table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS company (
      user_id INTEGER NOT NULL,
      company TEXT,
      taxNumber INTEGER,
      updated_at TIMESTAMP
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // contact table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS contact (
      user_id INTEGER NOT NULL,
      email TEXT,
      phone INTEGER,
      updated_at TIMESTAMP
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // uploads Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS uploads (
        id INT,
        owner_id INT,
        filename TEXT,
        path TEXT,             
        created_at TIMESTAMP,
        isDeleted BOOLEAN DEFAULT false
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // cart Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS cart (
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL, 
      updated_at TIMESTAMP, 
      FOREIGN KEY(user_id) REFERENCES user(id), 
      FOREIGN KEY(product_id) REFERENCES products(id)
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // favorites Table creation
    db.run(
      `CREATE TABLE IF NOT EXISTS favorites (
      user_id INTEGER NOT NULL, 
      product_id INTEGER NOT NULL, 
      FOREIGN KEY(user_id) REFERENCES user(id), 
      FOREIGN KEY(product_id) REFERENCES products(id)
      )`,
      (err) => {
        if (err) console.log(err);
      }
    );

    // ADMIN USER CREATION -- DB.CLOSE() WOULD NEED TO BE WITHIN THE WITHIN THE SELECT
    const id = "SGy20bfFtxm5xJbV";
    db.get(`SELECT * FROM users WHERE id=$id`, id, (err, row) => {
      if (err) console.log(err);
      else {
        if (row) return;
        else {
          db.run(
            `INSERT INTO users (
                  id, 
                  username, 
                  email, 
                  password, 
                  role) 
                  VALUES (
                  'SGy20bfFtxm5xJbV', 
                  'admin', 
                  'admin@admin.com', 
                  '$2b$10$EMTFIGSe/fdMBgNtCwtuq.8nC9yvguHWPPLyIgr7aZJQvQkXL3AO2', 
                  'admin'
                  )`,
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      }
    });
  });
}
