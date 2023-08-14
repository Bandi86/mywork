import React, { useContext, useState, useEffect } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { ordersEndpoint } from "../../repositories/apiEndPoints";
import convertDate from "../../services/timestamp";
import SortableButton from "../admin/Home/SortOrder";
import { readEntry } from "../../repositories/crud";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Table } from "flowbite-react";
import { userContext } from "../../contexts/userContext";
import UserOrderModal from "./UserOrderModal";

export default function Orders() {
  const { user, setUser } = useContext(userContext);

  const [clickedItem, setClickItem] = useState([0, "asc"]);
  const [orderID, setOrderID] = useState();
  const [showModal, setShowModal] = useState(false);
  const [conditions, setConditions] = useState({
    asc: true,
    tabIdx: 0,
  });

  const [orders, setOrders] = useState();

  useEffect(() => {
    readEntry(`${ordersEndpoint}/orderhistory`).then((res) => {
      res.json().then((data) => {
        setOrders(data.resdata);
      });
    });
  }, [user]);

  function sortableBtnHandler(btn) {
    if (clickedItem[0] == btn && clickedItem[1] == "asc") {
      setClickItem([btn, "desc"]);
      setConditions((prev) => ({ ...prev, asc: false, tabIdx: btn }));
    } else {
      setClickItem([btn, "asc"]);
      setConditions((prev) => ({ ...prev, asc: true, tabIdx: btn }));
    }
  }

  function handleOrderDetails(orderId) {
    setOrderID(orderId);
    setShowModal(true);
  }

  function orderStatus(order) {
    if (order.status == "delivered") {
      return <Table.Cell className="text-green-600 font-bold">{order.status}</Table.Cell>;
    }
    if (order.status == "under delivery") {
      return <Table.Cell className="text-blue-600 font-bold">{order.status}</Table.Cell>;
    }
    if (order.status == "deleted") {
      return <Table.Cell className="text-red-600 font-bold">{order.status}</Table.Cell>;
    }
    if (order.status == "processing") {
      return (
        <Table.Cell className="text-yellow-400 font-bold">{order.status}</Table.Cell>
      );
    }
  }

  return (
    <div className="overflow-x-auto w-full mt-4 p-10">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(1);
            }}
          >
            Order ID
            {clickedItem[0] == 1 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(2);
            }}
          >
            Status
            {clickedItem[0] == 2 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(3);
            }}
          >
            Created AT
            {clickedItem[0] == 3 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(4);
            }}
          >
            Updated AT
            {clickedItem[0] == 4 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(5);
            }}
          >
            Contact Email
            {clickedItem[0] == 5 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(6);
            }}
          >
            Contact Phone
            {clickedItem[0] == 6 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(7);
            }}
          >
            Total
            {clickedItem[0] == 7 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell>Operation</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y table-auto min-w-full">
          {Array.isArray(orders) &&
            orders.map((order) => (
              <Table.Row
                key={order.id}
                className="bg-slate-200 text-black hover:bg-blue-600 hover:text-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                  {order.id}
                </Table.Cell>
                {orderStatus(order)}
                <Table.Cell>{convertDate(order.created_at)}</Table.Cell>
                <Table.Cell>{convertDate(order.updated_at)}</Table.Cell>
                <Table.Cell>{order.contactEmail}</Table.Cell>
                <Table.Cell>{order.contactPhone}</Table.Cell>
                <Table.Cell className="text-second font-bold">{order.total} €</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-4 text-xl cursor-pointer">
                    <FaEye
                      onClick={() => {
                        handleOrderDetails(order.id);
                      }}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <UserOrderModal
            showModal={showModal}
            setShowModal={setShowModal}
            orderID={orderID}
          />
        </div>
      )}
    </div>
  );
}
