import React, { useState, useEffect } from "react";
import { updateEntry, readEntry } from "../../repositories/crud";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usersEndpoint } from "../../repositories/apiEndPoints";

export default function PassWordModal({ showModal, setShowModal, userID }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    try {
      if (userID) {
        readEntry(`${usersEndpoint}/${userID}`).then((res) => {
          res.json().then((data) => {
            setUser(data.resdata[0]);
          });
        });
      }
    } catch (err) {}
  }, [userID]);

  function validation() {
    if (password.length >= 6) {
      if (password == confirmPassword) {
        return true;
      } else {
        toast.error("Passwords do not match", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Password must be at least 6 characters", {
        position: "top-center",
      });
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      const newPassword = {
        columns: "id=$id, password=$password",
        data: {
          $id: user.id,
          $password: password,
        },
      };
      if (validation()) {
        updateEntry(newPassword, `${usersEndpoint}/${user.id}`).then(
          (res) => {
            if (res.ok) {
              toast.success("Password changed successfully", {
                position: "top-center",
              });
              setShowModal(false);
            } else {
              toast.error("Password change unsuccessful", {
                position: "top-center",
              });
            }
          }
        );
      }
    } catch (err) {}
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-semibold p-2 ml-[6rem]"></h3>
              <button
                className="text-black opacity-50 hover:opacity-100 text-2xl font-semibold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div>
              <form
                className="flex flex-col gap-4 justify-center items-center"
                onSubmit={handleSubmit}
              >
                <h2 className="text-black">
                  Changing password for user: {user.username}
                </h2>
                <label className="text-xl font-semibold text-black">
                  New Password
                </label>
                <input
                  className="border-2 border-slate-300 rounded-md p-2 text-black"
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="text-xl font-semibold text-black">
                  Confirm New Password
                </label>
                <input
                  className="border-2 border-slate-300 rounded-md p-2 text-black"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="bg-blue-600 text-white font-semibold rounded-md p-2 mt-4 mb-4">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      )}
    </>
  );
}
