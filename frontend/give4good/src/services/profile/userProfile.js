const baseURL = import.meta.env.REACT_API_BASE_URL;

export const userProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/user-profile`,
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

export const updateProfile = async ({
  name,
  address,
  email,
  username,
  profilePicture,
}) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        address,
        email,
        username,
        profilePicture,
      }),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/update-profile`,
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
