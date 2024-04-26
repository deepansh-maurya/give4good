import { useNavigate } from "react-router-dom";
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
    const injson = await response.json();
    console.log(injson, document.cookie, cookie);
    if (injson.success) return true;
    else return false;
  } catch (error) {
    // TODO:display toast
  }
};
export const sinupFunc = async ({ name, email, password, role }) => {
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
        role: role,
      }),
    });
    const injson = await response.json();
    if (injson.success) return true;
    else return false;
  } catch (error) {
    // TODO:display toast
  }
};
