import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

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
import Index from "./pages/admin/index";

// User
import Layout from "./components/Layout";
import Home from "./pages/user/home";
import ProfileDetails from "./components/user/ProfileDetails";
import ProductsList from "./components/ProductsList";
import EditProduct from "./components/admin/products/EditProduct";

function App() {
  const [user, setUser] = useState([]);
  const [cookies, setCookie, clearCookie] = useCookies();

  useEffect(() => {
    if (cookies.sessionID) {
      fetch("http://localhost:8000/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionID: cookies.sessionID }),
      })
        .then((resp) => resp.json())
        .then((resBody) => {
          if (resBody && resBody.email) {
            setUser(resBody);
          } else {
            clearCookie("sessionID");
          }
        })
        .catch((error) => {
          console.log(error);
          clearCookie("sessionID");
        });
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        { path: "/", element: <Home /> },
        { path: "/products", element: <ProductsList /> },
        {
          path: "/profile/:localId",
          element: <Auth children={<ProfileDetails />}></Auth>,
        },
        { path: "/logout", element: <Auth children={<Logout />}></Auth> },       
      ],
    },
    {
      path: "/admin",
      element: <Auth children={<AdminLayout />}></Auth>,
      children: [
        {
          path: "/admin",
          element: <Auth children={<Index />}></Auth>,
        },
        {
          path: "/admin/products",
          element: <Auth children={<AdminProducts />}></Auth>,
        },
        {
          path: "/admin/categories",
          element: <Auth children={<AdminCategories />}></Auth>,
        },       
        {
          path: "/admin/products/edit/:id",
          element: <Auth children={<EditProduct />}></Auth>,
        },
      ],
    },
  ]);

  // const router = createBrowserRouter(routes);

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
