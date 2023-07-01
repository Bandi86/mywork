import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createDb from "./create_db.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import { errorHandling } from "./services/db/db_create_service.js";

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

app.use(bodyParser.urlencoded({ extended: true }))

// Authentikációs útvonalak
app.use("/", authRoutes);

// Admin útvonalak
app.use("/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
