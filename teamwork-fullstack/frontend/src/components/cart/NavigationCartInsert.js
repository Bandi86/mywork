import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { HiShoppingCart } from "react-icons/hi";
import { Button } from "flowbite-react";
import { fetchProductSingleImage } from "../../repositories/refreshCrud";
import { readEntry } from "../../repositories/crud";
import { productsImageEndpoint } from "../../repositories/apiEndPoints";
import { removeFromCart } from "../../services/cart";
import { userContext } from "../../contexts/userContext";
import ProductBox from "../favorites/ProductBox";

export default function NavigationCartInsert({
  cartItems,
  setCartItems,
  user,
}) {
  const [isHovered, setIsHovered] = useState(-1);
  const [images, setImages] = useState([]);
  const { updateCart, setUpdateCart, isLoggedIn } = useContext(userContext);

  const productId = cartItems.map((item) => item.id);

  useEffect(() => {
    fetchProductSingleImage(
      readEntry,
      productsImageEndpoint,
      productId,
      setImages
    );
  }, [cartItems, isLoggedIn, user]);

  return (
    <div className="flex flex-col w-[15rem] items-center gap-4">
    <h2 className="border-b-2 mt-2">Last 5 Items</h2>
    {cartItems.map((product, index) => (
      <ProductBox
        key={index}
        product={product}
        imageSrc={images[product.id]}
        updateCart={updateCart}
        setUpdateCart={setUpdateCart}
      />
    ))}
    <div>
      <Link to="/cart" className="flex items-center justify-center">
        <button className="px-4 py-2 flex items-center space-x-2 bg-second cursor-pointer hover:bg-red-600 hover:text-black text-black font-semibold rounded">
          <HiShoppingCart className="h-5 w-5" />
          <p>Go To Cart</p>
        </button>
      </Link>
    </div>
  </div>
  ) 



}
