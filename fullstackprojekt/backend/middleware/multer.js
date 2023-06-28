import express from 'express';
import multer from 'multer';
import db from '../create_db.js';
import fs from 'fs';

const router = express.Router();

// Multer middleware konfiguráció
const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/product_images/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const userImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/user_images/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const productImageUpload = multer({ storage: productImageStorage });
const userImageUpload = multer({ storage: userImageStorage });

// Termék kép feltöltése
router.post('/product', productImageUpload.single('file'), (req, res) => {

  if (!req.file) {
    // Ha nincs feltöltött fájl, hibaüzenetet küldünk vissza
    return res.status(400).json({ error: 'No File Uploaded' });
  }

  const productName = req.body.name;
  const category = req.body.category; // Termék kategória lekérése a formból
  const fileName = `${productName}-${Date.now()}-${req.file.originalname}`;

  const uploadPath = `uploads/products/${category}`; // Útvonal a termék kategóriájának megfelelő mappához
  const filePath = `${uploadPath}/${fileName}`; // Teljes elérési út a fájlnévvel

  // Mappa létrehozása, ha nem létezik
  fs.mkdirSync(uploadPath, { recursive: true });

  fs.rename(req.file.path, filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // Fájl átnevezése sikeres, végrehajthatod a products táblába való beszúrást
      // A filePath változót használhatod a kép elérési útvonalaként

      // Termék kép beszúrása az uploads táblába
      const stmt = db.prepare('INSERT INTO uploads (filename, product_image, created_at) VALUES (?, ?, ?)');
      stmt.run(fileName, 1, new Date(), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const uploadId = stmt.lastID;
          // Fájl feltöltése sikeres, végrehajthatod a products táblába való beszúrást
          // A képhez tartozó azonosítóként használhatod az uploadId változót
          res.send('File uploaded successfully!');
        }
      });
    }
  });
});

// Felhasználói kép feltöltése
router.post('/user', userImageUpload.single('file'), (req, res) => {

  if (!req.file) {
    // Ha nincs feltöltött fájl, hibaüzenetet küldünk vissza
    return res.status(400).json({ error: 'No File Uploaded' });
  }

  const fileName = req.file.filename;

  // Felhasználói kép beszúrása az uploads táblába
  const stmt = db.prepare('INSERT INTO uploads (filename, user_image, created_at) VALUES (?, ?, ?)');
  stmt.run(fileName, 1, new Date(), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const uploadId = stmt.lastID;
      console.log(uploadId);
      // Fájl feltöltése sikeres, végrehajthatod a felhasználói táblába való beszúrást
      // A képhez tartozó azonosítóként használhatod az uploadId változót
      res.send('File uploaded successfully!');
    }
  });
});

export default router;

