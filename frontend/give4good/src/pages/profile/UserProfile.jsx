import React, { useEffect, useState } from "react";
import DonateCard from "../../components/DonateCard";
import { userProfile } from "../../services/profile/userProfile";
import { useAuth } from "../../contexts/AuthContext";
export default function UserProfile() {
  const [userData, setUserdata] = useState();
  console.log(userData);
  const { isauth, setisauth } = useAuth();
  async function handleAsync() {
    let respones = await userProfile();

    console.log(respones);
    if (respones) {
      console.log("sdf");
      setisauth(true);
      setUserdata(respones);
    } else {
    } // TODO: do some stuff
  }
  useEffect(() => {
    handleAsync();
  });
  return (
    <div className="flex justify-between">
      <div className=" mt-16 flex justify-between w-[100%]">
        <div className="flex flex-col   bg-black text-white fixed h-[100%]  text-2xl font-semibold w-1/5 p-4">
          <div className="cursor-pointer">◦ Profile</div>
          <div className="cursor-pointer">◦ My Campaigns</div>
          <div className="cursor-pointer">◦ Donation History</div>
          <div className="cursor-pointer">◦ Donated Goods</div>
          <div className="cursor-pointer">◦ Obtained Goods</div>
          <div className="cursor-pointer">◦ Delete Account</div>
        </div>
        <div className="flex  ml-72 flex-col w-3/4 p-4">
          <div className="flex justify-between mb-4">
            <div className="text-2xl font-bold">My Profile</div>
            <div className="text-2xl font-bold">My Impact</div>
          </div>
          <hr />
          <div className="flex">
            <div className="w-1/2 p-4 bg-white rounded-lg mr-4">
              <div className=" flex gap-4 items-center justify-center h-32 rounded-lg mb-4">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className=" w-[40%] rounded-full"
                />
                <div className="flex flex-col">
                  <h1 className=" font-bold text-2xl">Deepansh</h1>
                  <h2 className=" font-semibold text-slate-500">
                    deepanshmaurya135@gmail.com
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-1/2 p-4 bg-white flex gap-1 rounded-lg">
              <div className="bg-gray-200  w-40 h-32 rounded-lg mb-4"></div>
              <div className="bg-gray-200 w-40 h-32 rounded-lg mb-4"></div>
              <div className="bg-gray-200 w-40 h-32 rounded-lg"></div>
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
