import React, { useState } from "react";
import KYCform from "../../components/KYCform";
import CampaignForm from "../../components/CampaignForm";
import { ToastContainer, toast } from "react-toastify";
import { userProfile } from "../../services/profile/userProfile";

const CreateCampaign = () => {
  const [Campaign, setsampaign] = useState(false);
  const [titlecolor, settitlecolor] = useState(false);
  const [typeOfCamp, setTypeOfCamp] = useState(null);
  async function checkAuthenicty() {
    const data = await userProfile();
    if (
      data.success &&
      data.user.document != "" &&
      data.user.document != undefined
    ) {
      setTypeOfCamp(1);
    } else {
      toast.warn("PLease complete your profle (upload document)", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    }
  }
  return (
    <>
      {typeOfCamp == null ? (
        <div className="bg-black text-white flex flex-col overflow-hidden justify-center relative  h-screen py-12 px-8">
          <h2 className="text-5xl font-bold mb-8 relative left-44">
            Make an Impact by Creating Campaigns
          </h2>
          <div className=" flex relative top-4 flex-col gap-8">
            <div
              onClick={async () => {
                await checkAuthenicty();
              }}
              className="bg-white rounded-lg text-black  w-2/4 h-2/5 shadow-md relative left-80  cursor-pointer p-6 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl  font-bold mb-4">For Myself</h3>
              <p className=" ">
                Create a campaign to support your personal goals or needs.
              </p>
            </div>
            <div
              onClick={() => {
                setTypeOfCamp(2);
              }}
              className="bg-white text-black h-2/5 rounded-lg w-2/4 shadow-md cursor-pointer relative left-80 p-6 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-bold mb-4">For Others</h3>
              <p className="">
                Create a campaign to support an individual or cause other than
                yourself.
              </p>
            </div>
            <div
              onClick={() => {
                setTypeOfCamp(3);
              }}
              className="bg-white text-black h-2/5 rounded-lg w-2/4 shadow-md relative cursor-pointer left-80 p-6 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-bold mb-4">For Society</h3>
              <p className="">
                Create a campaign to address larger societal issues and make a
                collective impact.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {typeOfCamp == 2 ? (
        <div className="min-h-screen flex justify-center  text-black ">
          <div className="flex fixed w-[100%] h-[150px]  bg-slate-200 top-[-18px]  z-10  shadow-md shadow-slate-500 flex-col items-center justify-center  ">
            <div className="flex items-center justify-center w-[100%] mb-8 mt-16">
              <div
                onClick={() => {
                  setsampaign(false);
                  settitlecolor(false);
                }}
                className={`w-9 shadow-lg shadow-black   h-9 bg-orange-500 rounded-full flex items-center justify-center`}
              ></div>
              <div className="h-2  shadow-lg shadow-black  bg-orange-500 w-72 "></div>
              <div
                className={`h-2 shadow-lg shadow-black ${
                  Campaign == false ? "bg-black" : "bg-orange-500"
                }  w-72 z-10`}
              ></div>

              <div
                onClick={() => {
                  setsampaign(true);
                  settitlecolor(true);
                }}
                className={`w-9  h-9 shadow-lg shadow-black ${
                  Campaign == false ? "bg-black" : "bg-orange-500"
                }  rounded-full flex items-center justify-center`}
              ></div>
            </div>
            <div className="flex mt-[-3%]">
              <h1 className="text-2xl z-10 text-orange-800 font-extrabold relative top-2 left-[-157%] ">
                Kyc
              </h1>
              <h1
                className={`text-2xl top-2 font-extrabold z-10 ${
                  titlecolor == true ? "text-orange-800" : "text-black"
                } relative right-[-180%] `}
              >
                Campaign
              </h1>
            </div>
          </div>
          <div className="w-[100%] flex justify-center absolute h-max ">
            {Campaign == false ? (
              <KYCform
                setsampaign={setsampaign}
                settitlecolor={settitlecolor}
              />
            ) : (
              <CampaignForm />
            )}
          </div>
        </div>
      ) : null}
      {typeOfCamp == 1 ? (
        <div className="min-h-screen flex  flex-col justify-center relative  overflow-y-hidden   text-black ">
          <h1 className="top-16 text-4xl fixed  text-center h-[70px] shadow-lg shadow-black  z-50 font-bold w-screen">
            Empower Your Journey: Create a Personal Campaign
          </h1>
          <div className=" ">
            <CampaignForm />
          </div>
        </div>
      ) : null}
      {typeOfCamp == 3 ? <div>under construction</div> : null}
      <ToastContainer></ToastContainer>
    </>
  );
};

export default CreateCampaign;
