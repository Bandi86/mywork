import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import { CartContext } from './components/CartContext'
import { useState } from 'react';
import Search from './components/Search'
import { products } from './components/shop/Data'


export default function Layout() {

  const [cart, setCart] = useState([])
  const [searchActive, setSearchActive] = useState(false);   

  return (
    <>
    <CartContext.Provider value={{cart, setCart}}>
    <Nav setSearchActive={setSearchActive} searchActive={searchActive} />
    {searchActive && <Search products={products}  /> }    
    <Outlet />
    </CartContext.Provider>    
    </>
  )
}
