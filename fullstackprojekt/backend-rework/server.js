import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandling } from "./services/db/db_create_service.js";
import createDb from "./create_db.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 8000;

errorHandling();

createDb()

// CORS middleware használata
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// JSON adatok kezelése (middleware)
app.use(express.json());

// Cookie parser middleware használata
app.use(cookieParser());

// Authentikációs útvonalak
app.use("/", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
