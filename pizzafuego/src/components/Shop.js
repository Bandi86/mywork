import { products } from './shop/Data';
import './../style//shop.css';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { v4 as uuidv4 } from 'uuid';

export default function Shop() {

  const { cart, setCart } = useContext(CartContext);
  

  function addProductToCart(product) {
    setCart([...cart, product]);
    
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
          <button className="buy"  onClick={() => addProductToCart(product)}>Kosárba</button>
        </div>)
      }      
    </div>
    </>
  ) 
}