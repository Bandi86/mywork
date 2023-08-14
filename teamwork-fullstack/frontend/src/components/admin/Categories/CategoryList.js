import { Table } from "flowbite-react";
import { useContext, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { adminContext } from "../../../contexts/adminContext";
import { categoriesEndpoint } from "../../../repositories/apiEndPoints";
import { removeEntry } from "../../../repositories/crud";
import handleDelete from "../../../services/adminDelete";
import convertDate from "../../../services/timestamp";
import PaginationShared from "../../PaginationShared";
import EditModal from "../EditModal";
import SortableButton from "../Home/SortOrder";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CategoryList({
  checked,
  setChecked,
  categories,
  setCategories,
  categorysLength,
  currentPage,
  totalPages,
  setCurrentPage,
  conditions,
  setConditions,
  clickedItem,
  setClickItem,
}) {
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);

  function handleEdit(categoryId) {
    setShowModal(true);
    setCategoryId(categoryId);
  }

  function deleteHandler(categoryId) {
    handleDelete(
      removeEntry,
      categoriesEndpoint,
      categoryId,
      adminRefresh,
      setAdminRefresh
    )
      .then((res) => {
        toast.success("Category deleted successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
  }

  function sortableBtnHandler(btn) {
    if (clickedItem[0] == btn && clickedItem[1] == "asc") {
      setClickItem([btn, "desc"]);
      setChecked(true);
      setConditions((prev) => ({ ...prev, asc: false, tabIdx: btn }));
    } else {
      setClickItem([btn, "asc"]);
      setChecked(true);
      setConditions(prev => ({ ...prev, asc: true, tabIdx: btn }));
    }
  }

  return (
    <>
      {checked && (
        <h2 className="text-center">All Categories: {categorysLength}</h2>
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
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(1);
            }}
          >
            Category ID
            {clickedItem[0] == 1 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => {
              sortableBtnHandler(2);
            }}
          >
            Category Name
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
          <Table.HeadCell>Operation</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <Table.Row
                key={cat.id}
                className="bg-slate-200 text-black hover:bg-blue-600 hover:text-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                  {cat.id}
                </Table.Cell>
                <Table.Cell>{cat.name}</Table.Cell>
                <Table.Cell>{convertDate(cat.created_at)}</Table.Cell>
                <Table.Cell>{convertDate(cat.updated_at)}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-4 text-xl cursor-pointer">
                    <FaRegEdit onClick={() => handleEdit(cat.id)} />{" "}
                    <BsFillTrash3Fill
                      onClick={() =>
                        deleteHandler(cat.id)
                      }
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          {showModal && (
            <EditModal
              showModal={showModal}
              setShowModal={setShowModal}
              categoryId={categoryId}
            />
          )}
        </Table.Body>
      </Table>
    </>
  );
}
