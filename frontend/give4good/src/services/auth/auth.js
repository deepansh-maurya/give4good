export const loginFunc = async ({ username, password, role }) => {
  // TODO: check usehistory
  try {
    console.log(username, password, role);
    let response = await fetch(`${import.meta.env.VITE_URL}/login`, {
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
    let response = await fetch(`${import.meta.env.VITE_URL}/register`, {
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
      `${import.meta.env.VITE_URL}/check-auth-status`,
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
    let response = await fetch(`${import.meta.env.VITE_URL}/change-password`, {
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
      `${import.meta.env.VITE_URL}/get-verification-code`,
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
export const getProfile = async (id, user, benefciery) => {
  try {
    const token = localStorage.getItem("token");
    let response = await fetch(`${import.meta.env.VITE_URL}/get-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        user: user,
        beneficiery: benefciery,
      }),
    });
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson.name;
    else return "";
  } catch (error) {
    return "";
  }
};

export const deleteAccount = async () => {
  try {
    const token = localStorage.getItem("token");
    let response = await fetch(`${import.meta.env.VITE_URL}/delete-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const injson = await response.json();
    console.log(injson);
    if (injson.success) return injson;
    else return false;
  } catch (error) {}
};
