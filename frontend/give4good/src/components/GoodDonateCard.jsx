import React from "react";
// TODO: avialability
// TODO: chance of getting the item
export const GoodDonateCard = ({ goods }) => {
  return (
    <div className="bg-white w-[430px] dark:bg-black  shadow-black  mt-3 shadow-lg rounded-lg overflow-hidden">
      <img
        src={goods.image}
        alt={goods.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{goods.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Donor {goods.donor}
        </p>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Raised</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {goods.totalamount}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Donors</h3>
            <p className="text-gray-700 dark:text-gray-300">{goods.requests}</p>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-lg mb-4 overflow-hidden">
          <div
            className="bg-blue-500 dark:bg-blue-400 h-full"
            style={{
              width: `${(goods.totalRaised / goods.targetAmount) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
            Request Now
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
