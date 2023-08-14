import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import { fetchProducts } from "../../repositories/refreshCrud";
import { addToCart } from "../../services/cart";
import { addtoFavorites } from "../../services/favorites";
import {
  decreaseQuantity,
  getQuantity,
  increaseQuantity,
  setQuantity,
} from "../../services/quantity";
import ProductPictureRender from "../products/ProductPictureRender";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeProductRender() {
  const [products, setProducts] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    isLoggedIn,
    user,
    updateCart,
    setUpdateCart,
    updateFavorites,
    setUpdateFavorites,
  } = useContext(userContext);

  const [count, setCount] = useState(0);
  const endValue = 8;

  useEffect(() => {
    let interval;
    if (count < endValue) {
      interval = setInterval(() => {
        setCount((prevCount) => Math.min(prevCount + 1, endValue));
      }, 1000 / endValue); // Adjust the duration based on the endValue
    }

    return () => clearInterval(interval);
  }, [endValue]);

  useEffect(() => {
    fetchProducts(8, 0, setProducts);
  }, [user]);

  function handleAddToCart(productId) {
    setUpdateCart(
      addToCart(
        productId,
        getQuantity(productId, quantityMap),
        updateCart,
        toast,
        isLoggedIn
      )
    );
    // toast.success("Added to cart", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }

  function handleAddToFavorites(productId) {
    setUpdateFavorites(
      addtoFavorites(productId, updateFavorites, toast, isLoggedIn)
    );
  }

  return (
    <>
      <h2 className="text-left mb-10 ml-[15rem] mr-[15rem] mt-[9rem] text-3xl font-bold">
        Featured{" "}
        <span className="text-4xl font-bold text-second ml-2 mr-2">
          {count.toLocaleString()}
        </span>
        Products
      </h2>

      <div className="mb-10 ml-[15rem] mr-[15rem] grid grid-cols-4 gap-8 justify-center">
        {products.length > 0 &&
          products.map((product, index) => (
            <div
              key={index}
              className="items-center justify-center w-80 max-w-xs p-4 border bg-white shadow-md"
            >
              <Link to={`/products/${product.id}`}>
                <ProductPictureRender
                  product={product}
                  onLoad={() => setIsLoading(true)}
                />
              </Link>

              <div className="mt-2 p-2 flex flex-row justify-between">
                <AiOutlineShoppingCart
                  className="text-5xl p-[0.4rem] bg-slate-600 text-white cursor-pointer hover:scale-110 hover:bg-second"
                  onClick={() => handleAddToCart(product.id)}
                />
                <div className="flex items-center border border-gray-200 rounded">
                  <button
                    type="button"
                    className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                    onClick={() => decreaseQuantity(product.id, setQuantityMap)}
                  >
                    &minus;
                  </button>
                  <input
                    type="number"
                    id="Quantity"
                    value={getQuantity(product.id, quantityMap)}
                    className="h-10 w-16 border-transparent font-bold focus:border-second text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    onChange={(e) =>
                      setQuantity(
                        product.id,
                        parseInt(e.target.value),
                        setQuantityMap
                      )
                    }
                  />
                  <button
                    type="button"
                    className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                    onClick={() => increaseQuantity(product.id, setQuantityMap)}
                  >
                    +
                  </button>
                </div>
                {user.localId ? (
                  <BsFillHeartFill
                    className="text-5xl p-[0.4rem] bg-slate-600 text-white cursor-pointer hover:scale-110 hover:bg-second"
                    onClick={() => handleAddToFavorites(product.id)}
                  />
                ) : null}
              </div>
              <div className="mt-4 text-center">
                <Link to={`/products/${product.id}`}>
                  <div className="font-bold text-2xl mb-2">{product.name}</div>
                </Link>

                <p className="text-gray-700 text-base mb-2">{product.rating}</p>
                <div className="font-bold text-left text-2xl text-second">
                  {product.price} €
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
