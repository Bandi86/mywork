import OrderForm from "./OrderForm";
import Summary from "./Summary";
import { useState } from "react";

const OrderModal = ({ showModal, setShowModal }) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [orderFormData, setOrderFormData] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [productFormData, setProductFormData] = useState({});
  const [orderTotal, setOrderTotal] = useState({});

  const orderFormWidth = "w-[30rem]";
  const summaryWidth = "w-[60rem]";

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`bg-white mx-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh] ${
              showOrderForm ? orderFormWidth : showSummary ? summaryWidth : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-semibold p-2 ml-auto mr-auto">
                {showSummary ? "Order Summary" : "Order Details"}
              </h3>
              <button
                className="text-black opacity-50 hover:opacity-100 text-2xl font-semibold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            {showSummary ? (
              <Summary
                showModal={showModal}
                setShowModal={setShowModal}
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                setShowOrderForm={setShowOrderForm}
                orderFormData={orderFormData}                
              />
            ) : (
              <OrderForm
                showModal={showModal}
                setShowModal={setShowModal}
                showOrderForm={showOrderForm}
                setShowOrderForm={setShowOrderForm}
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                orderFormData={orderFormData}
                setOrderFormData={setOrderFormData}
              />
            )}
          </div>
        </div>
      )}
      {showModal && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}
    </>
  );
};

export default OrderModal;
