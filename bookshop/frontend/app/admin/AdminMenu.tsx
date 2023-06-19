import React from "react";
import Link from "next/link";

const AdminMenu = () => {
  return (
    <div className="flex flex-row max-w-container p-4 items-center justify-center gap-6 font-bold">
      <Link href="/admin/addproducts">
        <h2>Add Products</h2>
      </Link>
      <Link href="admin/manageproducts">
        <h2>Manage Products</h2>
      </Link>
      <Link href="admin/manageusers">
        <h2>Manage Users</h2>
      </Link>
      <Link href="admin/manageorders">
        <h2>Manage Orders</h2>
      </Link>
    </div>
  );
};

export default AdminMenu;
