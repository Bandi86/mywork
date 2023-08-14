import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import { addToCart } from "../../services/cart";
import { emptyFavorites, removeFavorites } from "../../services/favorites";
import ProductPictureRender from "../products/ProductPictureRender";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  getQuantity,
  setQuantity,
  decreaseQuantity,
  increaseQuantity,
} from "../../services/quantity";
import { readEntry } from "../../repositories/crud";
import { productsEndpoint } from "../../repositories/apiEndPoints";

export default function Favorites() {
  const {
    isLoggedIn,
    favorites,
    updateFavorites,
    setUpdateFavorites,
    updateCart,
    setUpdateCart,
    favoritesQuantity,
  } = useContext(userContext);

  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [productId, setProductId] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});

  const favoritesLength = favorites?.length || 0;

  useEffect(() => {
    try {
      setProductId(favorites.map((item) => item.id));
    } catch (error) { }
  }, []);

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
  }

  function handleRemoveFromFavorites(productId) {
    setUpdateFavorites(
      removeFavorites(productId, updateFavorites, toast, isLoggedIn)
    );
  }

  return (
    <>
      <h2 className="text-center mt-2 py-2 font-bold">
        You have{" "}
        <span className="text-3xl text-second leading-7">
          {favoritesLength}
        </span>{" "}
        favorite items
      </h2>

      {favoritesLength !== 0 && (
        <div className="flex justify-center items-center py-10">
          <button
            className="Button uppercase"
            onClick={() => {
              setUpdateFavorites(
                emptyFavorites(updateFavorites, toast, isLoggedIn)
              );
            }}
          >
            Empty favorites
          </button>
        </div>
      )}
      <div className="min-h-min grid grid-cols-4 p-2 ml-6 gap-6">
        {Array.isArray(favorites) &&
          favorites.map((item, index) => (
            <div
              key={index}
              className="group my-10 flex w-[20rem] max-w-xs flex-col relative overflow-hidden border cursor-pointer border-gray-300 bg-white shadow-md hover:scale-105"
            >
              <div className="h-80 relative mt-6 mr-1 ml-1 overflow-hidden">
                <Link to={`/products/${item.id}`}>
                  <ProductPictureRender product={item} />
                </Link>
                <div className="absolute bottom-[12rem] right-0 mb-4 mr-4 ">
                  <button
                    className="w-6 h-6 flex items-center justify-center text-red-600 bg-white rounded-full border border-gray-300 hover:bg-red-600 hover:text-white transition"
                    onClick={() => handleRemoveFromFavorites(item.id)}
                  >
                    X
                  </button>
                </div>

                <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                  {images?.map((_, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`h-3 w-3 rounded-full border-2 border-white ${imgIndex === currentImageIndex
                          ? "bg-white"
                          : "bg-transparent"
                        }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2 flex flex-col">
                {/* <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <span className="text-xl font-semibold text-second">{item.price} €</span> */}
              </div>
              <div className="">
                <div className="mt-2 p-2 flex flex-row justify-evenly">
                  <AiOutlineShoppingCart
                    className="text-5xl p-[0.4rem] bg-slate-600 text-white cursor-pointer hover:scale-110 hover:bg-second"
                    onClick={() => handleAddToCart(item.id)}
                  />
                  <div className="flex items-center border border-gray-200 rounded">
                    <button
                      type="button"
                      className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                      onClick={() => decreaseQuantity(item.id, setQuantityMap)}
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      id="Quantity"
                      value={getQuantity(item.id, quantityMap)}
                      className="h-10 w-16 border-transparent font-bold focus:border-second text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={(e) =>
                        setQuantity(
                          item.id,
                          parseInt(e.target.value),
                          setQuantityMap
                        )
                      }
                    />
                    <button
                      type="button"
                      className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                      onClick={() => increaseQuantity(item.id, setQuantityMap)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link to={`/products/${item.id}`}>
                    <div className="font-bold text-2xl mb-2">{item.name}</div>
                  </Link>

                  <div className="font-bold p-4 text-left text-2xl text-second">
                    {item.price} €
                  </div>
                </div>
              </div>
            </div>

          ))}
        {/* <button className="Button" onClick={updateFavorites(emptyFavorites)}>
      Delete all Favorites
    </button> */}
      </div>
    </>
  );
}
