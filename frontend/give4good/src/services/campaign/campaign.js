const baseURL = import.meta.env.REACT_API_BASE_URL;

export const kycVerification = async ({
  name,
  dateOfBirth,
  gender,
  nationality,
  address,
  documents,
  beneficiaryRelationship,
}) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        date_of_birth: dateOfBirth,
        gender,
        nationlaity: nationality,
        address,
        document: documents.name,
        beneficiary_relationship: beneficiaryRelationship,
      }),
    };
    // TODO: handle cookie token
    const response = await fetch(
      `http://localhost:3000/api/v1/kyc-verification`,
      options
    );
    const inJson = await response.json();
    console.log(inJson);
    if (response.success) return true;
    else return false;
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
    console.log(title, description, story, tags, goal, deadline, image, video);
    const token = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const response = await fetch(
      `http://localhost:3000/api/v1/campaign-creation`,
      options
    );
    const injson = await response.json();
    console.log(injson);
    if (response.success) return true;
    else return false;
  } catch (error) {
    // TODO: display taost
  }
};
