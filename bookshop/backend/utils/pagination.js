import sqlite3 from 'sqlite3';

function products_pagination(pageNumber, pageSize) {
  const db = new sqlite3.Database('products.db');

  // Lapozás számítása
  const offset = (pageNumber - 1) * pageSize;

  // Adatok lekérdezése az adott oldalról
  const query = `SELECT * FROM items LIMIT ${pageSize} OFFSET ${offset}`;

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
}

export default products_pagination;
