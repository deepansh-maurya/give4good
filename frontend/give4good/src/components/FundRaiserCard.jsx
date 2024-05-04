import React, { useEffect, useState } from "react";
import { getProfile } from "../services/auth/auth";
export const FundRaisingCard = ({ campaign }) => {
  console.log(campaign);
  let beneficieryid = campaign.benefciery;
  let creatorid = campaign.creator;
  const [creator, setcreator] = useState();
  const [benefciery, setbeneficiery] = useState();
  async function handleProfile() {
    if (beneficieryid != creatorid) {
      let res = await getProfile(beneficieryid, false, true);
      setbeneficiery(res);
      let res2 = await getProfile(creatorid, true, false);
      setcreator(res2);
    } else {
      let res = await getProfile(creator, true, false);
      setcreator(res);
      setbeneficiery(res);
    }
  }
  useEffect(() => {
    handleProfile();
  }, []);
  return (
    <div className="bg-white w-[430px] dark:bg-black  text-white shadow-black  mt-3 shadow-lg rounded-lg overflow-hidden">
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
        <div className="flex gap-[164px]">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            By {creator == "" ? "Not available" : creator}
          </p>
          <p className="text-gray-600  dark:text-gray-400 mb-2">
            For {benefciery == "" ? "Not available" : benefciery}
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Raised</h3>
            <p className="text-gray-700 dark:text-gray-300">
              ₹{campaign.progress || "0"}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Total Donors</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {campaign.donors.length}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-lg mb-4 overflow-hidden">
          <div
            className="bg-red-500  h-full"
            style={{
              width: `${(campaign.progress / campaign.goal) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          <button className="bg-white text-black font-bold px-4 py-2 rounded-md mr-2 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out">
            Donate Now
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:text-black hover:bg-white transition duration-300 ease-in-out ">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
