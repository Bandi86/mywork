import sqlite3 from "sqlite3";

export function errorHandling(err) {
  if (err) {
    console.log(err);
  }
}


export const database = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    errorHandling(err);
  } else {
    database.run("PRAGMA foreign_keys = ON", errorHandling);
    console.log("Connected to the user database.");
  }
});
