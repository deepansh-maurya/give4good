import React, { useState } from "react";
import KYCform from "../../components/KYCform";
import CampaignForm from "../../components/CampaignForm";

const CreateCampaign = () => {
  const [Campaign, setsampaign] = useState(false);
  const [titlecolor, settitlecolor] = useState(false);
  return (
    <>
      <div className="min-h-screen flex justify-center bg-gray-200 text-black">
        <div className="flex fixed bg-gray-200  flex-col items-center justify-center mb-8">
          <div className="flex items-center justify-center w-[100%] mb-8 mt-16">
            <div
              onClick={() => {
                setsampaign(false);
                settitlecolor(false);
              }}
              className={`w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center`}
            ></div>
            <div className="h-2  bg-orange-500 w-72 "></div>
            <div
              className={`h-2 ${
                Campaign == false ? "bg-black" : "bg-orange-500"
              }  w-72`}
            ></div>

            <div
              onClick={() => {
                setsampaign(true);
                settitlecolor(true);
              }}
              className={`w-12 h-12 ${
                Campaign == false ? "bg-black" : "bg-orange-500"
              }  rounded-full flex items-center justify-center`}
            ></div>
          </div>
          <div className="flex mt-[-3%]">
            <h1 className="text-2xl text-orange-800 font-extrabold relative left-[-160%] ">
              Kyc
            </h1>
            <h1
              className={`text-2xl font-extrabold ${
                titlecolor == true ? "text-orange-800" : "text-black"
              } relative right-[-180%] `}
            >
              Campaign
            </h1>
          </div>
        </div>
        {Campaign == false ? (
          <KYCform setsampaign={setsampaign} settitlecolor={settitlecolor} />
        ) : (
          <CampaignForm />
        )}
      </div>
    </>
  );
};

export default CreateCampaign;
