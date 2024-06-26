export const userProfile = async () => {
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
      `${import.meta.env.VITE_URL}/user-profile`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson;
    else return false;
  } catch (error) {
    return false;
  }
};
export const updateProfile = async (formdata) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formdata),
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/update-profile`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson;
    else return injson;
  } catch (error) {
    return { message: "profile updation failed" };
  }
};
export const updateDoc = async (data) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/update-document`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson;
    else return injson;
  } catch (error) {
    return { message: "Document updation failed" };
  }
};
export const updatePciture = async (data) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/update-profile-picture`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson;
    else return injson;
  } catch (error) {
    return { message: "Picture upload updation failed" };
  }
};

export const fetchProfile = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log(id);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_URL}/fetch-profile`,
      options
    );
    const injson = await response.json();
    if (injson.success) return injson.user;
    else return "not avalable";
  } catch (error) {
    return "not avalable";
  }
};
