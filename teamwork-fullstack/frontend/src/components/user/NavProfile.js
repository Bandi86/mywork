import { Dropdown, Avatar } from "flowbite-react";
import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../contexts/userContext";
import { FcRegisteredTrademark } from "react-icons/fc";
import { HiCog, HiLogout, HiViewGrid } from "react-icons/hi";
import { MdLogin } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export default function DropdownItemsWithIcon() {
  const { user, profileData, setUser, isLoggedIn } = useContext(userContext);

  const logoutHandler = useLogout();

  const [profileImage, setProfileImage] = useState("");

  const imageUrl = "http://localhost:8080/";

  useEffect(() => {
    try {
      if (profileData[0]?.imagePath) {
        setProfileImage(
          imageUrl + profileData[0].imagePath.replace(/\\/g, "/")
        );
      } else setProfileImage("");
    } catch (err) {}
  }, [user, profileData]);

  function session() {
    if (!isLoggedIn) {
      return (
        <>
          <NavLink to="/login">
            <Dropdown.Item icon={MdLogin}>Login</Dropdown.Item>
          </NavLink>
          <NavLink to="registration">
            <Dropdown.Item icon={FcRegisteredTrademark}>
              Registration
            </Dropdown.Item>
          </NavLink>
        </>
      );
    } else {
      return (
        <div className="flex flex-col items-center gap-1">
          <Dropdown.Header className="flex flex-col items-center gap-2">
            <span className="block text-sm text-center">
              Hello: {user?.username}
            </span>
          </Dropdown.Header>
          <NavLink to={`/profile/${user?.localId}/settings`}>
            <Dropdown.Item icon={HiViewGrid}>Profile</Dropdown.Item>
          </NavLink>
          {user?.role === "admin" ? (
            <NavLink to="/admin/dashboard">
              <Dropdown.Item icon={HiCog}>Admin</Dropdown.Item>
            </NavLink>
          ) : null}
          <Dropdown.Item icon={HiLogout} onClick={() => logoutHandler()}>
            Logout
          </Dropdown.Item>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4 md:text-3xl py-4">
      <Dropdown
        inline
        label={
          <>
            <Avatar alt="User settings" img={profileImage} color="bg-second" rounded className="md:mr-4" />
            {isLoggedIn && <span className="md:text-sm">{user?.username}</span>}
          </>
        }
      >
        {session()}
      </Dropdown>
    </div>
  );
}
