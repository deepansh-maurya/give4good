import React from "react";
export const FundRaisingCard = ({ campaign }) => {
  return (
    <div className="bg-white w-[430px] dark:bg-black  shadow-black  mt-3 shadow-lg rounded-lg overflow-hidden">
      {/* Campaign Image */}
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-40 object-cover"
      />

      {/* Campaign Details */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
        {/* Creator */}
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          By {campaign.creator}
        </p>
        {/* Fundraising Stats */}
        <div className="flex justify-between mb-4">
          {/* Total Raised */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Raised</h3>
            <p className="text-gray-700 dark:text-gray-300">
              ${campaign.totalRaised}
            </p>
          </div>
          {/* Total Donors */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Donors</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {campaign.totalDonors}
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-lg mb-4 overflow-hidden">
          <div
            className="bg-blue-500 dark:bg-blue-400 h-full"
            style={{
              width: `${(campaign.totalRaised / campaign.targetAmount) * 100}%`,
            }}
          ></div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between">
          {/* Donate Button */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
            Donate Now
          </button>
          {/* Share Button */}
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
