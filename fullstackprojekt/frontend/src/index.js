/* import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components

// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Auth from "./components/auth/Auth";
import Logout from "./components/auth/Logout";

// Admin
import AdminLayout from "./components/admin/Layout";
import AdminProducts from "./components/admin/products/AdminProducts";
import AdminCategories from "./components/admin/categories/AdminCategories";

// User
import Profile from "./pages/user/profile";

// Pages

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}>

<CookiesProvider>
    <App />
  </CookiesProvider>
</RouterProvider>); */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
