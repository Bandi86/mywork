import products from './db/webshop-project-a38cd-default-rtdb-export.json' assert { type: "json" };
import sqlite3 from 'sqlite3';

function sqlError(err, message) {
	if (err) {
		console.error(err);
	} else if (message) {
		console.log(message);
	}
}

const db = new sqlite3.Database('./db/products.db', (err) => {
	if (err) {
		sqlError(err);
	} else {
		console.log('Connected to the database.');
	}
});

db.serialize(() => {
	db.run('DROP TABLE IF EXISTS products', sqlError);
	db.run(
		'CREATE TABLE IF NOT EXISTS products (id INT, title char(255), price INT, image char(255), created_at INT)',
		sqlError
	);

	const stmt = db.prepare('INSERT INTO products (id, title, price, image, created_at) VALUES (?, ?, ?, ?, ?)');
	console.log(products.termekek);

	const productsArray = Object.values(products.termekek);

	productsArray.forEach((product) => {
		stmt.run(product.id, product.title, product.price, product.image);
	});

	stmt.finalize(sqlError);
});

db.close();




