import React, { useState } from "react";
import { kycVerification } from "../services/campaign/campaign";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AppContext";
import { Toaster, toast } from "react-hot-toast";
const KYCform = ({ setsampaign, settitlecolor }) => {
  const nav = useNavigate();
  const { id, setId } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    document: "",
    contact: "",
    beneficiaryRelationship: "",
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    name != "documents"
      ? setFormData({ ...formData, [name]: value })
      : setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const kycData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      kycData.append(key, value);
    });
    let response = await kycVerification(kycData);
    if (response.success) {
      setId(response.beneId);
      toast.success(`Kyc Successfull`);
      setFormData({
        name: "",
        dateOfBirth: "",
        gender: "",
        nationality: "",
        address: "",
        city: "",
        document: "",
        contact: "",
        beneficiaryRelationship: "",
      });
      setTimeout(() => {
        setsampaign(true);
        settitlecolor(true);
      }, 2000);
    } else {
      toast.error(`${response?.message || "Kyc unsuccessfull"} `);
      setFormData({
        name: "",
        dateOfBirth: "",
        gender: "",
        nationality: "",
        address: "",
        city: "",
        document: "",
        contact: "",
        beneficiaryRelationship: "",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center mt-20 justify-center h-[100%]  w-2/4 text-black ">
        <div className="p-8 w-[1400px]  relative top-16 space-y-6 border h-[100%] border-white rounded-lg">
          <form
            className="space-y-4 h-[100%] p-8 shadow-sm shadow-black"
            onSubmit={handleSubmit}
          >
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
                type="date"
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
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
              <label htmlFor="name" className="block mb-1">
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
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
                Documents (Aadhaar Card, PAN Card)
              </label>
              <input
                type="file"
                id="document"
                name="document"
                onChange={(e) =>
                  setFormData({ ...formData, document: e.target.files[0] })
                }
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
              className="w-full bg-black text-white rounded py-2 hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default KYCform;
