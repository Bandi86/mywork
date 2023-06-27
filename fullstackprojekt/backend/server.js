import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import productsRouter from "./routes/products.js";

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


app.use("/", authRouter);
app.use("/admin", adminRouter);
app.use("/profile/:localId", userRouter);
app.use("/", productsRouter)


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});