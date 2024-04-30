import React, { useEffect, useState } from "react";
import DonateCard from "../../components/DonateCard";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import ChangeCred from "../../components/ChangeCred";
import { userProfile } from "../../services/profile/userProfile";
export default function UserProfile() {
  const [profileData, setPRofileData] = useState();
  console.log(profileData);
  const [triggerChangeCrd, setTriggerChanegeCred] = useState(false);
  const getPRofileDAta = async () => {
    const data = await userProfile();
    if (data.success) {
      setPRofileData(data.user);
    } else {
    }
  };

  useEffect(() => {
    getPRofileDAta();
  }, []);

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
                  src={profileData?.profilePicture}
                  alt=""
                  className=" w-[40%] rounded-full"
                />
                <div className="flex flex-col">
                  <h1 className=" flex items-center gap-3 font-bold text-2xl">
                    {profileData?.username}
                    <MdOutlineSystemUpdateAlt
                      onClick={() => setTriggerChanegeCred(true)}
                      className=" cursor-pointer hover:text-blue-600 underline"
                    />
                  </h1>
                  <h2 className=" font-semibold text-slate-500">
                    {profileData?.email}
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
      {triggerChangeCrd == true ? (
        <ChangeCred
          setTriggerChanegeCred={setTriggerChanegeCred}
          profileData={profileData}
          setPRofileData={setPRofileData}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
