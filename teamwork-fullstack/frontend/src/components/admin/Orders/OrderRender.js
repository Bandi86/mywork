import { Table } from "flowbite-react";
import React, { useState, useContext, useEffect } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { ordersEndpoint } from "../../../repositories/apiEndPoints";
import { removeEntry } from "../../../repositories/crud";
import handleDelete from "../../../services/adminDelete";
import convertDate from "../../../services/timestamp";
import PaginationShared from "../../PaginationShared";
import SortableButton from "../Home/SortOrder";
import EditModal from "../EditModal";
import { adminContext } from "../../../contexts/adminContext";
import { toast } from "react-toastify";

export default function OrderRender({
  checked,
  setChecked,
  orders,
  setOrders,
  currentPage,
  totalPages,
  setCurrentPage,
  conditions,
  setConditions,
  orderID,
  setOrderID,
  showOrderDetails,
  setShowOrderDetails,
  selectedTab,
  clickedItem,
  setClickItem,
  ordersLength
}) {
  const [showModal, setShowModal] = useState(false);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);  

  useEffect(() => {
    try {
      setShowOrderDetails(false);
    } catch (err) {}
  }, [selectedTab]);

  function handleEdit(orderId) {
    setShowModal(true);
    setOrderID(orderId);
  }
  function sortableBtnHandler(btn) {
    if (clickedItem[0] == btn && clickedItem[1] == "asc") {
      setClickItem([btn, "desc"]);
      setChecked(true);
      setConditions((prev) => ({ ...prev, asc: false, tabIdx: btn }));
    } else {
      setClickItem([btn, "asc"]);
      setChecked(true);
      setConditions((prev) => ({ ...prev, asc: true, tabIdx: btn }));
    }
  }

  function handleOrderDetails(orderId) {
    setOrderID(orderId);
    setShowOrderDetails(true);
  }

  function orderStatus(order) {
    if (order.status == "delivered") {
      return (
        <Table.Cell className="text-green-600 font-bold">
          {order.status}
        </Table.Cell>
      );
    }
    if (order.status == "under delivery") {
      return (
        <Table.Cell className="text-blue-600 font-bold">
          {order.status}
        </Table.Cell>
      );
    }
    if (order.status == "deleted") {
      return (
        <Table.Cell className="text-red-600 font-bold">
          {order.status}
        </Table.Cell>
      );
    }
    if (order.status == "processing") {
      return (
        <Table.Cell className="text-yellow-500 font-bold">
          {order.status}
        </Table.Cell>
      );
    }
  }

  function deleteHandler(order_id) {
    handleDelete(
      removeEntry,
      ordersEndpoint,
      order_id,
      adminRefresh,
      setAdminRefresh
    ).then((res) => {
      toast.success("Order status successfully set to deleted ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  return (
    <>
     {checked && (
        <h2 className="text-center">All orders: {ordersLength}</h2>
      )}
      <PaginationShared
        checked={checked}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onPreviousPage={() => {
          setConditions((prev) => ({
            ...prev,
            currentPage: Math.max(currentPage, 1),
          }));
          setCurrentPage((prevPage) => Math.max(prevPage, 1));
        }}
        onNextPage={() => {
          setConditions((prev) => ({
            ...prev,
            currentPage: Math.min(currentPage, totalPages),
          }));
          setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
        }}
      />
      <div className="overflow-x-auto w-full">
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
                      <FaRegEdit
                        onClick={() => {
                          handleEdit(order.id);
                        }}
                      />{" "}
                      {order.status != "deleted" && (
                        <BsFillTrash3Fill
                          onClick={() => deleteHandler(order.id)}
                        />
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            {showModal && (
              <EditModal
                showModal={showModal}
                setShowModal={setShowModal}
                orderId={orderID}
              />
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
