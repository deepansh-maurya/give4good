import React, { useState } from "react";
import { donateGoods } from "../../services/goods/donateGood";
import { useNavigate } from "react-router-dom";
const categories = ["Category 1", "Category 2", "Category 3"];

const DonateGoods = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    boughtdate: "",
    expirydate: "",
    condition: "",
    quantity: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await donateGoods(formData);
    if (response) nav("/home");
    else {
    } //TODO: handle error
    // console.log(formData);
  };

  return (
    <div className="min-h-screen relative flex flex-col w-[100%] justify-center overflow-y-hidden bg-gray-200 text-black">
      <h2 className=" font-bold text-center  mt-14   top-0  mb-4  h-16 text-5xl left-72 bg-gray-200 fixed">
        Make impact by Donating Goods
      </h2>

      <div className="mt-32 w-4/5 flex flex-col mx-auto ml-96  overflow-y-hidden">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full p-8 space-y-4 border border-white"
        >
          <div>
            <label htmlFor="name" className="block mb-1">
              Name of Good
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
          <div>
            <label htmlFor="name" className="block mb-1">
              Reason of Donation
            </label>
            <textarea
              type="text"
              id="resaonOfDonation"
              name="resaonOfDonation"
              value={formData.resaonOfDonation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="boughtdate" className="block mb-1">
              Bought Date
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
          <div>
            <label htmlFor="expirydate" className="block mb-1">
              Expiry Date
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

          <div>
            <label htmlFor="condition" className="block mb-1">
              Condition
            </label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block mb-1">
              Quantity
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
          <div>
            <label htmlFor="category" className="block mb-1">
              Category
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
          <button
            type="submit"
            className="w-full bg-white text-black rounded py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateGoods;
