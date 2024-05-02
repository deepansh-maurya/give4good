import React, { useEffect, useState } from "react";
import DonateCard from "../../components/DonateCard";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import ChangeCred from "../../components/ChangeCred";
import { userProfile } from "../../services/profile/userProfile";
import { useNavigate } from "react-router-dom";
import { FundRaisingCard } from "../../components/FundRaiserCard";
import { GoodDonateCard } from "../../components/GoodDonateCard";
export default function UserProfile() {
  const [profileData, setPRofileData] = useState();
  const [triggerChangeCrd, setTriggerChanegeCred] = useState(false);
  const [currentPage, setCurrentPAge] = useState("profile");
  const nav = useNavigate();
  let campaigns = [3, 4, 5, 6];
  const getPRofileDAta = async () => {
    const data = await userProfile();
    console.log(data);
    if (data.success) {
      setPRofileData(data.user);
    } else {
    }
  };

  console.log(profileData);

  useEffect(() => {
    getPRofileDAta();
  }, []);

  return (
    <div className="flex justify-between overflow-y-hidden overflow-x-hidden">
      <div className=" mt-16 flex justify-between w-[100%]">
        <div className="flex flex-col   bg-black text-white shadow-black shadow-md fixed h-[100%]  text-2xl font-semibold w-1/5 p-4">
          <div
            onClick={() => {
              nav("/user-profile/profile");
              setCurrentPAge("profile");
            }}
            className="cursor-pointer"
          >
            ◦ Profile
          </div>
          <div
            onClick={() => {
              nav("/user-profile/profile/my-campaigns");
              setCurrentPAge("mycampaigns");
            }}
            className="cursor-pointer"
          >
            ◦ My Campaigns
          </div>
          <div className="cursor-pointer">◦ Donation History</div>
          <div
            onClick={() => {
              nav("/user-profile/profile/donated-goods");
              setCurrentPAge("donatedgoods");
            }}
            className="cursor-pointer"
          >
            ◦ Donated Goods
          </div>
          <div className="cursor-pointer">◦ Obtained Goods</div>
          <div
            onClick={() => {
              nav("/user-profile/profile/delete-account");
              setCurrentPAge("deleteaccount");
            }}
            className="cursor-pointer"
          >
            ◦ Delete Account
          </div>
        </div>
        {currentPage == "profile" ? (
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
        ) : (
          <div></div>
        )}
        {currentPage == "mycampaigns" ? (
          <div className="w-4/5 relative left-[135px]">
            <div className="bg-white z-10 fixed  w-4/5 h-12 shadow-black shadow-md">
              <h1 className="text-3xl font-bold shadow-sm fixed  bg-white right-[410px]">
                My Campaigns
              </h1>
            </div>

            <div className=" flex  mt-14 flex-wrap gap-12 justify-center ">
              {campaigns.map((campaign, index) => (
                <FundRaisingCard key={index} campaign={campaign} />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {currentPage == "donatedgoods" ? (
          <div className="w-4/5">
            <div className="bg-white z-10 fixed  w-4/5 h-12 shadow-black shadow-md">
              <h1 className="text-3xl font-bold shadow-sm fixed  bg-white right-[410px]">
                Donated Goods
              </h1>
            </div>
            <div className=" flex  mt-14 flex-wrap gap-12 justify-center ">
              {campaigns.map((campaign, index) => (
                <GoodDonateCard key={index} goods={campaign} />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {}
        {}
        {currentPage == "deleteaccount" ? (
          <div className="flex w-4/5 justify-center items-center bg-slate-400 relative left-1 shadow-lg shadow-black  h-[580px] ">
            <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-md shadow-black shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
                Request Delete
              </h2>
              <p className="mb-4 text-center">
                To delete your account, please type{" "}
                <strong className="text-red-500">Password</strong> below:
              </p>
              {false ? (
                <input
                  type="text"
                  // value={confirmation}
                  readOnly
                  placeholder="Type password to Authenticate"
                  className="w-full border rounded py-2 px-3 mb-4 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <input
                  type="text"
                  // value={confirmation}
                  onChange={(e) => setconfirmation(e.target.value)}
                  placeholder="Type password to Authenticate"
                  className="w-full border rounded py-2 px-3 mb-4 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
              )}
              <button
                // onClick={handleDeleteAccount}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
              >
                Request Delete
              </button>
            </div>
          </div>
        ) : null}
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
