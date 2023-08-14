import EditProduct from "./Products/EditProduct";
import EditOrder from "./Orders/EditOrder";
import EditCategory from "./Categories/EditCategory";
import EditUser from "./Users/UserEditModal";

export default function EditModal({
  showModal,
  setShowModal,
  productId,
  orderId,
  categoryId,
  userId,
}) {
  function handleForms() {
    if (productId) {
      return <EditProduct productId={productId} setShowModal={setShowModal} />;
    } else if (orderId) {
      return <EditOrder orderId={orderId} setShowModal={setShowModal} />;
    } else if (categoryId) {
      return (
        <EditCategory categoryId={categoryId} setShowModal={setShowModal} />
      );
    } else if (userId) {
      return <EditUser showModal={showModal} userId={userId} setShowModal={setShowModal} />;
    }
  }

  function handleTitle() {
    if (productId) {
      return "Edit Product";
    } else if (orderId) {
      return "Edit Order";
    } else if (categoryId) {
      return "Edit Category";
    } else if (userId) {
      return "Edit User";
    }
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-semibold p-2 ml-[6rem]">
                {handleTitle()}
              </h3>
              <button
                className="text-black opacity-50 hover:opacity-100 text-2xl font-semibold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="mb-4">{handleForms()}</div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      )}
    </>
  );
}
