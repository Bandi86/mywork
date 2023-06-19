import express from 'express';
import productRoutes from './routes/products.js';

const app = express();
const port = 8000;


// CORS engedélyezése
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // vagy '*' az összes eredeti erőforrás engedélyezéséhez
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Engedélyezett fejlécek
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Üdvözöljük az alkalmazásban!');
});

// Regisztrát az útvonal
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Az Express alkalmazás fut a http://localhost:${port} címen!`);
});