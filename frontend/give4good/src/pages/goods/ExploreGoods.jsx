// TODO: revisit_for_most_Asked_and_least_asked;
import React, { useEffect, useState } from "react";
import { GiClothes } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdPersonalInjury } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { MdCameraOutdoor } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { FaBookMedical } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";
import { BsMotherboardFill } from "react-icons/bs";
import {
  getGoodsFromDBByLocation,
  getLocation,
  getProductByTypes,
  getProductsFromDBByCategory,
  getProductsFromDBBySeacrh,
} from "../../services/goods/donateGood";
import { GoodDonateCard } from "../../components/GoodDonateCard";
export default function Explore() {
  const [location, setlocation] = useState([]);
  const [search, setsearch] = useState();
  const [data, setdata] = useState();
  const [locvalue, setlocvalue] = useState();
  let icons = [
    <GiClothes />,
    <FaHome />,
    <MdLocalGroceryStore />,
    <MdPersonalInjury />,
    <FaBaby />,
    <MdCastForEducation />,
    <MdElectricBolt />,
    <MdCameraOutdoor />,
    <MdOutlinePets />,
    <FaBookMedical />,
    <FaTools />,
    <FaWind />,
    <MdAcUnit />,
    <BsMotherboardFill />,
  ];
  let category = [
    { cate: "Apparel", icons: icons[0] },
    { cate: "Home", icons: icons[1] },
    { cate: "Groceries", icons: icons[2] },
    { cate: "Personal", icons: icons[3] },
    { cate: "Children", icons: icons[4] },
    { cate: "Educational ", icons: icons[5] },
    { cate: "Appliances", icons: icons[6] },
    { cate: "Outdoor ", icons: icons[7] },
    { cate: "Pet", icons: icons[8] },
    { cate: "Medical", icons: icons[9] },
    { cate: "Tools ", icons: icons[10] },
    { cate: "Seasonal ", icons: icons[11] },
    { cate: "Cultural ", icons: icons[12] },
    { cate: "Media ", icons: icons[13] },
    { cate: "Other", icons: icons[14] },
  ];
  async function hamdleFirstOfData() {
    let response = await getProductsFromDBBySeacrh("");
    console.log(response);
    if (response) setdata(response);
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
  async function handleLocs() {
    let response = await getLocation("");
    console.log(response);
    if (response) setlocation(response);
  }
  useEffect(() => {
    hamdleFirstOfData();
  }, []);
  useEffect(() => {
    handleLocs();
  }, []);
  async function handleLocChangeFind() {
    let response = await getGoodsFromDBByLocation(locvalue);
    console.log(response);
    if (response) setdata(response);
  }
  useEffect(() => {
    handleLocChangeFind();
  }, [locvalue]);
  async function handleSeacrh(keyword) {
    let response = await getProductsFromDBBySeacrh(keyword);
    console.log(response);
    if (response) setdata(response);
  }

  async function handleCategory(category) {
    let response = await getProductsFromDBByCategory(category);
    setdata(response);
  }

  async function handleTypes(types) {
    const response = await getProductByTypes(types);
    setdata(response);
  }

  return (
    <div className="w-[100%] h-[100%] overflow-x-hidden  ">
      <div className=" ">
        <div className="right ">
          <div className="w-[80%] h-[70%] relative  ">
            <img
              src="https://img.freepik.com/premium-photo/collage-images-from-word-charity_915071-1948.jpg"
              alt="people"
              className="  h-[90%] w-[90%] relative  left-8 shadow-black shadow-xl"
            />

            <div className="h-[30%] w-[50%] absolute top-[33%] left-[23%] backdrop-blur-sm shadow-black shadow-md flex gap-8 flex-col items-center justify-center text-white font-extrabold text-5xl">
              Seek & Find Goods
              <div className=" text-sm flex gap-9 ">
                <div>Donations</div>
                <div>Donors</div>
                <div>Products Donated</div>
              </div>
            </div>
          </div>
          <div className="relative left-16 mt-14 flex flex-row flex-wrap w-[80%] gap-14 ">
            {data &&
              data.length > 0 &&
              data.map((good, index) => (
                <GoodDonateCard key={good._id} good={good} />
              ))}
          </div>
        </div>
        <div className="left   bottom-[89%] fixed  left-[78%] shadow-black shadow-xl ">
          <div className="flex flex-col absolute ">
            <div className="border-red-400">
              <FaSearch
                onClick={() => handleSeacrh(search)}
                className="relative top-5 right-7 cursor-pointer  w-16"
              />
              <input
                type="text"
                className=" border-b-2 w-56 inset-y-0  relative  left-5  text-black    focus:outline-none  "
                placeholder="Search By Products / Tags"
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <select
              onChange={(e) => {
                handleTypes(e.target.value);
              }}
              className="shadow-black w-60 shadow-sm shadow-inner relative top-3"
            >
              <option className="font-bold" value="All Types">
                All Types
              </option>
              <option value="Available">Available</option>
              <option value="Donated">Donated</option>
              <option value="Least Asked">Least Asked</option>
              <option value="Most Asked">Most Asked</option>
              <option value="Newly Added">Newly Added</option>
            </select>
            <select
              name="location"
              id="location"
              className="shadow-black shadow-sm shadow-inner relative top-6"
              onChange={(e) => setlocvalue(e.target.value)}
            >
              <option value="Choose location">Choose location</option>
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
        {category.map((cate, index) => {
          return (
            <div
              key={index}
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
