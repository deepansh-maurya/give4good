const baseURL = import.meta.env.REACT_API_BASE_URL;

export const userProfile = async () => {
  try {
    let options = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    };
    // TODO: handle coolie token
    const response = await fetch(`${baseURL}/user-profile`, options);
    if (response.success) return true;
    else return false;
  } catch (error) {
    // TODO: display toast
  }
};
