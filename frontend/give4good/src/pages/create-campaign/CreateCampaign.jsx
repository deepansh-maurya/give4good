import React, { useState } from "react";
import KYCform from "../../components/KYCform";
import CampaignForm from "../../components/CampaignForm";

const CreateCampaign = () => {
  const [Campaign, setsampaign] = useState(false);
  const [titlecolor, settitlecolor] = useState(false);
  const [id, setid] = useState();
  return (
    <>
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
              id={id}
              setid={setid}
            />
          ) : (
            <CampaignForm id={id} setid={setid} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCampaign;
