import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../../contexts/userContext";
import {
  productsEndpoint,
  productsImageEndpoint,
} from "../../repositories/apiEndPoints";
import { readEntry } from "../../repositories/crud";
import {
  fetchProductImages,
  fetchSingleProduct,
} from "../../repositories/refreshCrud";
import { addToCart } from "../../services/cart";
import {
  decreaseQuantity,
  getQuantity,
  increaseQuantity,
  setQuantity,
} from "../../services/quantity";
import { addtoFavorites } from "../../services/favorites";
import { toast } from "react-toastify";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState({
    name: "",
    description: "",
    price: "",
    reviews: "",
    comments: "",
  });
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const {
    isLoggedIn,
    user,
    updateCart,
    setUpdateCart,
    updateFavorites,
    setUpdateFavorites,
    // anonymCart, setAnonymCart
  } = useContext(userContext);
  const [quantityMap, setQuantityMap] = useState({});

  const { id } = useParams();

  const productId = id;

  function handleAddToCart() {
    // if (!isLoggedIn) {
    //   readEntry(`${productsEndpoint}/${productId}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.resdata) {
    //         console.log("cart", data.resdata)
    //         setAnonymCart([...anonymCart, data.resdata[0]])
    //       }
    //     })
    //     .then((res) => {
    //       console.log(anonymCart)
    //     })
    // }
    // else {
    setUpdateCart(
      addToCart(id, getQuantity(id, quantityMap), updateCart, toast, isLoggedIn)
    );

    // }
    // toast.success("Added to cart", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }

  useEffect(() => {
    try {
      fetchProductImages(
        readEntry,
        productsImageEndpoint,
        productId,
        setImages
      );
    } catch (error) {
      console.log(error);
    }
  }, [readEntry, productId]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    fetchSingleProduct(readEntry, productsEndpoint, setSingleProduct, id);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Bal oldali kép */}
      <div className="w-full md:w-1/3 p-4 md:p-10">
        <img
          src={selectedImage}
          alt=""
          className="w-full h-[25rem] mb-4 border-2 border-slate-200 p-2 animate-fade"
        />
        {images.length > 0 ? (
          <div className="flex flex-row md:flex-col gap-2">
            {images.map((image, index) => (
              <div
                key={nanoid()}
                className={`flex flex-col w-full md:w-[12.3rem] h-[12rem] items-center justify-center border-4 p-2 ${
                  selectedImage === image
                    ? "border-accent shadow-lg"
                    : "border-slate-200"
                }`}
                onMouseEnter={() => setSelectedImage(image)}
                onMouseLeave={() => setSelectedImage(images[0])}
              >
                <img
                  src={image}
                  alt={singleProduct.name}
                  className="w-[10rem] h-[10rem]"
                />
              </div>
            ))}
          </div>
        ) : (
          <h2>No image for this Product</h2>
        )}
      </div>

      {/* Nagy div a többi elemmel */}
      <div className="md:w-2/3 p-4 md:p-10">
        {singleProduct?.name ? (
          <div className="flex flex-col justify-center items-center gap-4 border-2 border-slate-200 p-4">
            <h2 className="mt-4 mb-6 text-2xl font-bold">
              {singleProduct.name}
            </h2>
            <div className="mt-4 w-[20rem]">
              <p className="mt-2 break-words text-center text-sm md:text-base">
                {singleProduct.description}
              </p>
            </div>
            <h2 className="mt-4">Product Price: {singleProduct.price} €</h2>
            <div className="mt-2 p-2 flex flex-row justify-between gap-20">
              <AiOutlineShoppingCart
                className="text-5xl p-[0.4rem] bg-slate-600 text-white hover:scale-110 hover:bg-second"
                onClick={() => handleAddToCart()}
              />
              <div className="flex items-center border border-gray-200 rounded">
                <button
                  type="button"
                  className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                  onClick={() => decreaseQuantity(id, setQuantityMap)}
                >
                  &minus;
                </button>
                <input
                  type="number"
                  id="Quantity"
                  value={getQuantity(id, quantityMap)}
                  className="h-10 w-16 border-transparent font-bold focus:border-second text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) =>
                    setQuantity(id, parseInt(e.target.value), setQuantityMap)
                  }
                />
                <button
                  type="button"
                  className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                  onClick={() => increaseQuantity(id, setQuantityMap)}
                >
                  +
                </button>
              </div>
              {user.localId ? (
                <BsFillHeartFill
                  className="text-5xl p-[0.6rem] bg-slate-600 text-white hover:scale-110 hover:bg-second"
                  onClick={() =>
                    setUpdateFavorites(
                      addtoFavorites(id, updateFavorites, toast, isLoggedIn)
                    )
                  }
                />
              ) : null}
            </div>
            <div className="flex flex-col mt-4 gap-4 justify-center items-center">
              <h2 className="text-xl font-semibold flashing-text text-second">
                Product is Available for you right now
              </h2>
              <h2 className="text-lg flashing-text text-second mb-10">
                Free Shipping in this Week
              </h2>
            </div>
          </div>
        ) : (
          <h2>No product found</h2>
        )}
      </div>
    </div>
  );
}
