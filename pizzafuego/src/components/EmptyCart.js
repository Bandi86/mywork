import React from 'react'
import './../style/emptycart.css'
import { Link } from 'react-router-dom'


export default function EmptyCart() {
  return (
    <section>
        <div className='empty-container'>
            <img src='https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=' alt='emptycart'></img>
            <h1>Your Cart is currently empty</h1>
            <p>Before proceed to checkout, you must add some products to your cart.<br />
               You will find a lot of intresting products on our 'Shop' page. 
            </p>
            <Link to="/shop" ><button className='return-shop'>RETURN TO SHOP</button></Link>
        </div>
    </section>
  )
}
