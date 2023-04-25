import { products } from './shop/Data';
import './../style//shop.css';
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from './CartContext';
import { useContext } from 'react';

export default function Shop() {  
  
  const { cart, setCart } = useContext(CartContext);

  function addProductToCart(product) {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
  
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].amount++;
      setCart(updatedCart);
    } else {
      const item = {...product, amount: 1};
      setCart([...cart, item]);
    }
  }

  return (
    <>
    <h1>Termékeink</h1>
    <div className='shop-container'>
      {
        products.map(product =>
        <div className="product" key={uuidv4()}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.desc}</p>
          <p>{product.price} Ft</p>
          <button className="buy" onClick={() => addProductToCart(product)}>Kosárba</button>
        </div>)
      }      
    </div>
    </>
  ) 
}