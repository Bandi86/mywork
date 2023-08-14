import React, { useEffect, useState, useContext } from "react";
import { readEntry } from "../../repositories/crud";
import { nanoid } from "nanoid";
import { productsImageEndpoint } from "../../repositories/apiEndPoints";
import { fetchProductSingleImage } from "../../repositories/refreshCrud";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  emptyCart,
} from "../../services/cart";
import { userContext } from "../../contexts/userContext";
import OrderModal from "../orders/OrderModal";
import { toast } from "react-toastify";

export default function UserCart() {
  const [images, setImages] = useState({});
  const { cartItems, quantityMap, updateCart, setUpdateCart, isLoggedIn, user } =
    useContext(userContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const productId = cartItems.map((item) => item.id);
      fetchProductSingleImage(
        readEntry,
        productsImageEndpoint,
        productId,
        setImages
      )
    } catch (error) {
      console.log(error);
    }
  }, [cartItems, user, isLoggedIn]);

  function handleMinus(productId) {
    setUpdateCart(decreaseCart(productId, 1, updateCart, toast, isLoggedIn));
  }
  function handlePlus(productId) {
    setUpdateCart(addToCart(productId, 1, updateCart, toast, isLoggedIn));
  }

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          {cartItems.length > 0 ? (
            <>
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">
                    {quantityMap} Items
                  </h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Total
                  </h3>
                </div>
                {cartItems.map((product) => (
                  <div
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    key={nanoid()}
                  >
                    <div className="flex w-2/5 items-center">
                      <div className="w-20 mr-4">
                        {images[product.id] ? (
                          <Link to={`/products/${product.id}`}>
                            <img
                              className="h-24"
                              src={images[product.id]}
                              alt={product.name}
                            />
                          </Link>
                        ) : (
                          <h1>No Image</h1>
                        )}
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <span className="font-bold text-sm">
                          Product Name: {product.name}
                        </span>
                        <a
                          href="#"
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          <button
                            onClick={() =>
                              setUpdateCart(
                                removeFromCart(product.id, updateCart, toast, isLoggedIn)
                              )
                            }
                          >
                            Remove
                          </button>
                        </a>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          type="button"
                          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                          onClick={() => handleMinus(product.id)}
                        >
                          &minus;
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          type="button"
                          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                          onClick={() => handlePlus(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {product.price} €
                    </span>
                    <span className="text-center w-1/5 font-semibold text-second text-sm">
                      {(product.price * (product.quantity || 1)).toFixed(2)} €
                    </span>
                  </div>
                ))}
                <div className="flex flex-row justify-between items-center gap-10 mt-10">
                  <a
                    href="/products"
                    className="flex font-semibold text-first text-sm"
                  >
                    <svg
                      className="fill-current mr-2 text-first w-4 mb-10"
                      viewBox="0 0 448 512"
                    ></svg>
                    Continue Shopping
                  </a>
                  <div>
                    <button
                      className="Button uppercase"
                      onClick={() => {
                        setUpdateCart(emptyCart(updateCart, toast, isLoggedIn));
                      }}
                    >
                      Empty Cart
                    </button>
                  </div>
                </div>
              </div>
              <div id="summary" className="w-1/4 px-8 py-10">
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span className="text-second">{cartItems.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )} € </span>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <button
                      className="Button uppercase"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Go to Order
                    </button>

                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col mx-auto items-center gap-10 mt-6 mb-6">
              <h2 className="text-xl font bold text-first">No items in cart</h2>
              <Link to="/products">
                <button className="Button">Back To Products</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        {showModal && (
          <OrderModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </div>
    </>
  );
}
