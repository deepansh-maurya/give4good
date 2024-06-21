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
      `${import.meta.env.VITE_URL}/kyc-verification`,
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
      `${import.meta.env.VITE_URL}/campaign-creation/${id != "" ? id : "null"}`,
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
      `${import.meta.env.VITE_URL}/get-campaign-by-tag-search`,
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
      `${import.meta.env.VITE_URL}/get-campaignbycategory`,
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
      `${import.meta.env.VITE_URL}/get-campaign-by-tag-search`,
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
      `${import.meta.env.VITE_URL}/get-campaign-by-tag-search`,
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
    console.log(type, "ksdfjdshjdsjdh");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: type,
      }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/get-campaign-by-type`,
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
      `${import.meta.env.VITE_URL}/is-donated`,
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
      `${import.meta.env.VITE_URL}/campaign-donation-insights`,
      options
    );
    const injson = await response.json();
    if (injson.success) return true;
    else false;
  } catch (error) {
    return "error";
  }
};

export const checkCampaginStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/is-campaign-active`,
      options
    );
    const injson = await response.json();
    if (injson.success) return injson;
    else false;
  } catch (error) {
    return false;
  }
};

export const handleComment = async (comment, id) => {
  try {
    console.log(comment, id);
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: comment,
        id,
      }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/add-comment-on-campaign`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.success;
    else return false;
  } catch (error) {
    return false;
  }
};
export const handleReport = async (message, id) => {
  try {
    console.log(comment, id);
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        id,
      }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/handle-report-to-campaign`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.success;
    else return false;
  } catch (error) {
    return false;
  }
};
