import React from "react";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sale } from './SaleData';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { v4 as uuidv4 } from 'uuid';

export default function BootstrapCarouselComponent () {

  const {cart, setCart} = useContext(CartContext)

  function addToCart(product) {
    setCart([...cart, product]);    
  }

 return(    
      <div>
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12">
              <h3 className="text-center">Jelenlegi Akcióink</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Carousel>
                {sale.map(product => (
                  <Carousel.Item key={uuidv4()}>
                    <img
                      className="d-block mx-auto mb-3"
                      src={product.image}
                      alt={product.name}
                      style={{ height: '20em', width: '30em' }}
                    />
                    <div className="c-container">
                      <h3 className="h3-c">{product.name}</h3>
                      <p className="p-c-d">{product.desc}</p>
                      <p className="p-c-p">{product.price} Ft</p>
                      <button onClick={() => addToCart(product)} className="buy">Kosárba</button>
                      </div>
                    <Carousel.Caption className="text-center">
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  }




