import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from "../../services/formValidation";

const OrderForm = ({
  setShowModal,

  setShowSummary,

  setOrderFormData,
}) => {
  const { profileData } = useContext(userContext);

  // BILLING DATA THAT IS BEING SENT TO DB (UPLOAD)
  const [billingData, setBillingData] = useState({});

  // SHIPPING DATA THAT IS BEING SENT TO DB (UPLOAD)
  const [shippingData, setShippingData] = useState({});

  const [contact, setContact] = useState({});
  const [company, setCompany] = useState({});

  const [isCompany, setIsCompany] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});

  const [showShipping, setShowShipping] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // const [showContact, setShowContact] = useState(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      // BILLING
      if (profileData[0].billingAddress == null) {
        const updatedBillingData = {
          billingName: "",
          billingPostcode: "",
          billingCity: "",
          billingStreet: "",
          billingHouseNumber: "",
          billingFloor: "",
          billingDoor: "",
        };
        setBillingData((prevBillingData) =>
          Object.assign({}, prevBillingData, updatedBillingData)
        );
      } else {
        const fetchedBillingData = profileData[0].billingAddress.split(", ");
        const updatedBillingData = {
          billingName: profileData[0].billingName,
          billingPostcode: fetchedBillingData[0],
          billingCity: fetchedBillingData[1],
          billingStreet: fetchedBillingData[2],
          billingHouseNumber: fetchedBillingData[3],
          billingFloor: fetchedBillingData[4],
          billingDoor: fetchedBillingData[5],
        };
        setBillingData((prevBillingData) =>
          Object.assign({}, prevBillingData, updatedBillingData)
        );
      }

      // SHIPPING
      if (profileData[0].shippingAddress == null) {
        const updatedShippingData = {
          shippingName: "",
          shippingPostcode: "",
          shippingCity: "",
          shippingStreet: "",
          shippingHouseNumber: "",
          shippingFloor: "",
          shippingDoor: "",
        };
        setShippingData((prevShippingData) =>
          Object.assign({}, prevShippingData, updatedShippingData)
        );
      } else {
        const fetchedShippingData = profileData[0].shippingAddress.split(", ");
        const updatedShippingData = {
          shippingName: profileData[0].shippingName,
          shippingPostcode: fetchedShippingData[0],
          shippingCity: fetchedShippingData[1],
          shippingStreet: fetchedShippingData[2],
          shippingHouseNumber: fetchedShippingData[3],
          shippingFloor: fetchedShippingData[4],
          shippingDoor: fetchedShippingData[5],
        };

        setShippingData((prevShippingData) =>
          Object.assign({}, prevShippingData, updatedShippingData)
        );
      }

      if (profileData[0].company == null) {
        setCompany({
          company: "",
          taxNumber: "",
        });
      } else {
        setCompany({
          company: profileData[0].company,
          taxNumber: profileData[0].taxNumber,
        });
      }
      if (profileData[0].contactEmail == null) {
        setContact({
          email: "",
          phone: "",
        });
      } else {
        setContact({
          email: profileData[0].contactEmail,
          phone: profileData[0].contactPhone,
        });
      }
    } catch (err) {}
  }, [profileData]);

  // SHOW SHIPPING TRIGGER
  useEffect(() => {
    try {
      // SHIPPING
      if (profileData[0].shippingAddress == null) {
        const updatedShippingData = {
          shippingName: "",
          shippingPostcode: "",
          shippingCity: "",
          shippingStreet: "",
          shippingHouseNumber: "",
          shippingFloor: "",
          shippingDoor: "",
        };
        setShippingData((prevShippingData) =>
          Object.assign({}, prevShippingData, updatedShippingData)
        );
      } else {
        const fetchedShippingData = profileData[0].shippingAddress.split(", ");
        const updatedShippingData = {
          shippingName: profileData[0].shippingName,
          shippingPostcode: fetchedShippingData[0],
          shippingCity: fetchedShippingData[1],
          shippingStreet: fetchedShippingData[2],
          shippingHouseNumber: fetchedShippingData[3],
          shippingFloor: fetchedShippingData[4],
          shippingDoor: fetchedShippingData[5],
        };

        setShippingData((prevShippingData) =>
          Object.assign({}, prevShippingData, updatedShippingData)
        );
      }

      if (profileData[0].contactEmail == null) {
        setContact({
          email: "",
          phone: "",
        });
      } else {
        setContact({
          email: profileData[0].contactEmail,
          phone: profileData[0].contactPhone,
        });
      }
    } catch (err) {}
  }, [profileData, showShipping]);

  function handleInputChangeBilling(e) {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  }

  function handleInputChangeShipping(e) {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  }

  // Function to handle the Contact checkbox change
  // function handleContactCheckboxChange() {
  //   setShowContact(!showContact);
  // }

  // Additional state variables for form validation
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check form validation before submitting
    if (
      !validateForm(billingData, shippingData, showShipping, contact, setErrors)
    ) {
      setSubmitErrorMessage("Please fill in all required fields correctly.");
      toast.error("Please fill in all required fields correctly.", {
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true); // Start the submission process

    if (isSameAddress) {
      if (isCompany) {
        setOrderFormData({
          billing: `${billingData.billingName}, ${billingData.billingPostcode}, ${billingData.billingCity}, ${billingData.billingStreet}, ${billingData.billingHouseNumber}, ${billingData.billingFloor}, ${billingData.billingDoor}, ${company.company}, ${company.taxNumber}`,
          shipping: `${shippingData.shippingName}, ${shippingData.shippingPostcode}, ${shippingData.shippingCity}, ${shippingData.shippingStreet}, ${shippingData.shippingHouseNumber}, ${shippingData.shippingFloor}, ${shippingData.shippingDoor}`,
          contactEmail: contact.email,
          contactPhone: contact.phone,
        });
      } else {
        setOrderFormData({
          billing: `${billingData.billingName}, ${billingData.billingPostcode}, ${billingData.billingCity}, ${billingData.billingStreet}, ${billingData.billingHouseNumber}, ${billingData.billingFloor}, ${billingData.billingDoor}`,
          shipping: `${billingData.billingName}, ${billingData.billingPostcode}, ${billingData.billingCity}, ${billingData.billingStreet}, ${billingData.billingHouseNumber}, ${billingData.billingFloor}, ${billingData.billingDoor}`,
          contactEmail: contact.email,
          contactPhone: contact.phone,
        });
      }
    } else {
      if (isCompany) {
        setOrderFormData({
          billing: `${billingData.billingName}, ${billingData.billingPostcode}, ${billingData.billingCity}, ${billingData.billingStreet}, ${billingData.billingHouseNumber}, ${billingData.billingFloor}, ${billingData.billingDoor}, ${company.company}, ${company.taxNumber}`,
          shipping: `${shippingData.shippingName}, ${shippingData.shippingPostcode}, ${shippingData.shippingCity}, ${shippingData.shippingStreet}, ${shippingData.shippingHouseNumber}, ${shippingData.shippingFloor}, ${shippingData.shippingDoor}`,
          contactEmail: contact.email,
          contactPhone: contact.phone,
        });
      } else {
        setOrderFormData({
          billing: `${billingData.billingName}, ${billingData.billingPostcode}, ${billingData.billingCity}, ${billingData.billingStreet}, ${billingData.billingHouseNumber}, ${billingData.billingFloor}, ${billingData.billingDoor}`,
          shipping: `${shippingData.shippingName}, ${shippingData.shippingPostcode}, ${shippingData.shippingCity}, ${shippingData.shippingStreet}, ${shippingData.shippingHouseNumber}, ${shippingData.shippingFloor}, ${shippingData.shippingDoor}`,
          contactEmail: contact.email,
          contactPhone: contact.phone,
        });
      }
    }

    // Simulating form submission for 2 seconds
    setTimeout(() => {
      setIsSubmitting(false); // Finish the submission process
      setSubmitSuccessMessage("Order Form submitted successfully!");
      setShowSummary(true);
    }, 2000);
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        className="w-96 mx-auto"
        onSubmit={handleSubmit}
        onChange={handleInputChangeBilling}
      >
        {/* BILLING */}
        <div className="flex flex-col gap-4">
          {/* ADDRESS */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">BILLING ADDRESS</h3>
            <label htmlFor="name">Name</label>
            <input
              autoComplete="on"
              type="text"
              name="billingName"
              id="billingName"
              value={billingData.billingName}
              required
              onChange={handleInputChangeBilling}
              placeholder="Billing Name"
            />
            <label htmlFor="postcode">Postcode</label>
            <input
              autoComplete="on"
              type="number"
              name="billingPostcode"
              id="billingPostcode"
              value={billingData.billingPostcode}
              placeholder="Billing Postcode"
              required
            />
            <label htmlFor="city">City</label>
            <input
              autoComplete="on"
              type="text"
              name="billingCity"
              id="billingCity"
              value={billingData.billingCity}
              required
              placeholder="Billing City"
            />
            <label htmlFor="street">Street</label>
            <input
              autoComplete="on"
              type="text"
              name="billingStreet"
              id="billingStreet"
              value={billingData.billingStreet}
              required
              placeholder="Billing Street"
            />
            <label htmlFor="houseNumber">House Number</label>
            <input
              autoComplete="on"
              type="number"
              name="billingHouseNumber"
              id="billingHouseNumber"
              value={billingData.billingHouseNumber}
              required
              placeholder="Billing House Number"
            />{" "}
            <label htmlFor="floor">Floor</label>
            <input
              autoComplete="on"
              type="number"
              name="billingFloor"
              id="billingFloor"
              value={billingData.billingFloor}
              placeholder="Billing Floor"
            />
            <label htmlFor="door">Door</label>
            <input
              autoComplete="on"
              type="number"
              name="billingDoor"
              id="billingDoor"
              value={billingData.billingDoor}
              placeholder="Billing Door"
            />
          </div>
        </div>

        {/* COMPANY */}
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            id="isCompany"
            checked={isCompany}
            onChange={() => setIsCompany(!isCompany)}
          />
          <label htmlFor="isCompany">Company</label>
        </div>
        {isCompany && (
          <div className="flex flex-col gap-2 p-4">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              name="company"
              id="company"
              required
              autoComplete="on"
              value={company.company}
              placeholder="Company Name"
              onChange={(e) =>
                setCompany({ ...company, company: e.target.value })
              }
            />

            <label htmlFor="taxNumber">Tax Number</label>
            <input
              type="number"
              name="taxNumber"
              id="taxNumber"
              required
              autoComplete="on"
              value={company.taxNumber}
              placeholder="Tax Number"
              onChange={(e) =>
                setCompany({ ...company, taxNumber: e.target.value })
              }
            />
          </div>
        )}

        {/* SHIPPING */}
        <div className="flex items-center mt-6 gap-2">
          <input
            type="checkbox"
            id="showShipping"
            checked={showShipping}
            placeholder="Shipping details"
            onChange={() => {
              setShowShipping(!showShipping);
              setIsSameAddress(!isSameAddress);
            }}
          />
          <label htmlFor="showShipping">
            Shipping address same as billing address
          </label>
        </div>
        {/* SHIPPING FORM */}
        {!showShipping && (
          <div className="mt-8">
            <div className="flex flex-col gap-2 ">
              <h2 className="mb-4 font-bold">SHIPPING ADDRESS</h2>
              <label htmlFor="name">Name</label>
              <input
                autoComplete="on"
                type="text"
                name="shippingName"
                id="shippingName"
                value={shippingData.shippingName}
                required
                placeholder="Shipping Name"
                onChange={handleInputChangeShipping}
              />
              <label htmlFor="postcode">Postcode</label>
              <input
                autoComplete="on"
                type="number"
                name="shippingPostcode"
                id="shippingPostcode"
                value={shippingData.shippingPostcode}
                onChange={handleInputChangeShipping}
                required
                placeholder="Shipping Postcode"
              />
              <label htmlFor="city">City</label>
              <input
                autoComplete="on"
                type="text"
                name="shippingCity"
                id="shippingCity"
                value={shippingData.shippingCity}
                onChange={handleInputChangeShipping}
                required
                placeholder="Shipping City"
              />
              <label htmlFor="street">Street</label>
              <input
                autoComplete="on"
                type="text"
                name="shippingStreet"
                id="shippingStreet"
                value={shippingData.shippingStreet}
                onChange={handleInputChangeShipping}
                placeholder="Shipping Street"
                required
              />
              <label htmlFor="houseNumber">House Number</label>
              <input
                autoComplete="on"
                type="number"
                name="shippingHouseNumber"
                id="shippingHouseNumber"
                value={shippingData.shippingHouseNumber}
                onChange={handleInputChangeShipping}
                placeholder="Shipping House Number"
                required
              />{" "}
              <label htmlFor="floor">Floor</label>
              <input
                autoComplete="on"
                type="number"
                name="shippingFloor"
                id="shippingFloor"
                value={shippingData.shippingFloor}
                placeholder="Shipping Floor"
                onChange={handleInputChangeShipping}
              />
              <label htmlFor="door">Door</label>
              <input
                autoComplete="on"
                type="number"
                name="shippingDoor"
                id="shippingDoor"
                value={shippingData.shippingDoor}
                placeholder="Shipping Door"
                onChange={handleInputChangeShipping}
              />
            </div>
          </div>
        )}
        {/* CONTACT */}
        {/* <div className="flex flex-row items-center mt-4 gap-2"> */}
          {/*   <input
            type="checkbox"
            id="contact"
            name="contact"
            value="contact"
            checked={showContact}
            onChange={handleContactCheckboxChange}
          /> */}
        {/* </div> */}
        <div className="flex flex-col mt-4 gap-2">
        <h2 className="mb-4 mt-4 font-bold">CONTACT INFORMATION</h2>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            value={contact.email}
            required
            placeholder="Email"
            onChange={(e) =>
              setContact({
                ...contact,
                email: e.target.value,
              })
            }
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="on"
            value={contact.phone}
            required
            placeholder="Phone"
            onChange={(e) =>
              setContact({
                ...contact,
                phone: e.target.value,
              })
            }
          />
        </div>

        <div className="flex items-center justify-end mt-6">
          <button
            className="text-red-500 font-bold uppercase mr-4 px-4 py-2 text-sm rounded focus:outline-none"
            onClick={() => setShowModal(false)}
            type="submit"
            disabled={isSubmitting}
          >
            Close
          </button>
          <button
            className="bg-emerald-500 text-white font-bold uppercase px-4 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Checkout"}
          </button>
        </div>
        <div className="flex flex-row justify-center items-center p-4">
          {/* Submission messages */}
          {submitSuccessMessage && (
            <p className="text-green-500">{submitSuccessMessage}</p>
          )}
          {submitErrorMessage && (
            <p className="text-red-500">{submitErrorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
