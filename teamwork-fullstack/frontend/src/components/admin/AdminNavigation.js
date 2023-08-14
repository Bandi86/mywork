import { BiHomeAlt } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import PassWordModal from "./PassWordModal";
import { useState, useContext } from "react";
import { userContext } from "../../contexts/userContext";

export default function AdminNav() {
  const logoutHandler = useLogout();
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(userContext);

  function passwordHandler() {
    setShowModal(true);
  }

  return (
    <div className="min-h-screen w-[16rem] bg-blue-600 text-white font-bold">
      <div className="flex flex-col items-left p-4 gap-6 justify-between ml-4 mr-4">
        {user.username ? <p>Hello, {user.username}</p> : null}

        <NavLink to="/admin/dashboard">
          <p className="flex flex-row gap-2">
            <BiHomeAlt className="text-2xl" />
            Dashboard
          </p>
        </NavLink>
        <NavLink to="/admin/users">
          <p className="flex flex-row gap-2">
            <HiUserGroup className="text-2xl" />
            Customers
          </p>
        </NavLink>

        <p
          className="flex flex-row gap-2 cursor-pointer"
          onClick={() => passwordHandler()}
        >
          <RiLockPasswordLine className="text-2xl" />
          Password
        </p>
        {showModal && (
          <PassWordModal showModal={showModal} setShowModal={setShowModal} userID={user.localId} />
        )}
        <p
          className="flex flex-row gap-2 cursor-pointer"
          onClick={() => logoutHandler()}
        >
          <MdLogout className="text-2xl" />
          Logout
        </p>
      </div>
    </div>
  );
}
