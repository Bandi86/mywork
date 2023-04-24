import React, { useState } from 'react';
import './../style/search.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CartContext } from './CartContext';
import { useContext } from 'react';

export default function Search(props) {

  const { cart, setCart } = useContext(CartContext);

  /* Kosárhoz adás: illetve a találati lista és a kereső értékeinek lenullázása */
  function addProductToCart(product) {
    setCart([...cart, product]);
    setSearchTerm([]);
    setSearchResults([]);
    
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // ha az input mező üres, üres listát állítunk be, máskülönben a találati listát
    if (!term) {
      setSearchResults([]);
    } else {
      const results = props.products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div className='search-container'>
      
      <input type="text" id="input-searchbar"
      value={searchTerm}
      placeholder='Termék keresése'
      onChange={handleSearch}
      />
      {/* ha van találat a beírt szóra,betűre, akkor a találati listát jeleníti meg, máskülöben üresen hagyja */}
      {searchResults.length > 0 && (
        <div className='results'>
          {searchResults.map((product) => (
            <p key={product.id}>
              <span>{product.name} {product.price} Ft
              <AiOutlineShoppingCart className='searchincart'
               onClick={() => addProductToCart(product)}>Kosárba</AiOutlineShoppingCart>
               </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}