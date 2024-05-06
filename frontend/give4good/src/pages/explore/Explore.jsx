// TODO: handle type
import React, { useEffect, useState } from "react";
import {
  getCampaignFromDBByLocation,
  getCampaignFromDBBySearch,
  getCampaignFromDBByTypes,
  getCampaignsFromDbbyCategory,
  getLocation,
} from "../../services/campaign/campaign";
import { FiTriangle } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
import { FaChildren } from "react-icons/fa6";
import { MdElderly } from "react-icons/md";
import { SiTrustpilot } from "react-icons/si";
import { FaPersonCane } from "react-icons/fa6";
import { MdCastForEducation } from "react-icons/md";
import { IoWoman } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { FaBriefcaseMedical } from "react-icons/fa";
import { SiHomebridge } from "react-icons/si";
import { VscServerEnvironment } from "react-icons/vsc";
import { RiMentalHealthFill } from "react-icons/ri";
import { TbGenderFemale } from "react-icons/tb";
import { FaTransgender } from "react-icons/fa";
import { BsMotherboardFill } from "react-icons/bs";
import { FundRaisingCard } from "../../components/FundRaiserCard";
export default function Explore() {
  const [location, setlocation] = useState();
  const [types, setTypes] = useState();
  const [search, setsearch] = useState();
  let [data, setdata] = useState([]);
  console.log(location);
  let icons = [
    <FiTriangle />,
    <SiAnimalplanet />,
    <FaChildren />,
    <MdElderly />,
    <SiTrustpilot />,
    <FaPersonCane />,
    <FaBowlFood />,
    <MdCastForEducation />,
    <IoWoman />,
    <FaTransgender />,
    <FaBriefcaseMedical />,
    <SiHomebridge />,
    <VscServerEnvironment />,
    <RiMentalHealthFill />,
    <TbGenderFemale />,
    <BsMotherboardFill />,
  ];
  let category = [
    { cate: "Animal", icons: icons[0] },
    { cate: "Children", icons: icons[1] },
    { cate: "Elderly", icons: icons[2] },
    { cate: "Faith", icons: icons[3] },
    { cate: "Disabled", icons: icons[4] },
    { cate: "Hunger", icons: icons[5] },
    { cate: "Education", icons: icons[6] },
    { cate: "Woman", icons: icons[7] },
    { cate: "T gender", icons: icons[8] },
    { cate: "Medical", icons: icons[9] },
    { cate: "Disaster", icons: icons[10] },
    { cate: "Enviroment", icons: icons[11] },
    { cate: "Mental H", icons: icons[12] },
    { cate: "LGBTQ+", icons: icons[13] },
    { cate: "Other", icons: icons[14] },
  ];
  async function funcToHandleLoc() {
    let response = await getLocation();
    console.log(response);
    setlocation(response);
  }
  async function allcampaigns() {
    let response = await getCampaignFromDBBySearch("");
    console.log(response, "data");
    setdata(response);
  }
  useEffect(() => {
    funcToHandleLoc();
    allcampaigns();
  }, []);
  async function handleCategory(category) {
    let response = await getCampaignsFromDbbyCategory(category);
    setdata(response);
  }
  async function handleSearch() {
    console.log(search);
    let response = await getCampaignFromDBBySearch(search);
    setdata(response);
  }

  async function handleTypes() {
    const response = await getCampaignFromDBByTypes(types);
    if (response.success) setdata(response.campaign);
    else {
    } // TODO: handletaost
  }
  async function handleLocation(loc) {
    const response = await getCampaignFromDBByLocation(loc);
    setdata(response);
  }
  return (
    <div className="w-[100%] h-[100%] overflow-x-hidden bg-slate-200  ">
      <div className=" ">
        <div className="right">
          <div className="w-[80%] h-[70%] relative    ">
            <img
              src="https://img.freepik.com/premium-photo/collage-photos-from-poor-family-india_915071-1947.jpg"
              alt="people"
              className="  h-[90%] w-[90%] relative  left-8 shadow-black shadow-xl"
            />

            <div className="h-[30%] w-[50%] absolute top-[33%] left-[23%] backdrop-blur-sm shadow-black shadow-md flex gap-8 flex-col items-center justify-center text-white font-extrabold text-5xl">
              Explore Campaigns
              <div className=" text-sm flex gap-9 ">
                <div>Donations</div>
                <div>Donors</div>
                <div>Total Cappaigns</div>
              </div>
            </div>
          </div>
          <div className="relative left-16 mt-14 flex flex-wrap w-[80%] gap-14 ">
            {data &&
              data.length > 0 &&
              data.map((campaign, index) => (
                <FundRaisingCard key={index} campaign={campaign} />
              ))}
          </div>
        </div>
        <div className="left   bottom-[89%] fixed  left-[78%] shadow-black shadow-xl bg-slate-500 ">
          <div className="flex flex-col absolute ">
            <div className="border-red-400">
              <FaSearch
                onClick={() => handleSearch(search)}
                className="relative top-5 right-7 cursor-pointer  w-16"
              />
              <input
                type="text"
                className=" border-b-2 w-56 inset-y-0  relative  left-5  text-black    focus:outline-none  "
                placeholder="Search By Campaign / Tags  "
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <select
              name=""
              id=""
              className="shadow-black w-60 shadow-sm shadow-inner relative top-3"
              value={types}
              onChange={(e) => {
                setTypes(e.target.value);
                handleTypes();
              }}
            >
              <option className="font-bold" value="Choose location">
                All Types
              </option>
              <option value="Active">Active</option>
              <option value="Urgent">Urgent</option>
              <option value="Closed">Closed</option>
              <option value="Newly Launched">Newly Launched</option>
              <option value="Most Raised">Most Raised</option>
            </select>
            <select
              name="location"
              id="location"
              className="shadow-black shadow-sm shadow-inner relative top-6"
              onChange={(e) => handleLocation(e.target.value)}
            >
              <option value="Select Location">Select Location</option>
              {location?.length > 0 &&
                location.map((locs, index) => {
                  return (
                    <option key={index} value={locs}>
                      {locs}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-1  flex-col flex-wrap h-[450px] w-[200px] fixed left-[78%] bottom-[5px]">
        {category.map((cate) => {
          return (
            <div
              onClick={() => handleCategory(cate.cate)}
              className=" shadow-black cursor-pointer shadow-sm flex-col h-[80px] w-[80px] text-white font-bold  bg-slate-400 flex items-center justify-center"
            >
              {cate.icons}
              {cate.cate}
            </div>
          );
        })}
        <div
          onClick={() => handleCategory("")}
          className="w-[249px] cursor-pointer shadow-black shadow-sm  text-white font-bold   bg-slate-400 relative right-[84%] flex items-center justify-center"
        >
          All
        </div>
      </div>
    </div>
  );
}

// TODO: all type ,location
