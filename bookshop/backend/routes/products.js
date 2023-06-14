import sqlite3 from 'sqlite3';
import express from 'express';
import crypto from 'crypto';

sqlite3.verbose();

const router = express.Router();

// open the database file-based
const db = new sqlite3.Database('./db/products.db', (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log('Connected to the products database.');
	}
});


// Definiáljuk a termékek lekérdezésének útvonalát
router.get('/products', (req, res) => {
  // termékek lekérdezésére és a válasz visszaküldésére
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('select products', err);
            res.status(500).json({ error: 'adatbázis hiba' });
        } else {
            res.json(rows);
        }
    })
});

//Egy adat lekérdezése (id)
router.get('/products/:id', (req, res) => {
	const { id } = req.params;
	db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
		if (err) {
			console.error('get car', err);
			res.status(500).json({ error: 'adatbázis hiba' });
		} else {
			res.json(row || {});
		}
	});
});

// Adat hozzáadása POST
router.post('/products', (req, res) => {
    console.log(req.body);
	const { title, price, image, created_at } = req.body;	
	const id = crypto.randomUUID();

	db.run(
		'INSERT INTO products (id, title, price, image, created_at) VALUES ($id, $title, $price, $image, $created_at)',
		{
            $id: id,
            $title: title,
            $price: price,
            $image: image,
            $created_at: created_at || Date.now(),
        },
		(err) => {
			if (err) {
				console.error('insert product', err);
				res.status(500).json({ error: 'adatbázis hiba' });
			} else {
				res.json({ id });
			}
		}
	);
});

// Adat módosítása PATCH




// Exportáljuk a router objektumot
export default router;