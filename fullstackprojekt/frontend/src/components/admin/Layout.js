import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';

const Layout = () => {
  return (
    <>
    <AdminNavigation />    
    <Outlet />
    </>
  )
}

export default Layout