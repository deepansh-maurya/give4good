import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { changePassword, getCode } from "../services/auth/auth";
import { ToastContainer, toast } from "react-toastify";
const ChangePassword = ({
  toChangePassword,
  setTOchangepassword,
  setTriggerChanegeCred,
}) => {
  const [code, setCode] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [codefromServer, setCodeFromServer] = useState();
  const toCheckCode = async () => {
    const toGetCode = await getCode();
    if (toGetCode.success) {
      toast.success(`${toGetCode.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    } else {
      toast.error(`${toGetCode.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
      setTOchangepassword(false);
    }
    setCodeFromServer(toGetCode.codetoverify);
  };

  useEffect(() => {
    toCheckCode();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (oldPassword == "" || newPassword == "") {
      toast.warning(`WRONG Credentials`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
      return;
    }
    if (codefromServer != code) {
      toast.warning(`WRONG CODE< TRY AGAIN`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
      setTimeout(() => {
        setTOchangepassword(false);
      }, 4000);
    }

    const response = await changePassword(oldPassword, newPassword);
    if (response.success) {
      toast.success(`${response.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
      setTimeout(() => {
        setTriggerChanegeCred(false);
      }, 2000);
    } else {
      toast.error(`${response.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    }
    setTimeout(() => {
      setTriggerChanegeCred(false);
    }, 2000);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="bg-white p-8 rounded-lg">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Change Password
            </h1>
            <MdClose
              className="relative top-[-10px] right-[-10px] cursor-pointer"
              onClick={() => {
                setTOchangepassword(false);
                setTriggerChanegeCred(false);
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="code" className="block mb-1">
                Enter Code
              </label>
              <input
                type="text"
                id="code"
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block mb-1">
                Enter Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-1">
                Enter New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default ChangePassword;
