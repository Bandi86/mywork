import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { fetchProductSingleImage } from "../../repositories/refreshCrud";
import { readEntry } from "../../repositories/crud";
import { productsImageEndpoint } from "../../repositories/apiEndPoints";
import { userContext } from "../../contexts/userContext";
import ProductBox from "./ProductBox";

const NavigationFavoritesInsert = ({ littleFavorites }) => {
  const { updateFavorites, setUpdateFavorites } = useContext(userContext);
  const [isHovered, setIsHovered] = useState(-1);
  const [images, setImages] = useState([]);
  const productId = littleFavorites?.map((item) => item.product_id);  

  useEffect(() => {
    try {
      fetchProductSingleImage(
        readEntry,
        productsImageEndpoint,
        productId,
        setImages
      );
    } catch (error) {}
  }, [littleFavorites]);

  return (
    <div className="flex flex-col w-[15rem] items-center gap-4">
      <h2 className="border-b-2 mt-2">Last 5 Items</h2>
      {littleFavorites.map((product, index) => (
        <ProductBox
          key={index}
          product={product}
          imageSrc={images[product.id]}
          updateFavorites={updateFavorites}
          setUpdateFavorites={setUpdateFavorites}
          isFavorites={true}
        />
      ))}
      <div>
        <Link to="/favorites" className="flex items-center justify-center">
          <button className="px-4 py-2 flex items-center space-x-2 bg-second cursor-pointer hover:bg-red-600 hover:text-black text-black font-semibold rounded">
            <AiFillHeart className="h-5 w-5" />
            <p>Go Favorites</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationFavoritesInsert;
