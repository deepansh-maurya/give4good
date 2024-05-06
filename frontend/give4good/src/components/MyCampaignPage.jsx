import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { campaignInsights } from "../services/campaign/campaign";
export default function MyCampaignPage() {
  const inputref = useRef();
  const campgaign = useLocation();
  const [campaignData, setCampaignData] = useState(campgaign.state.campaign);
  const [width, setWidth] = useState(
    Math.floor((campaignData?.progress / campaignData?.goal) * 100)
  );
  const [update, setupdate] = useState(false);
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
  const [toUpdateFormData, setToUpdateFormData] = useState({
    title: campaignData.title,
    description: campaignData.description,
    story: campaignData.story,
    tags: campaignData.tags,
    goal: campaignData.goal,
    deadline: campaignData.deadline,
    city: campaignData.city,
    category: category[0],
    image: campaignData.image,
    video: campaignData.video,
  });
  const [donateData, setDonateData] = useState({
    averageContribution: 0,
    donorsList: [],
    conversionRate: 0,
    commentsList: [],
    goalCompletionChances: 0,
    performanceAmongOthers: 0,
  });
  async function getCampaignInshights() {
    let response = await campaignInsights(campaignData._id);
  }
  return (
    <div>
      <div className="flex bg-white relative top-14 text-black">
        <div className="w-2/3 p-8">
          {update ? (
            <div>
              <input
                type="text"
                className="text-5xl text-center shadow-sm relative w-full shadow-black bg-slate-200 font-bold mb-7"
                placeholder="Update title"
              />
            </div>
          ) : (
            <h1 className="text-5xl text-center shadow-sm shadow-black  font-bold mb-7">
              {campaignData?.title?.toUpperCase()}
            </h1>
          )}

          <div className="mb-4">
            <div className="bg-gray-300 h-4 rounded-full overflow-hidden">
              <div className="bg-gray-800  border-black h-full">
                <div className={` h-full bg-red-500  w-[${width}%]`}></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 shadow-sm  items-center shadow-black p-2">
              <div className="text-sm flex items-center">
                Total Donors -<div>{campaignData?.donors?.length}</div>
              </div>
              <div>
                Deadline -
                {update ? (
                  <input className="bg-slate-200" type="text" />
                ) : (
                  <div>{campaignData.deadline}</div>
                )}
              </div>
              <div className="text-sm ">
                Progress - ₹ {campaignData.progress / 100 || 0}
              </div>
              <div className="flex items-center">
                Goal - ₹
                {update ? (
                  <input
                    type="text"
                    className="bg-slate-200 pl-2 text-black relative left-1  "
                  />
                ) : (
                  <div>{campaignData.goal}</div>
                )}{" "}
              </div>
            </div>
          </div>
          <div className="mb-4"></div>
          <img
            src={campaignData.image}
            alt=""
            className="w-full mb-4  object-cover "
          />
          {update ? (
            <div className="mb-4">
              <label htmlFor="image" className="block font-semibold mb-1">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full border border-gray-300 border-r-slate-400 rounded px-3 py-2"
              />
            </div>
          ) : null}
          <div className="mb-4">
            <div className="text-2xl font-bold mt-8 mb-7">DECRIPTION</div>

            {update ? (
              <textarea
                type="text"
                className="bg-gray-300 p-5 italic h-auto w-full rounded-lg"
                placeholder="update description"
              ></textarea>
            ) : (
              <div className="bg-gray-300 p-5 italic h-auto w-full rounded-lg">
                {campaignData.description}
              </div>
            )}

            <div className="text-2xl font-bold mt-8">STORY</div>
            {update ? (
              <textarea className="bg-gray-300  italic mt-6 h-[1000px] p-7 w-full rounded-lg">
                {campaignData.story}
              </textarea>
            ) : (
              <textarea
                readOnly
                className="bg-gray-300  italic mt-6 h-[1000px] p-7 w-full rounded-lg"
              >
                {campaignData.story}
              </textarea>
            )}
          </div>
          <div className="bg-gray-300 h-auto w-auto rounded-lg  mb-5 flex justify-center items-center ">
            <iframe
              title="video"
              width="800"
              height="600"
              src={campaignData.video}
              frameborder="0"
              className=" object-cover  mx-auto relative left-9 top-9 "
              allowfullscreen
            ></iframe>
          </div>
          {update ? (
            <div className="mb-4">
              <label htmlFor="image" className="block font-semibold mb-1">
                Video
              </label>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                className="w-full border border-gray-300 border-r-slate-400 rounded px-3 py-2"
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="bg-gray-300  w-full  pt-3 pb-3  rounded-lg h-auto">
            {campaignData.comments.map((data) => {
              return (
                <div>
                  <div>{data.writername}</div>
                  <div>{data.comment}</div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-10 relative  flex-col justify-between">
            <div className="bg-gray-300  w-full  pt-3 pb-3  rounded-lg h-auto">
              {update == true ? (
                <form className="relative left-44">
                  <div className="mb-4">
                    <label
                      htmlFor="tags"
                      className="block flex font-semibold mb-1"
                    >
                      Tags
                      <div
                        onClick={() => setFormData({ ...formData, tags: [] })}
                        className=" cursor-pointer font-extrabold"
                      >
                        (-)
                      </div>
                    </label>
                    <div>
                      <div className="w-full border flex  justify-between border-gray-300 rounded px-3 py-2">
                        <input
                          ref={inputref}
                          type="text"
                          id="tags"
                          name="tags"
                          placeholder="Enter a Tag"
                          className=" pl-1 outline-none"
                        />
                        <div
                          onClick={() => {
                            let newTag = formData.tags;
                            newTag.push(inputref.current.value);
                            setFormData({ ...formData, tags: newTag });
                            inputref.current.value = "";
                          }}
                          className=" cursor-pointer  text-lg"
                        >
                          +
                        </div>
                      </div>
                      <div className="flex mt-3 flex-wrap">
                        {toUpdateFormData.tags.map((data, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-slate-100 mr-2 m-2 border-2 border-black rounded-3xl p-1"
                            >
                              {data}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-2/4">
                    {/* {toUpdateFormData.map((data, index) => {
                        return <div key={index}>{data}</div>;
                      })} */}
                  </div>
                  <div className="mb-4 w-2/4">
                    <label htmlFor="city" className="block font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      //   value={formData.tags}
                      //   onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4 w-2/4">
                    <label
                      htmlFor="category"
                      className="block font-semibold mb-1"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      //   onChange={(e) =>
                      //     setFormData({ ...formData, category: e.target.value })
                      //   }
                      //   value={formData.category}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      {category.map((cate) => {
                        return <option value={cate}>{cate}</option>;
                      })}
                    </select>
                  </div>
                </form>
              ) : (
                <div></div>
              )}
            </div>
            <div
              onClick={() => setupdate(!update)}
              className="bg-red-600 text-white font-extrabold cursor-pointer flex justify-center items-center h-12 w-2/5 rounded-full"
            >
              Update Details
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 fixed right-0 flex flex-col justify-center gap-4 h-screen bg-black">
          <div className="averageContribution">
            <div>Avereage Contribution</div>
            <div></div>
          </div>
          <div className="goalcompletionchances">
            <div>Completion Chances</div>
            <div></div>
          </div>
          <div className="performanceamongother">
            <div></div>
            <div>Performing Better then {}% campaigns </div>
          </div>
          <div className="donorlist">
            <div>
              <div>
                {} from {} funded {}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
