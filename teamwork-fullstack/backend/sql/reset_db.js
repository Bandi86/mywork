import db from './db.js';
import { sqlError } from '../services/errors.js'

db.serialize(() => {
    db.run("DROP TABLE users", (err) => {
        if (err) sqlError(err)
    })
    db.run("DROP TABLE categories", (err) => {
        if (err) sqlError(err)
    })
    db.run("DROP TABLE products", (err) => {
        if (err) sqlError(err)
    })
    db.run("DROP TABLE uploads", (err) => {
        if (err) sqlError(err)
    })
    db.run("DROP TABLE orders", (err) => {
        if (err) sqlError(err)
    })
    db.run("DROP TABLE cart", (err) => {
        if (err) sqlError(err)
    })
    db.run("DROP TABLE favorites", (err) => {
        if (err) sqlError(err)
    })
});

db.close();