const baseURL = import.meta.env.REACT_API_BASE_URL;

export const kycVerification = async (formdata) => {
  try {
    const token = localStorage.getItem("token");
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

export const createCapaign = async (formdata, id = "") => {
  try {
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/campaign-creation/${
        id != "" ? id : "null"
      }`,
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
      body: JSON.stringify({
        tags: "",
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-by-tag-search`,
      options
    );
    const injson = await response.json();
    if (injson.success) {
      let locations = [];
      injson.campaigns.map((data) => locations.push(data.city));
      let updatedLocation = [...new Set(locations)];
      return updatedLocation;
    } else {
      return false;
    }
  } catch (error) {
    return false;
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
      body: JSON.stringify({
        category: category,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaignbycategory`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    // if (injson.success) return injson.campaigns;
    // else return false;
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
      body: JSON.stringify({
        tags: keyword,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-by-tag-search`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.campaigns;
    else return [];
  } catch (error) {
    return [];
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
      body: JSON.stringify({
        city: location,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-by-tag-search`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.campaigns;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getCampaignFromDBByTypes = async (type) => {
  try {
    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        city: type,
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/get-campaign-tag-search`,
      options
    );
    const injson = await response.json();
    return injson;
  } catch (error) {
    return { success: false };
  }
};

export const checkForDonation = async (id) => {
  try {
    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/is-donated`,
      options
    );
    const injson = await response.json();
    if (injson.success) return true;
    else return false;
  } catch (error) {
    return "error";
  }
};

export const campaignInsights = async (id) => {
  try {
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1//campaign-donation-insights`,
      options
    );
    const injson = await response.json();
    if (injson.success) return true;
    else false;
  } catch (error) {
    return "error";
  }
};
