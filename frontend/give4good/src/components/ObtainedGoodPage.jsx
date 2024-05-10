import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRequestStatus, requestForGood } from "../services/goods/donateGood";
import { Toaster, toast } from "react-hot-toast";
function ObtainedGoodPage() {
  const state = useLocation();
  const [good, setgood] = useState(state.state);
  console.log(good);
  const [status, setStatus] = useState();
  async function handleStatus() {
    let response = await getRequestStatus(good._id);
    console.log(response);
    console.log(response.status);
    setStatus(response.status);
  }
  console.log(status);
  useEffect(() => {
    handleStatus();
  }, []);
  return (
    <div className="flex justify-center w-full bg-gray-900 overflow-hidden">
      <div className="flex justify-center w-[90%] relative top-14 items-start bg-gray-900 text-white min-h-screen">
        {/* { lfet side} */}
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
        <div className="w-2/6 p-8 fixed right-14">
          <h1>Status Of Your Request</h1>
          {status == "accepted" ? (
            <div>
              <div>Request Accpted 😁</div>
              <button>Ship the product </button>
            </div>
          ) : status == "rejected" ? (
            <div>Request Rejected 😑</div>
          ) : (
            <div>Pending....... 😥</div>
          )}
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
}

export default ObtainedGoodPage;
