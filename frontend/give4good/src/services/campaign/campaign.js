import { useAuth } from "../../contexts/AppContext";

const baseURL = import.meta.env.REACT_API_BASE_URL;

export const kycVerification = async (formdata) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/kyc-verification`,
      options
    );
    const inJson = await response.json();
    return inJson;
  } catch (error) {
    return { success: false };
  }
};

export const createCapaign = async (formdata, id) => {
  try {
    console.log(id);
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/campaign-creation/${id}`,
      options
    );
    const injson = await response.json();
    return injson;
  } catch (error) {
    console.log(error);
    return { message: "Campaign creation failed" };
  }
};

export const getLocation = async () => {
  try {
    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        tags: "",
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-tag-search`,
      options
    );
    const injson = await response.json();
    let locations = [];
    injson.campaigns.map((data) => locations.push(data.city));
    let updatedLocation = [...new Set(locations)];
    if (injson.success) return updatedLocation;
    else return false;
  } catch (error) {
    // TODO: display toast
  }
};

export const getCampaignsFromDbbyCategory = async (category) => {
  try {
    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        category: category,
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaignbycategory`,
      options
    );
    const injson = await response.json();
    if (injson.success) return injson.campaigns;
    else return false;
  } catch (error) {
    // TODO: display toast
  }
};

export const getCampaignFromDBBySearch = async (keyword) => {
  try {
    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        keyword: keyword,
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-tag-search`,
      options
    );
    const injson = await response.json();

    if (injson.success) return injson.campaigns;
    else return false;
  } catch (error) {
    // TODO: display toast
  }
};

export const getCampaignFromDBByLocation = async (location) => {
  try {
    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        city: location,
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-tag-search`,
      options
    );
    const injson = await response.json();

    if (injson.success) return injson.campaigns;
    else return false;
  } catch (error) {
    // TODO: display toast
  }
};
