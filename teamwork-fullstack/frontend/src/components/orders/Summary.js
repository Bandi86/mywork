import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import {
  ordersEndpoint,
  productsImageEndpoint,
} from "../../repositories/apiEndPoints";
import { createEntry, readEntry } from "../../repositories/crud";
import { fetchProductSingleImage } from "../../repositories/refreshCrud";
import { removeFromCart } from "../../services/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Summary = ({
  setShowModal,
  showSummary,
  setShowSummary,
  setShowOrderForm,
  orderFormData,
}) => {
  const {
    cartItems,
    quantityMap,
    updateCart,
    setUpdateCart,
    profileData,
    user,
    isLoggedIn,
  } = useContext(userContext);

  const [images, setImages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [summaryData, setSummaryData] = useState({});

  const navigate = useNavigate();

  function mergeSummary() {
    let product_ids = "";
    let quantity = "";

    cartItems.forEach((item) => {
      product_ids = product_ids.concat(`${item.product_id}, `);
      quantity = quantity.concat(`${item.quantity}, `);
    });

    setSummaryData({
      billing: orderFormData.billing,
      shipping: orderFormData.shipping,
      contact: {
        email: orderFormData.contactEmail,
        phone: orderFormData.contactPhone,
      },
      products: product_ids,
      quantity: quantity,
      total: cartItems.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
    });
  }

  useEffect(() => {
    if (cartItems.length == 0) {
      toast.warning("Your has been emptied", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
    }
  }, [cartItems]);

  useEffect(() => {
    const productId = cartItems.map((item) => item.id);
    fetchProductSingleImage(
      readEntry,
      productsImageEndpoint,
      productId,
      setImages
    );
    mergeSummary();
  }, [cartItems, user, isLoggedIn]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      createEntry(summaryData, ordersEndpoint).then((res) => {
        if (res.ok) {
          toast.success("Order has been submitted successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setUpdateCart(!updateCart);
          setSubmitMessage("Order has been submitted successfully");
          setIsSubmitting(false);
          setShowModal(false);
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error("Failed to submit order", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Failed to submit order");
        }
      });
    } catch (error) {
      setSubmitMessage("Failed to submit order");
    }
  }

  return (
    <div className="max-w-fit mt-4 px-4">
      <h1 className="text-center mb-4">
        Thank you for your purchase:{" "}
        <span className="font-bold">{profileData[0].userName}</span>
      </h1>
      <div className="shadow-md my-10 p-4 w-full">
        {cartItems.length > 0 ? (
          <>
            <div className="border-b pb-4">
              <h2 className="font-semibold text-2xl">
                You are Buying: {quantityMap}{" "}
                {quantityMap > 1 ? "Items" : "Item"}
              </h2>
            </div>
            <div className="mt-5 mb-3 grid grid-cols-1 gap-4 sm:grid-cols-6">
              <h3 className="font-semibold text-gray-600 text-xs sm:text-sm">
                Product Details
              </h3>
              <h3 className="font-semibold text-gray-600 text-center text-xs sm:text-sm">
                Quantity
              </h3>
              <h3 className="font-semibold text-gray-600 text-center text-xs sm:text-sm">
                Price
              </h3>
              <h3 className="font-semibold text-gray-600 text-center text-xs sm:text-sm">
                Total
              </h3>
            </div>
            {cartItems.map((product) => (
              <div
                className="grid grid-cols-2 gap-4 sm:grid-cols-6 items-center hover:bg-gray-100 py-3 sm:px-4"
                key={nanoid()}
              >
                <div className="flex items-center col-span-2 sm:col-span-1">
                  <div className="w-20 mr-4">
                    {images[product.id] ? (
                      <Link to={`/products/${product.id}`}>
                        <img
                          className="object-cover w-full h-full"
                          src={images[product.id]}
                          alt=""
                        />
                      </Link>
                    ) : (
                      <h1>No Image</h1>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-2 flex-grow">
                    <span className="font-bold text-sm">{product.name}</span>
                    <a className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                      <button
                        onClick={() =>
                          setUpdateCart(
                            removeFromCart(
                              product.id,
                              updateCart,
                              toast,
                              isLoggedIn
                            )
                          )
                        }
                      >
                        Remove
                      </button>
                    </a>
                  </div>
                </div>
                <div className="text-center col-span-1 sm:col-span-1">
                  <span>{product.quantity}</span>
                </div>
                <span className="text-center col-span-1 sm:col-span-1 font-semibold text-sm">
                  {product.price} €
                </span>
                <span className="text-center col-span-1 sm:col-span-1 font-semibold text-second text-sm">
                  {(product.price * (product.quantity || 1)).toFixed(2)} €
                </span>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <h2 className="text-center font-bold text-xl">
        Total Cost:
        <span className="text-second">
          {" "}
          {cartItems.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          )}{" "}
          €{" "}
        </span>
      </h2>
      <div className="flex flex-col md:flex-row md:items-center justify-center mt-6">
        {showSummary ? (
          <button
            className="text-red-500 font-bold uppercase mb-2 md:mb-0 md:mr-4 px-4 py-2 text-sm rounded focus:outline-none"
            onClick={() => {
              setShowOrderForm(true);
              setShowSummary(false);
            }}
          >
            Back to change Order Details
          </button>
        ) : (
          <button
            className="text-red-500 font-bold uppercase mb-2 md:mb-0 md:mr-4 px-4 py-2 text-sm rounded focus:outline-none"
            onClick={() => setShowModal(false)}
            type="submit"
            disabled={isSubmitting}
          >
            Close
          </button>
        )}
        <button
          className="bg-emerald-500 text-white font-bold uppercase px-4 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Order Now"}
        </button>
      </div>
      {submitMessage && (
        <p
          className={
            submitMessage === "Order is submitted successfully"
              ? "text-green-500 text-center mt-2"
              : "text-red-500 text-center mt-2"
          }
        >
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default Summary;
