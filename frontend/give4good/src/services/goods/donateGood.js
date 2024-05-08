const baseURL = import.meta.env.REACT_API_BASE_URL;

export const donateGoods = async (donateData) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: donateData,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/donate-goods`,
      options
    );
    const injson = await response.json();
    return injson;
  } catch (error) {
    return { success: false, message: "Failed to list your donation" };
  }
};

export const getProductsFromDBBySeacrh = async (keyword) => {
  try {
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/list-goods-seacrh-tags`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.goods;
    else return false;
  } catch (error) {}
};

export const getProductsFromDBByCategory = async (category) => {
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
      `http://localhost:3000/api/v1/list-goods`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.goods;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getLocation = async (cate) => {
  try {
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category: cate,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/list-goods`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    let location = [];
    injson.goods.map((data) => location.push(data.city));
    console.log(location);
    if (injson.success) return location;
    else return false;
  } catch (error) {}
};
export const getGoodsFromDBByLocation = async (location) => {
  try {
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        city: location == "Choose location" ? "" : location,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/list-goods`,
      options
    );
    const injson = await response.json();
    if (injson.success) return injson.goods;
    else return false;
  } catch (error) {
    return false;
  }
};
