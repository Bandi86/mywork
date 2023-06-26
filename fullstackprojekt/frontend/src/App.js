import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components

//admin
import AdminLayout from "./components/admin/Layout";
import AdminProducts from "./components/admin/products/AdminProducts";
import AdminCategories from "./components/admin/categories/AdminCategories";

//user
import Layout from "./components/Layout";

// Pages
import Home from "./pages/user/home";
import Admin from "./pages/admin/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <Admin /> },
      { path: "/admin/products", element: <AdminProducts /> },
     {path: "/admin/categories", element: <AdminCategories />}
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

