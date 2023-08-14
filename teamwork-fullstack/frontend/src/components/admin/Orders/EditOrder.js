import { useState, useEffect, useContext } from "react";
import { ordersEndpoint } from "../../../repositories/apiEndPoints";
import submitEdit from "../../../services/submitEdit";
import { readEntry } from "../../../repositories/crud";
import { adminContext } from "../../../contexts/adminContext";
import validateForm from "../../../services/formValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditOrder({ orderId, setShowModal }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [order, setOrder] = useState({});
  const [shippingData, setShippingData] = useState({});
  const [orderFormData, setOrderFormData] = useState({
    status: "",
    shippingName: "",
    shippingPostcode: "",
    shippingCity: "",
    shippingStreet: "",
    shippingHouseNumber: "",
    shippingFloor: "",
    shippingDoor: "",
  });

  const { adminRefresh, setAdminRefresh } = useContext(adminContext);

  useEffect(() => {
    readEntry(`${ordersEndpoint}/${orderId}`).then((res) => {
      res.json().then((data) => {
        setOrder(data.resdata);
        try {
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
      });
    });
  }, [orderId, setShowModal]);

  useEffect(() => {
    try {
      setOrderFormData({
        status: order[0].status,
        shippingName: shippingData.shippingName,
        shippingPostcode: shippingData.shippingPostcode,
        shippingCity: shippingData.shippingCity,
        shippingStreet: shippingData.shippingStreet,
        shippingHouseNumber: shippingData.shippingHouseNumber,
        shippingFloor: shippingData.shippingFloor,
        shippingDoor: shippingData.shippingDoor,
      });
      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to set order formdata:", error);
    }
  }, [order, shippingData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.target);
    formData.append("id", orderId);

    const updatedShipping = `${orderFormData.shippingName}, ${orderFormData.shippingPostcode}, ${orderFormData.shippingCity}, ${orderFormData.shippingStreet}, ${orderFormData.shippingHouseNumber}, ${orderFormData.shippingFloor}, ${orderFormData.shippingDoor}`;

    const isDeleted = orderFormData.status == "deleted" ? true : false;

    // if (!validateForm(updatedShipping)) {
    //   toast.error("Please fill out all required fields", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return;
    // }

    try {
      const response = await submitEdit(
        {
          data: {
            $id: orderId,
            $status: orderFormData.status,
            $shipping: updatedShipping,
            $isDeleted: isDeleted,
          },
          columns:
            "id=$id, status=$status, shipping=$shipping, isDeleted=$isDeleted",
        },
        `${ordersEndpoint}/${orderId}`,
        "Order edited successfully",
        "Order edit failed",
        adminRefresh,
        setAdminRefresh
      );
      if (response) {
        const data = await response.json();
        if (data.success) {
          setSubmitMessage("Order edited successfully!");
        } else {
          setSubmitMessage("Failed to edit order: " + data.error);
        }
      } else {
        setSubmitMessage(
          "Failed to edit order. Server returned null or undefined response."
        );
      }
    } catch (error) {
      setSubmitMessage("An error occurred during the edit request: " + error);
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  }

  const handleBaseChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setOrderFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      {dataLoaded && (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 justify-center items-center gap-2">
            <label className="block text-black text-xl font-bold mb-2">
              Modify Order Status
            </label>
            <select
              name="status"
              value={orderFormData.status}
              onChange={handleBaseChange}
              className="addProductForm"
            >
              <option value="processing">Processing</option>
              <option value="under delivery">Under Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="deleted">Deleted</option>
            </select>
            <div>
              <h4 className="text-xl font-bold text-black mt-10">
                Modify Shipping Details
              </h4>
            </div>
            <label className="text-lg text-black text-center">Name</label>
            <input
              className="addProductForm"
              type="text"
              name="shippingName"
              placeholder="Name"
              autoComplete="on"
              required
              value={orderFormData.shippingName}
              onChange={handleBaseChange}
            />
            <label className="text-lg text-black text-center">PostCode</label>
            <input
              className="addProductForm"
              type="number"
              name="shippingPostcode"
              placeholder="PostCode"
              autoComplete="on"
              required
              value={orderFormData.shippingPostcode}
              onChange={handleBaseChange}
            />

            <label className="text-lg text-black text-center">City</label>
            <input
              className="addProductForm"
              type="text"
              name="shippingCity"
              placeholder="City"
              autoComplete="on"
              required
              value={orderFormData.shippingCity}
              onChange={handleBaseChange}
            />
            <label className="text-lg text-black text-center">Street</label>
            <input
              className="addProductForm"
              type="text"
              name="shippingStreet"
              placeholder="Street"
              autoComplete="on"
              required
              value={orderFormData.shippingStreet}
              onChange={handleBaseChange}
            />
            <label className="text-lg text-black text-center">
              House Number
            </label>
            <input
              className="addProductForm"
              type="number"
              name="shippingHouseNumber"
              placeholder="House Number"
              autoComplete="on"
              required
              value={orderFormData.shippingHouseNumber}
              onChange={handleBaseChange}
            />
            <label className="text-lg text-black text-center">Floor</label>
            <input
              className="addProductForm"
              type="number"
              name="shippingFloor"
              placeholder="Floor"
              autoComplete="on"
              value={orderFormData.shippingFloor}
              onChange={handleBaseChange}
            />
            <label className="text-lg text-black text-center">Door</label>
            <input
              className="addProductForm"
              type="number"
              name="shippingDoor"
              placeholder="Door"
              autoComplete="on"
              value={orderFormData.shippingDoor}
              onChange={handleBaseChange}
            />
          </div>
          <div className="flex items-center justify-end mt-6">
            <button
              className="text-red-500 font-bold uppercase mr-4 px-4 py-2 text-sm rounded focus:outline-none"
              onClick={() => setShowModal(false)}
              type="submit"
              disabled={isSubmitting} // Disable the button during form submission
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white font-bold uppercase px-4 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none"
              disabled={isSubmitting} // Disable the button during form submission
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
          {submitMessage && (
            <p
              className={
                submitMessage === "Order edited successfully"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {submitMessage}
            </p>
          )}
        </form>
      )}
    </>
  );
}
