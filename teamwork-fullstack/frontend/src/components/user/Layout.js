import { Outlet } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import FooterSection from "./Footer";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/userContext";

function Layout() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  // ADMIN NAV
  useEffect(() => {
    if (user.role == "admin") navigate("/admin/dashboard");
  }, [user])

  return (

    <div className="flex flex-col">
      <Navbar />
      <main className="min-h-screen-full">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
      <FooterSection />
    </div>

  );
}

export default Layout;