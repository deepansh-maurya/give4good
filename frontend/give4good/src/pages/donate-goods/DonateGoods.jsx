import React, { useState, useEffect } from "react";
import { donateGoods } from "../../services/goods/donateGood";
import { userProfile } from "../../services/profile/userProfile";
import { ToastContainer, toast } from "react-toastify";
const categories = [
  "Select Category",
  "Apparel",
  "Educational",
  "Tools",
  "Home",
  "Appliances",
  "Seasonal",
  "Groceries",
  "Outdoor",
  "Culturel",
  "Personal",
  "Pet care",
  "Media",
  "Children",
  "Medical",
  "Other",
];
const conditions = [
  "Select Condition",
  "Brand new",
  "Like new",
  "Gently used",
  "Used",
  "Fair",
  "Needs repair",
  "Not working",
];
const DonateGoods = () => {
  const [isAllowedDonate, setISAllowedDonate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    boughtdate: "",
    expirydate: "",
    condition: "",
    quantity: "",
    city: "",
    image: "",
    video: "",
    brand: "",
    weight: "",
    dimensions: "",
    resaonOfDonation: "",
    category: categories[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getPRofileDAta = async () => {
    const data = await userProfile();
    const doc = data.user.document;
    console.log(data, doc);
    if (!doc) {
      toast.warn(`Upload Document, Before Donating, For Verification`, {
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
    } else {
      setISAllowedDonate(true);
      toast.success(`You are Verified, You can Donate`, {
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
  };

  useEffect(() => {
    getPRofileDAta();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SDF");
    console.log(isAllowedDonate);
    if (isAllowedDonate) {
      const donateData = new FormData();
      console.log(formData);
      Object.entries(formData).forEach(([key, value]) => {
        donateData.append(key, value);
      });
      const response = await donateGoods(donateData);
      if (response.success) {
        toast.success(`Thanks for donating! Your listing has been submitted`, {
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
        setTimeout(() => {
          setFormData({
            name: "",
            description: "",
            boughtdate: "",
            expirydate: "",
            condition: "",
            quantity: "",
            city: "",
            image: "",
            video: "",
            brand: "",
            weight: "",
            dimensions: "",
            resaonOfDonation: "",
            category: categories[0],
          });
        }, 2000);
      } else {
        toast.info(`${response.message}`, {
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
        setTimeout(() => {
          setFormData({
            name: "",
            description: "",
            boughtdate: "",
            expirydate: "",
            condition: "",
            quantity: "",
            city: "",
            image: "",
            video: "",
            brand: "",
            weight: "",
            dimensions: "",
            resaonOfDonation: "",
            category: categories[0],
          });
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen relative flex flex-col w-full justify-center overflow-y-hidden bg-gray-200 text-black">
        <div className="mt-32 w-full max-w-4xl mx-auto overflow-hidden">
          <h2 className="font-bold text-center h-[75px] flex justify-center items-center  text-5xl bg-gray-200 fixed w-full top-[60px] shadow-lg shadow-black right-[2px] z-10">
            Make an Impact by Donating Goods
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-lg cursor-pointer  mt-6 shadow-lg p-8 space-y-4"
          >
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="name" className="block mb-1 flex">
                  Name of Good <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="brand" className="block mb-1 flex">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="weight" className="block mb-1 flex">
                  Weight (in kg)
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="dimensions" className="block mb-1 flex">
                  Dimensions
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="reasonOfDonation" className="block mb-1 flex">
                Reason for Donation <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reasonOfDonation"
                name="resaonOfDonation"
                value={formData.resaonOfDonation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </div>
            <div>
              <label htmlFor="description" className="block mb-1 flex">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="boughtdate" className="block mb-1 flex">
                  Bought Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="boughtdate"
                  name="boughtdate"
                  value={formData.boughtdate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label htmlFor="expirydate" className="block mb-1">
                  Expiry Date (if applicable)
                </label>
                <input
                  type="date"
                  id="expirydate"
                  name="expirydate"
                  value={formData.expirydate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block mb-1 flex">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image" className="block mb-1 flex">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  setFormData({ ...formData, image: e.target.files[0] });
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="video" className="block mb-1 flex">
                Video <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="video"
                name="video"
                onChange={(e) => {
                  setFormData({ ...formData, video: e.target.files[0] });
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
                accept="video/*"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1 flex">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="condition" className="block mb-1 flex">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-1 flex">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded py-2 hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DonateGoods;
