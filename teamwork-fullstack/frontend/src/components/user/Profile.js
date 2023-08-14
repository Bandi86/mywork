import { useState, useContext, useEffect } from "react";
import { userContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import {
  billingEndpoint,
  shippingEndpoint,
} from "../../repositories/apiEndPoints";
import { createEntry, removeEntry } from "../../repositories/crud";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { user, setUser } = useContext(userContext);

  const [showContact, setShowContact] = useState(false);

  // DATA THAT COMES FROM DB (DOWNLOAD)
  const { profileData, setProfileData } = useContext(userContext);

  // UPDATE TRIGGER
  const { updateProfile, setUpdateProfile } = useContext(userContext);

  // BILLING DATA THAT IS BEING SENT TO DB (UPLOAD)
  const [billingData, setBillingData] = useState({});

  // SHIPPING DATA THAT IS BEING SENT TO DB (UPLOAD)
  const [shippingData, setShippingData] = useState({});

  const [company, setCompany] = useState({});

  const [contact, setContact] = useState({});

  const [isCompany, setIsCompany] = useState(false);

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

  // BILLING
  function handleSubmitBilling(e) {
    e.preventDefault();

    const address = `${billingData.billingPostcode}, ${billingData.billingCity}, ${billingData.billingStreet}, ${billingData.billingHouseNumber}, ${billingData.billingFloor}, ${billingData.billingDoor}`;

    let data = {
      name: billingData.billingName,
      address: address,
    };
    if (isCompany) {
      data = {
        ...data,
        company: company.company,
        taxNumber: company.taxNumber,
      };
    }

    try {
      createEntry(data, `${billingEndpoint}/${user.localId}`)
        .then((res) => res.json())
        .then((data) => {
          data.resdata == "success" &&
            alert("Billing data saved successfully!");
          setUpdateProfile(!updateProfile);
          toast.success("Billing data saved successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (err) {
      toast.error("Billing data save failed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  function handleDeleteBilling() {
    removeEntry({
      url: `${billingEndpoint}/${user.localId}`,
    }).then((res) => {
      if (res.ok) setUpdateProfile(!updateProfile);
      toast.success("Billing data deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  function handleInputChangeBilling(e) {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  }

  // SHIPPING
  function handleSubmitShipping(e) {
    e.preventDefault();
    const address = `${shippingData.shippingPostcode}, ${shippingData.shippingCity}, ${shippingData.shippingStreet}, ${shippingData.shippingHouseNumber}, ${shippingData.shippingFloor}, ${shippingData.shippingDoor}`;

    let data = {
      name: shippingData.shippingName,
      address: address,
    };
    if (showContact) {
      data = {
        ...data,
        email: contact.email,
        phone: contact.phone,
      };
    }
    try {
      createEntry(data, `${shippingEndpoint}/${user.localId}`)
        .then((res) => res.json())
        .then((data) => {
          data.resdata == "success" &&
            alert("Shipping data saved successfully!");
          setUpdateProfile(!updateProfile);
          toast.success("Shipping data saved successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (err) {
      toast.error("Shipping data save failed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  function handleDeleteShipping() {
    try {
      removeEntry({
        url: `${shippingEndpoint}/${user.localId}`,
      }).then((res) => {
        if (res.ok) setUpdateProfile(!updateProfile);
        toast.success("Shipping data deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    } catch (err) {
      toast.error("Shipping data delete failed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  function handleInputChangeShipping(e) {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  }

  return (
    <>
      <div className="flex flex-row justify-center gap-10">
        <div className="flex-col bg-slate-100">
          {/* BILLING FORM */}
          <form
            onSubmit={handleSubmitBilling}
            onChange={handleInputChangeBilling}
            className="flex flex-col justify-center items-center"
          >
            <div className="mb-4 mt-4">
              <h2 className="font-bold">Billing Details:</h2>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col gap-4 justify-center items-center w-[30rem]">
              <label htmlFor="name">Name</label>
              <input
                autoComplete="on"
                type="text"
                name="billingName"
                id="billingName"
                value={billingData.billingName}
                required
                onChange={handleInputChangeBilling}
              />

              <label htmlFor="postcode">Postcode</label>
              <input
                autoComplete="on"
                type="number"
                name="billingPostcode"
                id="billingPostcode"
                value={billingData.billingPostcode}
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
              />

              <label htmlFor="street">Street</label>
              <input
                autoComplete="on"
                type="text"
                name="billingStreet"
                id="billingStreet"
                value={billingData.billingStreet}
                required
              />

              <label htmlFor="houseNumber">House Number</label>
              <input
                autoComplete="on"
                type="number"
                name="billingHouseNumber"
                id="billingHouseNumber"
                value={billingData.billingHouseNumber}
                required
              />

              <label htmlFor="floor">Floor</label>
              <input
                autoComplete="on"
                type="number"
                name="billingFloor"
                id="billingFloor"
                value={billingData.billingFloor}
              />

              <label htmlFor="door">Door</label>
              <input
                autoComplete="on"
                type="number"
                name="billingDoor"
                id="billingDoor"
                value={billingData.billingDoor}
              />
            </div>

            {/* COMPANY */}
            <div className="flex items-center gap-2 mt-10">
              <input
                type="checkbox"
                id="isCompany"
                checked={isCompany}
                onChange={() => setIsCompany(!isCompany)}
              />
              <label htmlFor="isCompany">Company</label>
            </div>
            {isCompany && (
              <div className="grid grid-cols-2 gap-4 mb-6 mt-6">
                <div className="flex flex-col items-center gap-4">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    autoComplete="on"
                    value={company.company}
                    onChange={(e) =>
                      setCompany({ ...company, company: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <label htmlFor="taxNumber">Tax Number</label>
                  <input
                    type="number"
                    name="taxNumber"
                    id="taxNumber"
                    required
                    autoComplete="on"
                    value={company.taxNumber}
                    onChange={(e) =>
                      setCompany({ ...company, taxNumber: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="flex flex-row gap-8 mt-10 mb-10">
              <button type="submit" className="Button">
                Save Billing
              </button>
              <button
                type="button"
                className="Button"
                onClick={() => {
                  handleDeleteBilling();
                }}
              >
                Delete Billing
              </button>
            </div>
          </form>
        </div>

        {/* SHIPPING FORM */}
        <div className="flex flex-row justify-center gap-10">
          <div className="flex-col bg-slate-100">
            <form
              onSubmit={handleSubmitShipping}
              onChange={handleInputChangeShipping}
              className="flex flex-col justify-center items-center"
            >
              <div className="mb-4 mt-4">
                <h2 className="font-bold">Shipping Details:</h2>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center w-[30rem]">
                <label htmlFor="name">Name</label>
                <input
                  autoComplete="on"
                  type="text"
                  name="shippingName"
                  id="shippingName"
                  value={shippingData.shippingName}
                  required
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
                />

                <label htmlFor="street">Street</label>
                <input
                  autoComplete="on"
                  type="text"
                  name="shippingStreet"
                  id="shippingStreet"
                  value={shippingData.shippingStreet}
                  onChange={handleInputChangeShipping}
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
                  required
                />

                <label htmlFor="floor">Floor</label>
                <input
                  autoComplete="on"
                  type="number"
                  name="shippingFloor"
                  id="shippingFloor"
                  value={shippingData.shippingFloor}
                  onChange={handleInputChangeShipping}
                />

                <label htmlFor="door">Door</label>
                <input
                  autoComplete="on"
                  type="number"
                  name="shippingDoor"
                  id="shippingDoor"
                  value={shippingData.shippingDoor}
                  onChange={handleInputChangeShipping}
                />
              </div>
              <div className="flex items-center gap-2 mt-10">
                <input
                  type="checkbox"
                  id="contact"
                  name="contact"
                  value="contact"
                  onChange={() => setShowContact(!showContact)}
                />
                <label htmlFor="contact">Contact</label>
              </div>
              {/* CONTACT */}
              {showContact && (
                // <div className="flex flex-col gap-4 mb-6 mt-6">
                <div className="grid grid-cols-2 gap-4 mb-6 mt-6 ">
                  <div className="flex flex-col items-center gap-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="on"
                      value={contact.email}
                      required
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="on"
                      value={contact.phone}
                      required
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-row gap-8 mt-10 mb-10">
                <button type="submit" className="Button">
                  Save Shipping
                </button>
                <button
                  type="button"
                  className="Button"
                  onClick={() => {
                    handleDeleteShipping();
                  }}
                >
                  Delete Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
