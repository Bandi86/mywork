import express from 'express';
import productRoutes from './routes/products.js';

const app = express();
const port = 8000;


app.use(express.json());

app.get('/', (req, res) => {
	res.send('Üdvözöljük az alkalmazásban!');
});

// Regisztrát az útvonal
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Az Express alkalmazás fut a http://localhost:${port} címen!`);
});