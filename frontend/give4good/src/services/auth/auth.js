import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.REACT_API_BASE_URL;
export const loginFunc = async ({ email, password, role }) => {
  // TODO: check usehistory
  const nav = useNavigate();
  try {
    const options = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, role: role }),
    };
    let response = await fetch(`${baseURL}/login`, options);

    if (response.success) return true;
    else return false;
  } catch (error) {
    // TODO:display toast
  }
};
export const sinupFunc = async ({ name, email, password }) => {
  const nav = useNavigate();
  try {
    const options = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: role,
      }),
    };
    let response = await fetch(`${baseURL}/login`, options);
    if (response.success) return true;
    else return false;
  } catch (error) {
    // TODO:display toast
  }
};
