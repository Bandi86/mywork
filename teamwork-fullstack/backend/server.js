// TOOLS
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// TABLES INIT
import tablesInit from "./sql/create_tables.js";

// endPoints
import routerAuth from "./endPoints/auth.js";
import routerUsers from "./endPoints/users.js";
import routerUserProfile from "./endPoints/profile.js";
import routerProducts from "./endPoints/products.js";
import routerCategories from "./endPoints/categories.js";
import routerCart from "./endPoints/cart.js";
import routerFavorites from "./endPoints/favorites.js";
import routerUploads from "./endPoints/uploads.js";
import routerOrders from "./endPoints/orders.js";
import routerReviews from "./endPoints/reviews.js"
import routerTotals from "./endPoints/totals.js"

// TABLES CREATION
tablesInit();

const app = express();
const PORT = 8080;

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Cookie parser middleware
app.use(cookieParser());

// STORAGE
// app.use('/tmp/uploads', express.static('tmp/uploads'));  //example

// ENDPOINTS
app.use("/api/auth", routerAuth);
app.use("/api/users", routerUsers);
app.use("/api/userProfile", routerUserProfile);
app.use("/api/products", routerProducts);
app.use("/api/categories", routerCategories);
app.use("/api/cart", routerCart);
app.use("/api/favorites", routerFavorites);
app.use("/api/uploads", routerUploads);
app.use("/api/orders", routerOrders);
app.use("/api/reviews", routerReviews)
app.use("/api/totals", routerTotals)
app.use("/uploads", express.static("uploads"));
// LISTENER
app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
