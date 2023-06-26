import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const app = express();
const PORT = 8000;

function errorHandling(err) {
  if (err) {
    console.log(err);
  }
}

// CORS middleware használata
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true    
}));

// JSON adatok kezelése (middleware)
app.use(express.json());

// Cookie parser middleware használata
app.use(cookieParser());

// authRouter és adminRouter használata
app.use("/", authRouter);
app.use("/admin", adminRouter);


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});