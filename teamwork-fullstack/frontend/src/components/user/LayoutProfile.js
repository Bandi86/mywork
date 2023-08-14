import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { userContext } from "../../contexts/userContext";
import UserAvatar from "./UserAvatar";
import PassWordModal from "../admin/PassWordModal";

export default function LayoutProfile() {
  const { user } = useContext(userContext);
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal(true);
  }

  return (
    <div className="flex flex-row mt-10">
      <div className="w-full lg:w-1/4 bg-main">
        <div className="flex flex-col p-10 h-screen items-center gap-2">
          <UserAvatar />

          <div className="mt-6 mb-4">
            <button className="Button">
              <Link to={`/profile/${user.localId}/settings`}>Settings</Link>
            </button>
          </div>
          <div className="mb-4">
            <button className="Button" onClick={handleClick}>
              Password
            </button>
          </div>
          <div className="mb-4">
            <button className="Button">
              <Link to={`/profile/${user.localId}/orders`}>Orders</Link>
            </button>
            {showModal && (
              <PassWordModal
                showModal={showModal}
                setShowModal={setShowModal}
                userID={user.localId}
              />
            )}
          </div>
          {/* További navigációs elemek... */}
        </div>
      </div>
      <div className="min-h-min flex flex-col items-center w-3/4 mt-10">
        <Outlet />
      </div>
    </div>
  );
}
