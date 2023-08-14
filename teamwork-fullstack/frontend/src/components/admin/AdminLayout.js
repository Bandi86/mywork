import { Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";

export default function AdminLayout() {
  return (
    <div className="flex flex-row h-min-screen">
      <AdminNavigation />
      <Outlet />
    </div>
  );
}
