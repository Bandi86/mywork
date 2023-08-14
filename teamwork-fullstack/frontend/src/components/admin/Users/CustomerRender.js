import { Table } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { usersEndpoint } from "../../../repositories/apiEndPoints";
import {
  readEntry,
  removeEntry,
  uploadEntry,
} from "../../../repositories/crud";
import handleDelete from "../../../services/adminDelete";
import PaginationShared from "../../PaginationShared";
import SortableButton from "../Home/SortOrder";
import convertDate from "../../../services/timestamp";
import EditModal from "../EditModal";
import { adminContext } from "../../../contexts/adminContext";
import { userContext } from "../../../contexts/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomerRender({
  checked,
  setChecked,
  render: { render, setRender },
  users,
  setUsers,
  conditions,
  setConditions,
  clickedItem,
  setClickItem,
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState(null);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);
  const { user, isLoggedIn } = useContext(userContext);
  const [profileImage, setProfileImage] = useState(null);
  const { profileData } = useContext(userContext);
  const [totalUsers, setTotalUsers] = useState(0)
  /* const [clickedItem, setClickItem] = useState([0, "asc"]); */

  const offset = 10;
  const limit = 1000;
  let tabName = null;
  const imageUrl = "http://localhost:8080/";

  /*  useEffect(() => {
    try {
      setProfileImage(imageUrl + profileData[0].imagePath.replace(/\\/g, "/"));
    } catch (error) {
      console.error("Failed to fetch recent users:", error);
    }
  }, [user]); */

  //uploads owner id

  useEffect(() => {
    readEntry(`${usersEndpoint}/count`).then((res) => {
      res.json().then((data) => {
        setTotalUsers(Object.values(data.resdata)[0])
      })
    })
  }, [adminRefresh])

  useEffect(() => {
    try {
      readEntry(`${uploadEntry}/${profileData[0].userId}`).then((res) => {
        const data = res.json();
        console.log("res", res);
        //setProfileImage(data.resdata.imagePath);
      });
    } catch (error) { }
  }, [profileData, adminRefresh]);

  const fetchUsersForCurrentPage = async (params) => {
    try {
      const { filter, order, reverse, limit, offset } = params;
      const url = `${usersEndpoint}/${filter}/${order}/${reverse}/${limit}/${offset}`;
      const res = await readEntry(url);
      const data = await res.json();
      setUsers(data.resdata);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    switch (conditions.tabIdx) {
      case 1:
        tabName = "id";
        break;
      case 2:
        tabName = "username";
        break;
      case 3:
        tabName = "email";
        break;
      case 4:
        tabName = "role";
        break;
      case 5:
        tabName = "created_at";
        break;
      case 6:
        tabName = "updated_at";
        break;
      case null:
        tabName = "created_at";
        break;
    }

    let filterText = conditions.text;
    if (conditions.text == "") {
      filterText = "_";
    }

    if (checked) {
      setCurrentPage(1);
      getUsersLength();
      fetchUsersForCurrentPage({
        filter: filterText,
        order: tabName,
        reverse: conditions.asc,
        limit: conditions.limit,
        offset: (currentPage - 1) * conditions.limit,
      });
    } else {
      fetchRecentUsers();

      // Itt módosítsuk a fetchUsersForCurrentPage hívását a megfelelő rendezési paraméterekkel
    }
  }, [checked, conditions, user, isLoggedIn, adminRefresh]);

  useEffect(() => {
    let filterText = conditions.text;
    if (conditions.text == "") {
      filterText = "_";
    }

    fetchUsersForCurrentPage({
      filter: filterText,
      order: tabName,
      reverse: conditions.asc,
      limit: conditions.limit,
      offset: (currentPage - 1) * conditions.limit,
    });
  }, [currentPage]);

  const getUsersLength = async () => {
    try {
      const res = await readEntry(`${usersEndpoint}/${limit}/${0}`);
      const data = await res.json();
      setTotalPages(Math.ceil(data.resdata.length / offset));
      if (data.resdata.length === 0) {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchRecentUsers = async () => {
    try {
      const res = await readEntry(`${usersEndpoint}/10/0`);
      const data = await res.json();
      setUsers(data.resdata);
    } catch (error) {
      console.error("Failed to fetch recent users:", error);
    }
  };

  function handleEdit(userId) {
    setShowModal(true);
    setUserId(userId);
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

  function deleteHandler(userid) {
    handleDelete(
      removeEntry,
      usersEndpoint,
      userid,
      adminRefresh,
      setAdminRefresh
    ).then((res) => {
      toast.success("User deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  return (
    <>
      {checked && (
        <h2 className="text-center">All users: {totalUsers}</h2>
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
            User ID
            {clickedItem[0] == 1 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell onClick={() => sortableBtnHandler(2)}>
            User Name
            {clickedItem[0] == 2 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell onClick={() => sortableBtnHandler(3)}>
            E-mail
            {clickedItem[0] == 3 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell onClick={() => sortableBtnHandler(4)}>
            Role
            {clickedItem[0] == 4 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell onClick={() => sortableBtnHandler(5)}>
            Created AT
            {clickedItem[0] == 5 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell onClick={() => sortableBtnHandler(6)}>
            Updated AT
            {clickedItem[0] == 6 && <SortableButton payload={clickedItem} />}
          </Table.HeadCell>
          <Table.HeadCell>
            Operation
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {Array.isArray(users) &&
            users.map((user) => (
              <Table.Row
                key={user.id}
                className="bg-slate-200 text-black hover:bg-blue-600 hover:text-white dark:border-gray-700 dark:bg-gray-800"
              >
                {profileImage && (
                  <div>
                    <img src={profileImage} alt="" />
                  </div>
                )}

                <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                  {user.id}
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{convertDate(user.created_at)}</Table.Cell>
                <Table.Cell>{convertDate(user.updated_at)}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-4 text-xl cursor-pointer">
                    <FaRegEdit onClick={() => handleEdit(user.id)} />{" "}
                    <BsFillTrash3Fill onClick={() => deleteHandler(user.id)} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          {showModal && (
            <EditModal
              showModal={showModal}
              setShowModal={setShowModal}
              userId={userId}
            />
          )}
        </Table.Body>
      </Table>
    </>
  );
}
