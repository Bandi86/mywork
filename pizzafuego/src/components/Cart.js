import React from 'react';
import './../style/cart.css';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


export default function Cart() {

  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  
  /**
 * Removes a product from the shopping cart.
 * @param {Object} product - The product to remove from the cart.
 * @param {number} product.id - The unique ID of the product.
 */
function removeItem (product) {    
  // Find the index of the product to remove in the cart array.
  const idx = cart.findIndex(item => product.id === item.id)
  
  // Create a new cart array without the product at the found index.
  setCart([
    ...cart.slice(0, idx),
    ...cart.slice(idx + 1)
  ])
}

// Increases the amount of a given product in the cart by 1.
// Parameters:
//   - product: Object representing the product to be updated
// Side effects:
//   - Updates the cart state with the updated product amount
//   - Calls the updateTotal function to recalculate the total price
function addAmount(product) {
  const idx = cart.findIndex((item) => item.id === product.id);

  if (idx >= 0) {
    const updatedCart = [...cart];
    updatedCart[idx].amount++;
    setCart(updatedCart);
    updateTotal(updatedCart);
  }
}

/**
 * Decreases the amount of a product in the cart by one, and removes it if the amount becomes zero.
 * @param {Object} product - The product to remove from the cart.
 */
function minusAmount(product) {
  // Find the index of the product in the cart.
  const idx = cart.findIndex((item) => item.id === product.id);

  // Check if the product is in the cart and its amount is greater than zero.
  if (idx >= 0 && cart[idx].amount > 0) {
    // Create a copy of the cart.
    const updatedCart = [...cart];
    
    // Decrease the amount of the product in the copy.
    updatedCart[idx].amount--;

    // If the amount of the product becomes zero, remove it from the cart.
    if (updatedCart[idx].amount === 0) {
      updatedCart.splice(idx, 1);
    }

    // Set the state of the cart to the updated copy and update the total price.
    setCart(updatedCart);
    updateTotal(updatedCart);
  }
}

 /**
 * Calculates and updates the total price of the cart, including shipping cost.
 * @param {Array} updatedCart - An array of objects representing the updated cart.
 */
function updateTotal(updatedCart) {
  // Calculate the total price by reducing the updated cart array.
  const total = updatedCart.reduce((sum, product) => sum + product.price * product.amount, 0);

  // Set the shipping cost.
  const delivery = 1000;

  // Set the total price of the cart by adding the shipping cost to the product total.
  setTotal(total + delivery);
}
  

  if (cart.length === 0) {
    return (
      <>             
      <h2 id="cart-empty">A kosár üres nem adott hozzá terméket</h2>
      <img src="https://www.nicepng.com/png/detail/322-3224210_your-cart-is-currently-empty-empty-shopping-cart.png" alt="cart empty" />
      </>     
    );
  } else {
    return (
      <section>


      </section>
    )    
  }  
}