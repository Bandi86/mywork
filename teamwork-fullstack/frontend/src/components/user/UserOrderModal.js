import OrderDetails from "../admin/Orders/OrderDetails";

export default function UserOrderModal({ showModal, setShowModal, orderID }) {
  const width = "w-[60rem]";

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`bg-white mx-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh] ${width}`}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-black opacity-50 hover:opacity-100 text-2xl font-semibold"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "auto" }}
              >
                ×
              </button>
            </div>
            <OrderDetails orderID={orderID} showOrderDetails={showModal} />
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      )}
    </>
  );
}
