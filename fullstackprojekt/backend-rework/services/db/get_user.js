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