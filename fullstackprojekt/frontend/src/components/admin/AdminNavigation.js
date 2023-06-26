import React from 'react'
import { Link } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div className="w-full bg-black text-white font-bold">
                <ul className="flex flex-row items-center p-4 gap-6 justify-between ml-4 mr-4">
                <Link to="/"><li>Home</li></Link>
                <Link to="/admin/products"><li>Products</li></Link>
                <Link to="/admin/categories"><li>Categories</li></Link>
                <li>Users</li>
                <li>Orders</li>                            
            </ul>            
          </div>
        
      );
}

export default AdminNavigation