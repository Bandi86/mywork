import sqlite3 from "sqlite3";
import path from "path";

const db = new sqlite3.Database(
  path.resolve("./sql/webshop.db"),
  (err, msg) => {
    if (err) {
      console.log("Database creation error:", err);
    } else {
      console.log("Database is up and running");
    }
  }
);

export default db;
