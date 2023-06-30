import { errorHandling, database } from "./services/db/db_create_service.js";
import sqlite3 from "sqlite3";

import {
  uploads,
  user,
  categories,
  products,
  cart,
  orders,
  favorites,
} from "./services/db/create_db_tables.js";

sqlite3.verbose();

export default function createDb() {
  // create database
 errorHandling();
  database.serialize(() => {
    uploads(), user(), products(), cart(), categories(), orders(), favorites();
  });
}
