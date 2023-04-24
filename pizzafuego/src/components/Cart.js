import React from 'react';
import './../style/cart.css';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { v4 as uuidv4 } from 'uuid';

export default function Cart() {

  const { cart, setCart } = useContext(CartContext);
  
  /* össze adom az összes termék árát a total változóban hogy később megtudjam jeleníteni a fizetendő összeget */  
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const szallitas = 1000;


  /* Kosárból törlés: ha az id egyezik a termék idj-val akkor kitörli a kosárból */
  function removeItem (item) {
    const idx = cart.findIndex(product => product.id === item.id)
    setCart([
      ...cart.slice(0, idx),
      ...cart.slice(idx + 1)
    ])
  }  

  /* Ha a kosár 0 akkor üres a kosár máskülöben a kosár tartalmát listázza ki */

  if (cart.length === 0) {
    return (
      <section className='cart'>
        <div className='cart-container'>
          <h2>A kosár üres</h2>
        </div>
      </section>
    );
  } else {
    return (
      <section className='cart'>        
        <div className='cart-container'>
          {cart.map((item) => (
            <div className='cart-item' key={uuidv4()}>
              <img src={item.image} alt={item.name} />
              <div className='cart-wrap'>
                <h2 id="cart-name">{item.name}</h2>
                <p id="cart-price">{item.price} Ft</p>
                <button className='buy' onClick={() => removeItem(item)}>Törlés</button>                
              </div>
            </div>
          ))}
        </div>

        <div className="ar">
          <span>Rendelés összegzése:</span>
          <span>Szállítási költség: 1000 Ft </span>
          <span>Fizetendő Ár: </span>
          <span id="total">{total + szallitas} Ft</span>
          <button className='buy'>Megrendelem</button>            
        </div>
      </section>
    );
  }
}




