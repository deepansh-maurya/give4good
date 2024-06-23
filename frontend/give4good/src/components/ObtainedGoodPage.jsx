import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { userProfile } from "../services/profile/userProfile";
function ObtainedGoodPage() {
  const state = useLocation();
  const [good, setgood] = useState(state.state);
  const [status, setStatus] = useState();
  const [ship, setship] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    email: "",
    number: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  async function handleStatus() {
    console.log("Sdfsdfds");
    let response = await userProfile();
    console.log(response, "response");
    response.user.requestedgood.map((data) => {
      if (data.id == good._id) {
        setStatus(data);
      }
    });
  }
  console.log(status);
  useEffect(() => {
    handleStatus();
  }, []);

  async function shippingGoodHandler() {
    const response = await handleShippingGood();
  }
  return (
    <div className="flex justify-center w-full bg-gray-900 overflow-hidden">
      <div className="flex justify-center w-[90%] relative top-14 items-start bg-gray-900 text-white min-h-screen">
        <div className="w-4/6 p-8 relative right-48 ">
          <h1 className="text-2xl font-bold mb-4">{good.name}</h1>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-1/2 mr-4 bg-white rounded-full">
                <div
                  className="h-6 bg-red-500 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="w-1/2">
                <p>Chances of the needy to get the good</p>
              </div>
            </div>
            <p className="mb-4">{good.description}</p>
            <img
              src={good.image}
              alt="Product"
              className="w-full mb-4 rounded-lg"
            />
            <p>{good.resaonOfDonation} </p>
            <img src={good.video} className="w-full mb-4 rounded-lg"></img>
            <div className="border-t mb-16 flex flex-col gap-3 text-lg  border-gray-600 pt-4">
              <h2 className=" text-lg font-bold mb-2">Product Information</h2>
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 w-[100] rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Brand
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.brand || "not available"}
                </div>
              </div>
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Original Price
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.originalprice || "not avialable"}
                </div>
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Weight
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.weight || "not avialable"}
                </div>
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Dimension
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.dimension || "not available"}
                </div>
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Condtion
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.condition || "not available"}
                </div>
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Quantity
                </div>
                <div
                  className="h-6  flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.quantity || "not available"}
                </div>
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Bouught Date
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.boughtdate || "not avialable"}
                </div>
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Expiry Date
                </div>
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  {good.expirydate || "not avialable"}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-red-600 mb-12 text-white font-extrabold cursor-pointer flex justify-center items-center h-12 w-2/5 rounded-full">
            Report
          </div>
        </div>

        {/* Right Side */}
        {ship ? (
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <form
              className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address2"
                >
                  Address 2
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="number"
                >
                  Phone Number
                </label>
                <input
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="w-2/6 p-8 gap-4 h-[500px] justify-center items-center text-4xl font-serif bg-slate-800  font-bold flex flex-col fixed right-6 top-28">
            {status?.status == "accepted" ? (
              <div className="flex flex-col gap-7">
                <div>Request Accpted 😁</div>
                <span>
                  Contact of Donor <span>{status.contact}</span>
                </span>
                <div
                  onClick={() => setship(true)}
                  className="bg-green-800 flex justify-center items-center px-3 py-2 font-sans hover:bg-green-600 cursor-pointer rounded-full"
                >
                  Ship the product{" "}
                </div>
              </div>
            ) : status == "rejected" ? (
              <div>Request Rejected 😑</div>
            ) : (
              <div>Pending....... 😥</div>
            )}
          </div>
        )}
      </div>
      <Toaster></Toaster>
    </div>
  );
}

export default ObtainedGoodPage;
