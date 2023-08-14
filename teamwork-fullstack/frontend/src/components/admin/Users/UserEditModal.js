import React from "react";
import PassWordModal from "../PassWordModal";

export default function EditUser({ userId, showModal, setShowModal }) {
  return (
    <PassWordModal
      showModal={showModal}
      setShowModal={setShowModal}
      userID={userId}
    />
  );
}
