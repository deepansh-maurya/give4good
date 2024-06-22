import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  getRequesters,
  requestForGood,
  setStatus,
} from "../services/goods/donateGood";
function MyProductPage() {
  const state = useLocation();
  const [toUpdate, setToUpdate] = useState(false);
  const [good, setgood] = useState(state.state);
  const [requesters, setRequesters] = useState();
  console.log(requesters, "requesters");
  const [decision, setDecision] = useState();
  async function handleRequesters() {
    let response = await getRequesters(good.donor, good._id);
    console.log(response, "Requester");
    if (response) setRequesters(response.requestes[0].requests);
  }
  useEffect(() => {
    handleRequesters();
  }, []);
  console.log(requesters);
  async function handleStatusButton(status, requestid) {
    let response = await setStatus(status, good.donor, good._id, requestid);
    if (response.success) {
      toast.success("Action taken successfully");
    } else toast.error("Failed to accept the request");
  }

  return (
    <div className="flex justify-center w-full bg-gray-900 overflow-hidden">
      <div className="flex justify-center w-[90%] relative top-14 items-start bg-gray-900 text-white min-h-screen">
        {/* { lfet side} */}
        <div className="w-4/6 p-8 relative right-48 ">
          {toUpdate ? (
            <input
              className="text-2xl font-bold mb-4 outline-none bg-black p-4 rounded-full"
              value={good.name}
            />
          ) : (
            <h1 className="text-2xl font-bold mb-4">{good.name}</h1>
          )}

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-1/2 mr-4 bg-white rounded-full">
                <div
                  className="h-6 bg-red-500 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="w-1/2">
                <p>Chances of the needy to get the good</p>
              </div>
            </div>
            {toUpdate ? (
              <input
                className="mb-4 bg-black p-4 rounded-full"
                value={good.description}
              />
            ) : (
              <p className="mb-4">{good.description}</p>
            )}

            <img
              src={good.image}
              alt="Product"
              className="w-full mb-4 rounded-lg"
            />
            {toUpdate ? (
              <input type="file" className="p-2 mb-4" />
            ) : (
              <div></div>
            )}
            {toUpdate ? (
              <textarea
                name=""
                id=""
                cols={97}
                rows={27}
                placeholder="enter the reason"
                className=" rounded-lg p-3 text-black mb-2"
                value={good.resaonOfDonation}
              ></textarea>
            ) : (
              <p>{good.resaonOfDonation} </p>
            )}

            <img src={good.video} className="w-full mb-4 rounded-lg"></img>
            {toUpdate ? <input type="file" className="p-2" /> : <div></div>}
            <div className="border-t mb-16 flex flex-col gap-3 text-lg  border-gray-600 pt-4">
              <h2 className=" text-lg font-bold mb-2">Product Information</h2>
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 w-[100] rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Brand
                </div>
                {toUpdate ? (
                  <input
                    className="h-6 pl-4 flex justify-center items-center bg-slate-200 rounded-full"
                    placeholder="enter value"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.brand}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.brand || "not available"}
                  </div>
                )}
              </div>
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Original Price
                </div>
                {toUpdate ? (
                  <input
                    placeholder="enter value"
                    className="h-6 pl-4 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.originalprice}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.originalprice || "not avialable"}
                  </div>
                )}
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Weight
                </div>
                {toUpdate ? (
                  <input
                    className="h-6 pl-4 flex justify-center items-center bg-slate-200 rounded-full"
                    placeholder="enter value"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.weight}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.weight || "not avialable"}
                  </div>
                )}
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Dimension
                </div>
                {toUpdate ? (
                  <input
                    placeholder="enter value"
                    className="h-6 pl-4 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.dimension}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.dimension || "not available"}
                  </div>
                )}
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Condtion
                </div>
                {toUpdate ? (
                  <input
                    placeholder="enter value"
                    className="h-6 pl-4 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.condition}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.condition || "not available"}
                  </div>
                )}
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Quantity
                </div>
                {toUpdate ? (
                  <input
                    placeholder="enter value"
                    className="h-6 pl-4  flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.quantity}
                  />
                ) : (
                  <div
                    className="h-6  flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.quantity || "not available"}
                  </div>
                )}
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  placeholder="enter value"
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Bouught Date
                </div>
                {toUpdate ? (
                  <input
                    className="h-6 pl-4 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.boughtdate}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.boughtdate || "not avialable"}
                  </div>
                )}
              </div>{" "}
              <div className="w-2/3 text-black font-bold  mr-4 rounded-full flex justify-center items-center">
                <div
                  placeholder="enter value"
                  className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                  style={{
                    width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                  }}
                >
                  Expiry Date
                </div>
                {toUpdate ? (
                  <input
                    className="h-6 flex pl-4 justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                    value={good.expirydate}
                  />
                ) : (
                  <div
                    className="h-6 flex justify-center items-center bg-slate-200 rounded-full"
                    style={{
                      width: `${(1 / Number(good?.requests || 2)) * 100}%`,
                    }}
                  >
                    {good.expirydate || "not avialable"}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-between">
            <div
              onClick={(e) => {
                setToUpdate(!toUpdate);
              }}
              className="bg-red-600 mb-12 text-white font-extrabold cursor-pointer flex justify-center items-center h-12 w-2/5 rounded-full"
            >
              Update
            </div>
            <div
              onClick={(e) => {
                setToUpdate(!toUpdate);
              }}
              className="bg-red-600 mb-12 text-white font-extrabold cursor-pointer flex justify-center items-center h-12 w-2/5 rounded-full"
            >
              Delete
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-2/6 p-8 fixed right-10">
          <h1 className="text-center text-2xl font-bold  ">Requesters</h1>
          <div className=" overflow-scroll overflow-x-hidden h-[500px]">
            {Array.isArray(requesters) &&
              requesters.map((data) => {
                return (
                  <div className="text-white shadow-md shadow-white p-4 m-2 ">
                    <div className="flex gap-2">
                      <img src="" alt="" />
                      <h3>{"Contact"}</h3>
                      <h3>{data.contact}</h3>
                    </div>
                    <p>Poposel - {data.proposel}</p>
                    <div className="flex gap-2 mt-4">
                      {data.status == "rejected" ||
                      data.status == "accepted" ? (
                        <div
                          className={`${
                            data.status == "rejected"
                              ? "bg-red-600 "
                              : " bg-green-600 "
                          }rounded-full  px-2`}
                        >
                          {data.status}
                        </div>
                      ) : (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => {
                              handleStatusButton("accepted", data.id);
                            }}
                            className="bg-red-500 rounded-lg font-bold pl-2 pr-2 flex justify-center items-center hover:bg-green-500"
                          >
                            accept
                          </button>
                          <button
                            onClick={() => {
                              handleStatusButton("rejected", data.id);
                            }}
                            className="hover:bg-red-500 font-bold rounded-lg pl-2 pr-2 flex justify-center items-center bg-green-500"
                          >
                            {" "}
                            deny
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
}

export default MyProductPage;
