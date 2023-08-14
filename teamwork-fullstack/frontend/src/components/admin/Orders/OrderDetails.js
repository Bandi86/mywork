import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineProfile } from "react-icons/ai";
import { BiSolidCity } from "react-icons/bi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaRoad } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GiCheckMark, GiSandsOfTime } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import { MdClose, MdLocalShipping, MdOutlineMoreTime } from "react-icons/md";
import { PiDoorFill, PiStairs } from "react-icons/pi";
import { userContext } from "../../../contexts/userContext";
import {
  ordersEndpoint,
  productsEndpoint,
  productsImageEndpoint,
} from "../../../repositories/apiEndPoints";
import { readEntry } from "../../../repositories/crud";
import { fetchProductSingleImage } from "../../../repositories/refreshCrud";
import convertDate from "../../../services//timestamp";

export default function OrderDetails({
  orderID,
  showOrderDetails,
  setShowOrderDetails,
}) {
  const [order, setOrder] = useState([]);
  const [productIds, setProductIds] = useState([]);

  // stores like this: [{productid: quantity}]
  const [products, setProducts] = useState([]);
  const [billingData, setBillingData] = useState({});
  const [shippingData, setShippingData] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [checked, setChecked] = useState(true);
  const { user } = useContext(userContext);

  let productId = productIds.map((element) => element);

  function handleSwitcher() {
    if (checked == true) {
      setShowOrderDetails(false);
    }
    setChecked(!checked);
  }

  useEffect(() => {
    try {
      fetchProductSingleImage(
        readEntry,
        productsImageEndpoint,
        productId,
        setImages
      );
    } catch (err) {}
  }, [products, showOrderDetails]);

  useEffect(() => {
    readEntry(`${ordersEndpoint}/${orderID}`).then((res) => {
      res.json().then((data) => {
        setOrder(data.resdata);
        try {
          const fetchedBillingData = data.resdata[0].billing.split(", ");
          const updatedBillingData = {
            billingName: fetchedBillingData[0],
            billingPostcode: fetchedBillingData[1],
            billingCity: fetchedBillingData[2],
            billingStreet: fetchedBillingData[3],
            billingHouseNumber: fetchedBillingData[4],
            billingFloor: fetchedBillingData[5],
            billingDoor: fetchedBillingData[6],
          };
          setBillingData((prevBillingData) =>
            Object.assign({}, prevBillingData, updatedBillingData)
          );

          const fetchedShippingData = data.resdata[0].shipping.split(", ");
          const updatedShippingData = {
            shippingName: fetchedShippingData[0],
            shippingPostcode: fetchedShippingData[1],
            shippingCity: fetchedShippingData[2],
            shippingStreet: fetchedShippingData[3],
            shippingHouseNumber: fetchedShippingData[4],
            shippingFloor: fetchedShippingData[5],
            shippingDoor: fetchedShippingData[6],
          };
          setShippingData((prevShippingData) =>
            Object.assign({}, prevShippingData, updatedShippingData)
          );
        } catch (err) {}

        try {
          const productsSplit = data.resdata[0].product_ids.split(", ");
          const quantitySplit = data.resdata[0].quantity.split(", ");
          const productsSlice = productsSplit.slice(0, -1);
          const quantitySlice = quantitySplit.slice(0, -1);

          let array = [];
          let idsArray = [];
          productsSlice.forEach((element, idx) => {
            array.push({ [element]: quantitySlice[idx] });
            idsArray.push(element);
          });
          setProducts(array);
          setProductIds(idsArray);
        } catch (err) {}
      });
    });
  }, [orderID, showOrderDetails]);

  useEffect(() => {
    if (products.length > 0) {
      const fetchPromises = products.map((element) => {
        return readEntry(`${productsEndpoint}/${Object.keys(element)}`).then(
          (res) => res.json()
        );
      });

      Promise.all(fetchPromises)
        .then((results) => {
          const newData = results.map((data) => data.resdata[0]);
          setProductDetails(newData);
        })
        .catch((error) => {
          console.error("faild to fetch", error);
        });
    }
  }, [products]);

  return (
    <div
      className={`container mx-auto ${showOrderDetails ? "block" : "hidden"}`}
    >
      {user.role == "admin" ? (
        <div className="p-2 mb-4">
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchChecked"
            checked={checked}
            onChange={handleSwitcher}
          />

          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="flexSwitchChecked"
          >
            {checked ? (
              <span className="p-2 mt-2">Show Order Details</span>
            ) : (
              <span className="p-2 mt-2">Show Recent</span>
            )}
          </label>
        </div>
      ) : null}

      {showOrderDetails && order[0] ? (
        <div className="flex flex-col">
          <h3 className="text-center text-2xl mb-4">
            <span className="font-bold">Order ID:</span>{" "}
            <span className="italic">{orderID}</span>
          </h3>
          <div className="flex flex-wrap gap-4 bg-slate-100 p-4 items-center md:flex-row md:justify-evenly mb-8">
            <div className="flex flex-col gap-4">
              {order[0].status === "processing" && (
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <GiSandsOfTime className="text-yellow-600" />
                  </span>
                  <span className="text-yellow-600 font-bold">Processing</span>
                </div>
              )}

              {order[0].status === "deleted" && (
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <MdClose className="text-red-600" />
                  </span>
                  <span className="text-red-600 font-bold">Deleted</span>
                </div>
              )}

              {order[0].status === "under delivery" && (
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <MdLocalShipping className="text-blue-600" />
                  </span>
                  <span className="text-blue-600 font-bold">
                    Under Delivery
                  </span>
                </div>
              )}

              {order[0].status === "delivered" && (
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <GiCheckMark className="text-green-600" />
                  </span>
                  <span className="text-green-600 font-bold">Delivered</span>
                </div>
              )}

              <div className="flex flex-row gap-4 items-center">
                <span className="text-xl">
                  <MdOutlineMoreTime />
                </span>{" "}
                <span className="font-bold">
                  {convertDate(order[0].created_at)}
                </span>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <span className="text-xl">
                  <LuTimerReset />
                </span>
                <span className="font-bold">
                  {convertDate(order[0].updated_at)}
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <span className="text-xl">
                  <AiOutlineMail />
                </span>
                <span className="font-bold">{order[0].contactEmail}</span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <span className="text-xl">
                  <FiPhoneCall />
                </span>
                <span className="font-bold">{order[0].contactPhone}</span>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <span className="text-xl">
                  <ImPriceTag />
                </span>
                <span className="font-bold text-second">{order[0].total} € </span>
              </div>
            </div>

            {billingData && (
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">Billing Details:</h2>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <AiOutlineProfile />
                  </span>
                  <span className="font-bold">{billingData.billingName}</span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <IoLocationSharp />
                  </span>
                  <span className="font-bold">
                    {billingData.billingPostcode}
                  </span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <BiSolidCity />
                  </span>
                  <span className="font-bold">{billingData.billingCity}</span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <FaRoad />
                  </span>
                  <span className="font-bold">{billingData.billingStreet}</span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <BsFillHouseDoorFill />
                  </span>
                  <span className="font-bold">
                    {billingData.billingHouseNumber}
                  </span>
                  {billingData.billingFloor !== "" ? (
                    <>
                      <span className="text-xl">
                        <PiStairs />
                      </span>
                      <span className="font-bold">
                        {billingData.billingFloor}
                      </span>
                    </>
                  ) : null}

                  {billingData.billingDoor !== "" ? (
                    <>
                      <span className="text-xl">
                        <PiDoorFill />
                      </span>
                      <span className="font-bold">
                        {billingData.billingDoor}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {shippingData && (
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">Shipping Details:</h2>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <AiOutlineProfile />
                  </span>
                  <span className="font-bold">{shippingData.shippingName}</span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <IoLocationSharp />
                  </span>
                  <span className="font-bold">
                    {shippingData.shippingPostcode}
                  </span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <BiSolidCity />
                  </span>
                  <span className="font-bold">{shippingData.shippingCity}</span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <FaRoad />
                  </span>
                  <span className="font-bold">
                    {shippingData.shippingStreet}
                  </span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xl">
                    <BsFillHouseDoorFill />
                  </span>
                  <span className="font-bold">
                    {shippingData.shippingHouseNumber}
                  </span>
                  {shippingData.shippingFloor !== "" ? (
                    <>
                      <span className="text-xl">
                        <PiStairs />
                      </span>
                      <span className="font-bold">
                        {shippingData.shippingFloor}
                      </span>
                    </>
                  ) : null}

                  {shippingData.shippingDoor !== "" ? (
                    <>
                      <span className="text-xl">
                        <PiDoorFill />
                      </span>

                      <span className="font-bold">
                        {shippingData.shippingDoor}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(productDetails) &&
              productDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center pl-6 ml-6 bg-slate-100"
                >
                  <p className="font-semibold mb-4 mt-4">
                    <span className="font-bold">{item.name}</span>
                  </p>
                  {products[index] != null ? (
                    <div>
                      <span className="italic">Quantity:</span>{" "}
                      <span className="font-bold">
                        {Object.values(products[index])}
                      </span>
                    </div>
                  ) : null}

                  {images[item.id] && (
                    <img
                      src={images[item.id]}
                      alt="product"
                      className="h-48 w-48 items-center pr-4 mt-4 md:h-60 md:w-60 object-cover"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
