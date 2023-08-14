import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../../repositories/refreshCrud";
import { addToCart } from "../../services/cart";
import { fetchProductsInGrid } from "../../services/image";
import {
  decreaseQuantity,
  getQuantity,
  increaseQuantity,
  setQuantity,
} from "../../services/quantity";
import ProductPictureRender from "./ProductPictureRender";
import { addtoFavorites } from "../../services/favorites";
import { toast } from "react-toastify";
import { searchContext } from "../../contexts/searchContext";
import { readEntry } from "../../repositories/crud";
import {
  productsCount,
  productsEndpoint,
} from "../../repositories/apiEndPoints";

export default function ProductsGrid() {
  const { categoryid } = useParams();
  const { searchTerm, setSearchTerm } = useContext(searchContext);
  const {
    isLoggedIn,
    updateCart,
    user,
    setUpdateCart,
    updateFavorites,
    setUpdateFavorites,
  } = useContext(userContext);
  const [quantityMap, setQuantityMap] = useState({});
  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const limit = 4;
  const initialLoadLimit = 4;

  useEffect(() => {
    setFilteredProducts([]);
    if (categoryid == undefined) {
      setSearchTerm((prev) => ({ ...prev, show: true }));
    } else {
      setSearchTerm((prev) => ({ ...prev, show: false }));
    }
  }, [categoryid]);

  useEffect(() => {
    const fetchProductsForCurrentPage = async (params) => {
      try {
        const { filter, order, reverse, limit, offset } = params;
        const url = `${productsEndpoint}/${filter}/${order}/${reverse}/${limit}/${offset}`;
        const res = await readEntry(url);
        const data = await res.json();
        setFilteredProducts(data.resdata);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    setPage(0);
    if (categoryid == undefined && searchTerm.text == "")
      fetchProducts(initialLoadLimit, 0, setFilteredProducts);
    else if (categoryid == undefined && searchTerm.text != "") {
      readEntry(productsCount).then((res) => {
        res
          .json()
          .then((data) => {
            const value = Object.values(data.resdata);
            const valueFromIndex = value;
            const numberValue = parseInt(valueFromIndex, 10);
            return numberValue;
          })
          .then((numberValue) =>
            fetchProductsForCurrentPage({
              filter: searchTerm.text,
              order: "name",
              reverse: "false",
              limit: numberValue,
              offset: 0,
            })
          );
      });
    } else {
      setSearchTerm((prev) => ({ ...prev, show: false }));
      fetchProductsByCategory(
        initialLoadLimit,
        0,
        setFilteredProducts,
        categoryid
      );
    }
  }, [categoryid, searchTerm.text]);

  useEffect(() => {
    if (searchTerm.text.length == 0) {
      function handleScroll() {
        const isBottom =
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight;
        if (isBottom) {
          if (categoryid == undefined) {
            fetchProductsInGrid(limit, page + 1, (newProducts) => {
              // Append new products to the filteredProducts state
              setFilteredProducts((prevFilteredProducts) => [
                ...prevFilteredProducts,
                ...newProducts,
              ]);
              setPage((prevPage) => prevPage + 1);
            });
          } else {
            fetchProductsInGrid(
              limit,
              page + 1,
              (newProducts) => {
                // Append new products to the filteredProducts state
                setFilteredProducts((prevFilteredProducts) => [
                  ...prevFilteredProducts,
                  ...newProducts,
                ]);
                setPage((prevPage) => prevPage + 1);
              },
              categoryid
            );
          }
        }
      }
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page, categoryid, searchTerm]);

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

  return (
    <>
      <div className="mb-10 ml-[15rem] mr-[15rem] mt-10 grid grid-cols-4 gap-8 justify-center">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product, index) => (
            <div
              className="items-center justify-center w-80 max-w-xs p-4 border bg-white shadow-md"
              key={index}
            >
              <Link to={`/products/${product.id}`}>
                <ProductPictureRender
                  product={product}
                  onLoad={() => setIsLoading(true)}
                />
              </Link>
              {!isLoading && (
                <>
                  <div className="mt-2 p-2 flex flex-row justify-between">
                    <AiOutlineShoppingCart
                      className="text-5xl p-[0.4rem] bg-slate-600 text-white hover:scale-110 hover:bg-second"
                      onClick={() => handleAddToCart(product.id)}
                    />
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        type="button"
                        className="w-10 h-10 leading-10 font-bold text-gray-600 transition hover:opacity-75"
                        onClick={() =>
                          decreaseQuantity(product.id, setQuantityMap)
                        }
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
                        onClick={() =>
                          increaseQuantity(product.id, setQuantityMap)
                        }
                      >
                        +
                      </button>
                    </div>
                    {user.localId ? (
                      <BsFillHeartFill
                        className="text-5xl p-[0.6rem] bg-slate-600 text-white hover:scale-110 hover:bg-second"
                        onClick={() =>
                          setUpdateFavorites(
                            addtoFavorites(
                              product.id,
                              updateFavorites,
                              toast,
                              isLoggedIn
                            )
                          )
                        }
                      />
                    ) : null}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to={`/products/${product.id}`}>
                      <div className="font-bold text-2xl mb-2">
                        {product.name}
                      </div>
                    </Link>
                    <div className="font-bold text-left text-2xl text-second">
                      {product.price} €
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
