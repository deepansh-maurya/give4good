import React, { useState } from "react";
import { kycVerification } from "../services/campaign/campaign";
import { useNavigate } from "react-router-dom";

const KYCform = ({ setsampaign, settitlecolor }) => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    documents: "",
    beneficiaryRelationship: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    name != "documents"
      ? setFormData({ ...formData, [name]: value })
      : setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setsampaign(true);
    settitlecolor(true);
    console.log(formData, "kyc form");
    let response = await kycVerification(formData);
    if (response) {
    } // TODO: display toast;
    else {
    } // TODO: display toast
  };

  return (
    <div className="min-h-screen flex   items-center mt-48 justify-center  bg-gray-200 w-2/4 text-black">
      <div className=" p-8 w-[200%] space-y-6 border border-white rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
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
            <label htmlFor="dateOfBirth" className="block mb-1">
              Date of Birth
            </label>
            <input
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-1">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="nationality" className="block mb-1">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="city" className="block mb-1">
              City
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
            <label htmlFor="documents" className="block mb-1">
              Documents (Adhaar Card, PAN Card)
            </label>
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="beneficiaryRelationship" className="block mb-1">
              Beneficiary Relationship
            </label>
            <input
              type="text"
              id="beneficiaryRelationship"
              name="beneficiaryRelationship"
              value={formData.beneficiaryRelationship}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
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

export default KYCform;
