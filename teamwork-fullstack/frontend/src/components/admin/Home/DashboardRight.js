import AddProduct from "../Products/AddProduct";
import OrderDetails from "../Orders/OrderDetails";
import AddCategory from "../Categories/AddCategory";

export default function DashBoardRight({
  contentChanger,
  orderID,
  setOrderID,
  showOrderDetails,
  setShowOrderDetails,
}) {
  return (
    <>
      {contentChanger == "0" ? <OrderDetails
        orderID={orderID}
        setOrderID={setOrderID}
        showOrderDetails={showOrderDetails}
        setShowOrderDetails={setShowOrderDetails}
      /> : ""}
      {contentChanger == "1" ? <AddProduct /> : ""}
      {contentChanger == "2" ? <AddCategory /> : ""}
    </>
  );
}
