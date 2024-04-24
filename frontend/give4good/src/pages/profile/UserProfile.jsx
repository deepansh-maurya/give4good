import React, { useEffect } from "react";
import DonateCard from "../../components/DonateCard";
import { userProfile } from "../../services/profile/userProfile";

export default function UserProfile() {
  async function handleAsync() {
    let respones = await userProfile();
    if (respones) {
    } // TODO: do some stuff
    else {
    } // TODO: do some stuff
  }
  useEffect(() => {
    handleAsync();
  });
  return (
    <div className="flex justify-between">
      <div className=" mt-16 flex justify-between w-[100%]">
        <div className="flex flex-col bg-black text-white fixed h-[100%]  text-2xl font-semibold w-1/5 p-4">
          <div>◦ Profile</div>
          <div>◦ My Campaigns</div>
          <div>◦ Donation History</div>
          <div>◦ Donated Goods</div>
          <div>◦ Obtained Goods</div>
          <div>◦ Delete Account</div>
        </div>
        <div className="flex  ml-72 flex-col w-3/4 p-4">
          <div className="flex justify-between mb-4">
            <div className="text-2xl font-bold">My Profile</div>
            <div className="text-2xl font-bold">My Impact</div>
          </div>
          <hr />
          <div className="flex">
            <div className="w-1/2 p-4 bg-white rounded-lg mr-4">
              <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-32 rounded-lg"></div>
            </div>
            <div className="w-1/2 p-4 bg-white rounded-lg">
              <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-32 rounded-lg"></div>
            </div>
          </div>
          <hr className="mt-10" />
          <div className="mt-16">
            <DonateCard />
          </div>
        </div>
      </div>
    </div>
  );
}
