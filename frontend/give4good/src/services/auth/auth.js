import { CgPathCrop } from "react-icons/cg";

const baseURL = import.meta.env.REACT_API_BASE_URL;
// TODO: not receiving the base url
export const loginFunc = async ({ username, password, role }) => {
  // TODO: check usehistory
  try {
    console.log(username, password, role);
    let response = await fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
      }),
    });
    console.log(response);
    const injson = await response.json();
    localStorage.setItem("token", injson.token);
    console.log(injson);
    if (injson.success) return injson;
    else return injson;
  } catch (error) {
    return { message: "error while signup" };
  }
};
export const sinupFunc = async ({ name, email, password }) => {
  try {
    let response = await fetch(`http://localhost:3000/api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
    });
    const injson = await response.json();
    return injson;
  } catch (error) {
    return false;
  }
};

export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem("token");

    let response = await fetch(
      `http://localhost:3000/api/v1/check-auth-status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const injson = await response.json();
    return injson;
  } catch (error) {
    return false;
  }
};

export const changePassword = async () => {
  try {
    const token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:3000/api/v1/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const injson = await response.json();
    return injson;
  } catch (error) {
    return {};
  }
};

export const getCode = async () => {
  try {
    const token = localStorage.getItem("token");
    let response = await fetch(
      `http://localhost:3000/api/v1/get-verification-code`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const injson = await response.json();
    console.log(injson);
    return injson;
  } catch (error) {}
};
