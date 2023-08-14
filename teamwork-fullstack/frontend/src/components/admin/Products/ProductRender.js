import { Table } from "flowbite-react";
import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { adminContext } from "../../../contexts/adminContext";
import { productsEndpoint } from "../../../repositories/apiEndPoints";
import { removeEntry } from "../../../repositories/crud";
import handleDelete from "../../../services/adminDelete";
import convertDate from "../../../services/timestamp";
import PaginationShared from "../../PaginationShared";
import EditModal from "../EditModal";
import SortableButton from "../Home/SortOrder";

export default function ProductRender({
  checked,
  setChecked,
  products,
  setProducts,
  productsLength,
  currentPage,
  totalPages,
  setCurrentPage,
  conditions,
  setConditions,
  clickedItem,
  setClickItem,
}) {
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);

  const handleEdit = (productId) => {
    setShowModal(true);
    setProductId(productId);
  };
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

  function deleteHandler(prdid) {
    handleDelete(
      removeEntry,
      productsEndpoint,
      prdid,
      adminRefresh,
      setAdminRefresh
    ).then((res) => {
      toast.success("Product status successfully set to deleted", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  return (
    <>
      {checked && (
        <h2 className="text-center">All products: {productsLength}</h2>
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
      <div></div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(1);
            }}
          >
            Product ID
            {clickedItem[0] == 1 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(2);
            }}
          >
            Name
            {clickedItem[0] == 2 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(3);
            }}
          >
            Category ID
            {clickedItem[0] == 3 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(4);
            }}
          >
            Status
            {clickedItem[0] == 4 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(5);
            }}
          >
            Price
            {clickedItem[0] == 5 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(6);
            }}
          >
            Created AT
            {clickedItem[0] == 6 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(7);
            }}
          >
            Updated AT
            {clickedItem[0] == 7 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell>Operation</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {Array.isArray(products) &&
            products.map((product) => (
              <Table.Row
                key={nanoid()}
                className="bg-slate-200 text-black hover:bg-blue-600 hover:text-white"
              >
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                  {product.id}
                </Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.category_id}</Table.Cell>
                {product.isDeleted ? (
                  <Table.Cell className="text-red-600 font-bold">
                    Deleted
                  </Table.Cell>
                ) : (
                  <Table.Cell className="text-green-600 font-bold">
                    Active
                  </Table.Cell>
                )}

                <Table.Cell>{product.price} €</Table.Cell>
                <Table.Cell>{convertDate(product.created_at)}</Table.Cell>
                <Table.Cell>{convertDate(product.updated_at)}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-4 text-xl cursor-pointer">
                    <FaRegEdit onClick={() => handleEdit(product.id)} />{" "}
                    {!product.isDeleted && (
                      <BsFillTrash3Fill
                        onClick={() => deleteHandler(product.id)}
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
              productId={productId}
            />
          )}
        </Table.Body>
      </Table>
    </>
  );
}
