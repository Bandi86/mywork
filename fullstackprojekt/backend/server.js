import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import productsRouter from "./routes/products.js";
import multerRouter from "./middleware/multer.js";
import multer from "multer"; 
import bodyParser from "body-parser";

const app = express();
const PORT = 8000;

function errorHandling(err) {
  if (err) {
    console.log(err);
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// CORS middleware használata
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true    
}));

// Multer middleware konfiguráció
const upload = multer(); // A `multer` middleware példányosítása

// JSON adatok kezelése (middleware)
app.use(express.json());

// Cookie parser middleware használata
app.use(cookieParser());


// Multer middleware használata a multipart form adatok kezelésére
app.use(upload.any()); // Az `upload` middleware használata, amely bármilyen típusú fájlt elfogad

// Multer middleware használata a képfeltöltési útvonalhoz
app.use("/upload", multerRouter);

app.use("/", authRouter);
app.use("/admin", adminRouter);
app.use("/profile/:localId", userRouter);
app.use("/", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
