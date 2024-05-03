import { useState } from "react";
import { createCapaign } from "../services/campaign/campaign";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AppContext";
import { ToastContainer, toast } from "react-toastify";
const CampaignForm = () => {
  const { id, setId } = useAuth();
  const nav = useNavigate();
  let category = [
    "select category",
    "Animal",
    "Children",
    "Elderly",
    "Faith",
    "Specially Abled",
    "Hunger",
    "Education",
    "Woman",
    "Transgender",
    "Medical",
    "Disaster Relief",
    "Enviroment",
    "Mental Health",
    "LGBTQ+ Rights",
    "Other",
  ];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    story: "",
    tags: "",
    goal: "",
    deadline: "",
    category: category[0],
    image: "",
    video: "",
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaignData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      campaignData.append(key, value);
    });
    console.log(id);
    const response = await createCapaign(campaignData, id);
    console.log(response);
    if (response.success) {
      toast.success(`${response.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
      setId("");
      setTimeout(() => {
        console.log("SDfs");
        nav("/home");
      }, 2000);
    } else {
      toast.error(`${response.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    }
    setTimeout(() => {
      setFormData({
        title: "",
        description: "",
        story: "",
        tags: "",
        goal: "",
        deadline: "",
        image: "",
        video: "",
        category: category[0],
      });
    }, 2000);
  };

  return (
    <>
      <div className=" mx-auto p-6 w-2/4 mt-48  shadow-sm shadow-black rounded-md shadow-md ">
        <form onSubmit={handleSubmit} className="border-white rounded-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="story" className="block font-semibold mb-1">
              Story
            </label>
            <textarea
              id="story"
              name="story"
              value={formData.story}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block font-semibold mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-semibold mb-1">
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {category.map((cate) => {
                return <option value={cate}>{cate}</option>;
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="goal" className="block font-semibold mb-1">
              Goal
            </label>
            <input
              type="text"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block font-semibold mb-1">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-semibold mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="video" className="block font-semibold mb-1">
              Video
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, video: e.target.files[0] })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white rounded py-2 hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CampaignForm;
