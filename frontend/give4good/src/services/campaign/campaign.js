const baseURL = import.meta.env.REACT_API_BASE_URL;

export const kycVerification = async ({
  name,
  date_of_birth,
  gender,
  nationlaity,
  address,
  documentm,
  beneficiary_relationship,
}) => {
  try {
    let options = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        date_of_birth,
        gender,
        nationlaity,
        address,
        documentm,
        beneficiary_relationship,
      }),
    };
    // TODO: handle cookie token
    const response = await fetch(`${baseURL}/kyc-verification`, options);
    if (response.success) return true;
  } catch (error) {
    //   TODO: display toast
  }
};

export const createCapaign = async ({
  title,
  description,
  story,
  tags,
  goal,
  deadline,
  image,
  video,
}) => {
  try {
    let options = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        story,
        tags,
        goal,
        deadline,
        image,
        video,
      }),
    };
    // TODO: handle cookie token
    const response = await fetch(`${baseURL}/campaign-creation`, options);
    if (response.success) return true;
  } catch (error) {
    // TODO: display taost
  }
};
