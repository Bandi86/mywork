import { createBrowserRouter } from "react-router-dom";

import AdminHome from "../components/admin/AdminHome";
import AdminLayout from "../components/admin/AdminLayout";
import CategoryList from "../components/admin/Categories/CategoryList";
import AdminOrder from "../components/admin/Orders/AdminOrder";
import AddProduct from "../components/admin/Products/AddProduct";
import ProductRender from "../components/admin/Products/ProductRender";
import AdminUsers from "../components/admin/Users/AdminUsers";
import Authorization from "../components/auth/Authorization";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import UserCart from "../components/cart/UserCart";
import Favorites from "../components/favorites/Favorites";
import Summary from "../components/orders/Summary";
import SingleProduct from "../components/products/SingleProduct";
import UserProductsRendering from "../components/products/UserProductsRendering";
import Home from "../components/user/Home";
import Layout from "../components/user/Layout";
import LayoutProfile from "../components/user/LayoutProfile";
import Settings from "../components/user/Settings";
import Orders from "../components/user/Orders";
import UploadAvatar from "../components/user/UploadAvatar";
import PassWordModal from "../components/admin/PassWordModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/registration", element: <Registration /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile/:id",
        element: (
          <Authorization>
            <LayoutProfile />
          </Authorization>
        ),
        children: [
          {
            path: "/profile/:id/settings",
            element: (
              <Authorization>
                <Settings />
              </Authorization>
            ),
          },
          {
            path: "/profile/:id/avatar",
            element: (
              <Authorization>
                <UploadAvatar />
              </Authorization>
            ),
          },
          {
            path: "/profile/:id/orders",
            element: (
              <Authorization>
                <Orders />
              </Authorization>
            ),
          },
        ],
      },
      {
        path: "/products",
        element: <UserProductsRendering />,
      },
      {
        path: "/products/category/:categoryid",
        element: <UserProductsRendering />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/favorites",
        element: (
          <Authorization>
            <Favorites />
          </Authorization>
        ),
      },
      {
        path: "/cart",
        element: <UserCart />,
      },
      {
        path: "/cart/:id",
        element: (
          <Authorization>
            <UserCart />
          </Authorization>
        ),
      },
      {
        path: "/orders/summary",
        element: (
          <Authorization>
            <Summary />
          </Authorization>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <Authorization>
            <AdminHome />
          </Authorization>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <Authorization>
            <ProductRender />
          </Authorization>
        ),
      },
      {
        path: "/admin/create-product",
        element: (
          <Authorization>
            <AddProduct />
          </Authorization>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <Authorization>
            <CategoryList />
          </Authorization>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <Authorization>
            <AdminOrder />
          </Authorization>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <Authorization>
            <AdminUsers />
          </Authorization>
        ),
      },     
    ],
  },
]);
