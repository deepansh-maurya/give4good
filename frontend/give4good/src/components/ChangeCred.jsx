import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { updateProfile } from "../services/profile/userProfile";
import ChangePassword from "./ChangePassword";
export default function ChangeCred({
  setTriggerChanegeCred,
  profileData,
  setPRofileData,
}) {
  const [tochangeCred, setTochangeCred] = useState(false);
  const [toChangePassword, setTOchangepassword] = useState(false);
  const [updateCred, setUPdateCred] = useState({
    name: profileData.name,
    username: profileData.username,
    email: profileData.email,
    address: profileData.address,
    document: profileData.document,
    profilePicture: profileData.profilePicture,
  });
  console.log(tochangeCred);
  function handlechange(e) {
    const { name, value } = e.target;
    setUPdateCred({ ...updateCred, [name]: value });
  }

  async function handleUpdateProfileChange(e) {
    e.preventDefault();
    let formdata = new FormData();
    console.log(formdata);
    Object.entries(updateCred).forEach((data) =>
      formdata.append(data[0], data[1])
    );
    const response = await updateProfile(formdata);
    console.log(response);
    if (response.success) {
      setPRofileData(response.updateduser);
      toast.success(`${response.message.toUpperCase()}`, {
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
      }, 1000);
    } else {
      toast.info(`${response.message.toUpperCase()}`, {
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
      }, 1000);
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <section className="bg-white p-8 rounded-lg">
          <form encType="multipart/form-data">
            <div className="flex">
              <h1 className="text-3xl font-bold mb-6 text-center">
                User Profile Credential
              </h1>
              <div className="relative top-[-42%] left-3">
                <MdClose
                  className=" cursor-pointer"
                  onClick={() => setTriggerChanegeCred(false)}
                />
              </div>
            </div>
            <main>
              <div className="flex items-center mb-4">
                {tochangeCred == true ? (
                  <input
                    type="file"
                    name="profilePicture"
                    className="border w-[80px] border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                      setUPdateCred({
                        ...updateCred,
                        profilePicture: e.target.files[0],
                      })
                    }
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      className="w-full h-full object-cover"
                      src={updateCred?.profilePicture}
                      alt="Profile"
                    />
                  </div>
                )}
                <div className=" relative left-12 flex flex-col">
                  <label htmlFor="fullName" className="mb-1">
                    Full Name
                  </label>
                  {tochangeCred == true ? (
                    <input
                      id="fullName"
                      name="name"
                      type="text"
                      value={updateCred.name}
                      onChange={handlechange}
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <input
                      id="fullName"
                      value={updateCred.name}
                      type="text"
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                      readOnly
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="username" className="w-32">
                  Username
                </label>
                {tochangeCred == true ? (
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={updateCred.username}
                    onChange={handlechange}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <input
                    id="fullName"
                    value={updateCred.username}
                    type="text"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                )}
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="email" className="w-32">
                  Email
                </label>
                {tochangeCred == true ? (
                  <input
                    id="email"
                    onChange={handlechange}
                    type="text"
                    name="email"
                    value={updateCred.email}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <input
                    id="fullName"
                    value={updateCred.email}
                    type="text"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                )}
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="document" className="w-32">
                  Document
                </label>
                {tochangeCred == true &&
                (profileData.document == null || profileData.document == "") ? (
                  <input
                    id="document"
                    type="file"
                    name="document"
                    onChange={(e) =>
                      setUPdateCred({
                        ...updateCred,
                        document: e.target.files[0],
                      })
                    }
                    className="border w-[207px] border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  />
                ) : profileData.document == null ? (
                  <div className="border border-gray-300 px-3 py-2 rounded-md flex-grow flex items-center justify-center">
                    <div className="text-gray-400 flex items-center gap-5">
                      <FaTimes className="text-red-600" /> Not Uploaded
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-300 px-3 py-2 rounded-md flex-grow flex items-center justify-center">
                    <div className="text-gray-400 flex items-center gap-5">
                      <FaCheck className=" text-green-600" /> Uploaded
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="address" className="w-32">
                  Address
                </label>
                {tochangeCred == true ? (
                  <input
                    id="address"
                    type="text"
                    value={updateCred.address}
                    onChange={handlechange}
                    name="address"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <input
                    id="fullName"
                    type="text"
                    value={updateCred.address}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                )}
              </div>
              {tochangeCred == true ? (
                <button
                  onClick={handleUpdateProfileChange}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
                >
                  Update cred
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTochangeCred(true);
                  }}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
                >
                  Change Cred
                </button>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTOchangepassword(true);
                }}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
              >
                Change Password
              </button>
            </main>
          </form>
        </section>
      </div>
      {toChangePassword == true ? (
        <ChangePassword
          toChangePassword={toChangePassword}
          setTOchangepassword={setTOchangepassword}
          setTriggerChanegeCred={setTriggerChanegeCred}
        />
      ) : null}

      <ToastContainer />
    </>
  );
}
