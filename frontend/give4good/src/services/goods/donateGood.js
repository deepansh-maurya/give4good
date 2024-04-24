const baseURL = import.meta.env.REACT_API_BASE_URL;

export const donateGoods = async ({
  donor,
  name,
  description,
  boughtdate,
  expirydate,
  status,
  condition,
  quantity,
  category,
}) => {
  try {
    let options = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donor,
        name,
        description,
        boughtdate,
        expirydate,
        status,
        condition,
        quantity,
        category,
      }),
    };
    // TODO: handle cookie token
    const response = await fetch(`${baseURL}/"/donate-goods"`, options);
    if (response.success) return true;
    else return false;
  } catch (error) {
    // TODO: display toast handle error
  }
};
