import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/profile/userProfile";
import { useNavigate } from "react-router-dom";
export const ObtainedGoodCard = ({ good }) => {
  const [creator, setCreator] = useState();
  const nav = useNavigate();
  async function handleCreatorName() {
    let response = await fetchProfile(good.donor);
    setCreator(response?.name || "not available");
  }
  useEffect(() => {
    handleCreatorName();
  }, []);

  return (
    <div className="bg-white w-[430px]  text-white dark:bg-black  shadow-black  mt-3 shadow-lg rounded-lg overflow-hidden">
      <img
        src={good.image}
        alt={good.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{good.name}</h2>
        <div className="flex justify-between">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Donor {creator}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Brand {good.brand}
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Quantity </h3>
            <p className="text-gray-700 dark:text-gray-300">{good.quantity}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Requests</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {good.requests || 0}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-lg mb-4 overflow-hidden">
          <div
            className=" border-2 border-red-500  bg-red-500 h-full"
            style={{
              width: `${(1 / Number(good?.requests || 1)) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              nav("/obtained-goods-page", { state: good });
            }}
            className="bg-white text-black font-bold px-4 py-2 rounded-md mr-2 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out"
          >
            Request Now
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:text-black hover:bg-white transition duration-300 ease-in-out">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
