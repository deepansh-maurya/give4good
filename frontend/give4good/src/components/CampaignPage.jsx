//TODO: check report
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  campaignInsights,
  checkForDonation,
  handleComment,
  handleReport,
} from "../services/campaign/campaign";
import { Toaster, toast } from "react-hot-toast";
import { fetchProfile } from "../services/profile/userProfile";
const CampaignPage = () => {
  const campgaign = useLocation();
  const [report, setreport] = useState(false);
  const [commentedUsers, setCommentedusers] = useState([]);
  const [campaignData, setCampaignData] = useState(campgaign.state.campaign);
  const [width, setWidth] = useState(
    Math.floor((campaignData?.progress / campaignData?.goal) * 100) || 0
  );
  const [comment, setcomment] = useState("");
  const [message, setmessage] = useState("");

  const [validatedonateButton, setvalidatedonatebutton] = useState(true);
  const [donateData, setDonateData] = useState({
    name: "",
    email: "",
    contact: "",
    amount: "",
  });

  console.log(campaignData);
  async function isDonatedOrNot() {
    const response = await checkForDonation(campaignData._id);
    setvalidatedonatebutton(response);
  }
  async function fetchCommentData() {
    let users = await Promise.all(
      campaignData.comments.map(async (data) => {
        const user = await fetchProfile(data.user);
        return { user: user, comment: data.comment };
      })
    );
    console.log(users, "users");
    setCommentedusers(users);
  }

  console.log(commentedUsers);

  useEffect(() => {
    isDonatedOrNot();
    fetchCommentData();
  }, []);

  async function handleRazorpay() {
    let token = localStorage.getItem("token");
    let key = await fetch(`http://localhost:3000/api/v1/get-payment-key`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    key = await key.json();
    const response = await fetch(`http://localhost:3000/api/v1/create-order`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      cache: "no-cache",
      body: JSON.stringify({
        details: {
          amount: donateData.amount * 100,
          id: campaignData.creator,
          campaignID: campaignData._id,
        },
      }),
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: key,
      amount: donateData.amount * 100,
      currency: "INR",
      name: "Give4Good",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/147298285?s=96&v=4",
      order_id: order.order.id,
      callback_url: `http://localhost:3000/api/v1/payment-verification/${
        campaignData.creator
      }/${campaignData._id}/${localStorage.getItem("token")}`,
      prefill: {
        name: donateData.name,
        email: donateData.email,
        contact: donateData.contact,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var razor = new window.Razorpay(options);
    razor.open();
  }
  async function addComment() {
    console.log(comment);
    let response = await handleComment(comment, campaignData._id);
    console.log(response);
    if (response) {
      toast.success("comment added successfully");
    } else {
      toast.error("failed to comment");
    }
  }
  async function addReport() {
    let response = await handleReport(message, campaignData._id);
    console.log(response);
    if (response) {
      toast.success("reported successfully");
      setreport(false);
    } else {
      toast.error("failed to report");
    }
  }
  return (
    <>
      <div className="flex bg-white relative top-14 text-black">
        <div className="w-2/3 p-8">
          <h1 className="text-5xl text-center shadow-sm shadow-black  font-bold mb-7">
            {campaignData?.title?.toUpperCase()}
          </h1>
          <div className="mb-4">
            <div className="bg-gray-300 h-4 rounded-full overflow-hidden">
              <div className="bg-gray-800  border-black h-full">
                <div className={` h-full bg-red-500  w-[${width}%]`}></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 shadow-sm shadow-black p-2">
              <div className="text-sm">
                Total Donors - {campaignData?.donors?.length}
              </div>
              <div className="text-sm ">
                Progress ₹ {campaignData.progress || 0} / Goal ₹{" "}
                {campaignData.goal}
              </div>
            </div>
          </div>
          <div className="mb-4"></div>
          <img
            src={campaignData.image}
            alt=""
            className="w-full mb-4  object-cover "
          />
          <div className="mb-4">
            <div className="text-2xl font-bold mt-8 mb-7">DECRIPTION</div>

            <div className="bg-gray-300 p-5 italic h-auto w-full rounded-lg">
              {campaignData.description}
            </div>
            <div className="text-2xl font-bold mt-8">STORY</div>
            <textarea
              readOnly
              className="bg-gray-300  italic mt-6 h-[1000px] p-7 w-full rounded-lg"
            >
              {campaignData.story}
            </textarea>
          </div>
          <div className="flex gap-10 relative  flex-col justify-between">
            <div className="bg-gray-300 gap-9 flex-col  flex justify-center items-center p-5 h-auto w-auto rounded-lg">
              <textarea
                className="bg-white space-y-3 p-7   w-[500px] h-[200px] rounded-lg"
                name=""
                id=""
                placeholder="Your words "
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
              ></textarea>
              <button
                onClick={() => addComment()}
                className="bg-black font-bold text-white px-4 py-2 rounded w-3/5"
              >
                Comment
              </button>
            </div>
            <div className="bg-gray-300 gap-9 flex-col  flex justify-center items-center p-5 h-auto w-auto rounded-lg">
              <h1 className=" text-lg font-bold font-sans">Views Of People</h1>
              {commentedUsers.length > 0 &&
                commentedUsers?.map((data) => {
                  return (
                    <div className=" w-[100%]  py-2 px-3 rounded-lg  bg-slate-200 ">
                      <div className="flex gap-2">
                        <img
                          className=" w-[40px] rounded-full"
                          src={data.user.profilePicture}
                          alt=""
                        />
                        <h6 className=" font-serif text-blue-600 underline">
                          {data.user.name}
                        </h6>
                      </div>
                      <main>{data.comment}</main>
                    </div>
                  );
                })}
            </div>
            {report ? (
              <div className="bg-gray-300 gap-9 flex-col  flex justify-center items-center p-5 h-auto w-auto rounded-lg">
                <textarea
                  name=""
                  id=" "
                  className="bg-white space-y-3 p-7    w-[500px] h-[200px] rounded-lg"
                  placeholder="report the campaign"
                ></textarea>
              </div>
            ) : null}
            <div className="bg-red-500 m-auto hover:bg-red-700 text-white font-extrabold cursor-pointer flex justify-center items-center h-12 w-2/5 rounded-full">
              {report ? (
                <div onClick={() => addReport()}>Submit</div>
              ) : (
                <div onClick={() => setreport(true)}>Report</div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 fixed right-0  flex flex-col justify-center gap-4  h-screen  bg-black">
          <div className="mb-4">
            <button className=" bg-blue-600  hover:bg-blue-500 w-2/3 font-bold rounded-full relative left-16   text-white px-4 py-2  mr-2">
              Share
            </button>
          </div>
          <div className="mb-4 relative flex  gap-7    mx-auto">
            <button
              onClick={(e) => setDonateData({ ...donateData, amount: 1001 })}
              className="hover:bg-red-400 focus:bg-red-500 hover:text-white text-black bg-white px-4 py-2 font-bold rounded mr-2"
            >
              1001
            </button>
            <button
              onClick={(e) => setDonateData({ ...donateData, amount: 3001 })}
              className="hover:bg-red-400 hover:text-white focus:bg-red-500 text-black px-4 bg-white py-2 font-bold rounded mr-2"
            >
              3001
            </button>
            <button
              onClick={(e) => setDonateData({ ...donateData, amount: 5001 })}
              className="hover:bg-red-400 hover:text-white text-black px-4 focus:bg-red-500 bg-white py-2 font-bold rounded mr-2  "
            >
              5001
            </button>
          </div>
          <div className="mb-4">
            <input
              onChange={(e) =>
                setDonateData({
                  ...donateData,
                  amount:
                    e.target.value > "a" && e.target.value < "z"
                      ? null
                      : Number(e.target.value),
                })
              }
              type="text"
              placeholder="Enter amount"
              value={donateData.amount}
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) =>
                setDonateData({ ...donateData, name: e.target.value })
              }
              type="text"
              placeholder="Your name"
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
              value={donateData.name}
            />
          </div>
          <div className="mb-4">
            <input
              value={donateData.email}
              onChange={(e) =>
                setDonateData({ ...donateData, email: e.target.value })
              }
              type="email"
              placeholder="Your email"
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={donateData.contact}
              onChange={(e) =>
                setDonateData({ ...donateData, contact: e.target.value })
              }
              placeholder="Your Contact"
              className="bg-gray-800 focus:bg-white focus:text-black text-white px-4 py-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handleRazorpay}
              className="bg-green-500 font-bold text-white px-4 py-2 rounded w-full"
            >
              Donate Now
            </button>
            <div
              onClick={() =>
                setDonateData({
                  name: "",
                  email: "",
                  contact: "",
                  amount: "",
                })
              }
              className=" underline cursor-pointer  text-blue-500"
            >
              reset
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default CampaignPage;
