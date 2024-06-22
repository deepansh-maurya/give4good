import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { requestForGood } from "../services/goods/donateGood";
import { Toaster, toast } from "react-hot-toast";
function ProductPage() {
  const state = useLocation();
  const [good, setgood] = useState(state.state);
  const [requestData, setRequestData] = useState({
    proposel: "",
    image: "",
    video: "",
    contact: "",
  });

  console.log(good);

  async function handleRequest() {
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("donorID", good.donor);
    formData.append("goodid", good._id);
    console.log(good._id);
    let response = await requestForGood(formData);
    if (response) {
      toast.success("You request got submited");
      setRequestData({
        proposel: "",
        image: "",
        video: "",
        contact: "",
      });
    } else {
      toast.error("Request failed, try again");
      setRequestData({
        proposel: "",
        image: "",
        video: "",
        contact: "",
      });
    }
    console.log(response);
  }
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
          <div className="mb-4">
            <button className=" bg-blue-400 w-2/3 font-bold rounded-full relative left-16   text-white px-4 py-2  mr-2">
              Share
            </button>
          </div>
          <div className="mb-4 relative flex  gap-7    mx-auto">
            <div>Request For Product</div>
          </div>
          <div className="mb-4">
            <textarea
              name=""
              id=""
              placeholder="Your Proposel"
              value={requestData.proposel}
              onChange={(e) =>
                setRequestData({ ...requestData, proposel: e.target.value })
              }
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
              cols={47}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor=" ">Upload Image</label>
            <input
              type="file"
              placeholder="Your name"
              onChange={(e) =>
                setRequestData({ ...requestData, image: e.target.files[0] })
              }
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Upload Video</label>
            <input
              type="file"
              placeholder="Your email"
              onChange={(e) =>
                setRequestData({ ...requestData, video: e.target.files[0] })
              }
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Contact"
              value={requestData.contact}
              onChange={(e) =>
                setRequestData({ ...requestData, contact: e.target.value })
              }
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <button
              onClick={handleRequest}
              className="bg-red-500 font-bold hover:bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Request Now
            </button>
            <div className=" underline text-blue-600">reset</div>
          </div>

          {""}
        </div>
        {good.status == "donated" ? (
          <div class=" border-white text-4xl fixed w-2/6 h-[500px] p-8 right-8  top-[150px] backdrop-blur bg-black bg-opacity-10 flex justify-center items-center text-red-500 font-extrabold ">
            Product is donated
          </div>
        ) : null}
      </div>
      <Toaster></Toaster>
    </div>
  );
}

export default ProductPage;
