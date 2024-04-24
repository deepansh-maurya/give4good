import React, { useState } from "react";

const DonateCard = () => {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    donationType: "oneTime",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData); // For demonstration, you can replace this with your form submission logic
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Can't Choose? Donate to Us!
      </h2>
      <p className="text-sm mb-4 text-center">Give4Good's Special Plan</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category" className="block mb-1">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          >
            {/* Add your category options here */}
            <option value="">Select Category</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1">
            Enter Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
        </div>
        <div>
          <label className="block mb-1">Donation Type</label>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="oneTime"
              name="donationType"
              value="oneTime"
              checked={formData.donationType === "oneTime"}
              onChange={handleChange}
            />
            <label htmlFor="oneTime">One Time</label>
            <input
              type="radio"
              id="monthly"
              name="donationType"
              value="monthly"
              checked={formData.donationType === "monthly"}
              onChange={handleChange}
            />
            <label htmlFor="monthly">Monthly Plan</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black rounded py-2"
        >
          Donate Now
        </button>
      </form>
      <p className="mt-8 text-center">
        "choosing montly plan, amount will automatically deduct from your
        Account"
      </p>
    </div>
  );
};

export default DonateCard;
