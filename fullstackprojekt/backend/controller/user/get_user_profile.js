export default function getUserProfile(req, res) {
    console.log(req.params)
    const id = req.params.localId;
    db.all(`SELECT * FROM users WHERE id = ${id}`, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Hiba történt a lekérdezés során" });
      } else if (rows.length === 0) {
        res.status(404).json({ error: "Nincs ilyen felhasználó" });
      } else {
        res.json(rows[0]);
      }
    });
  }
  