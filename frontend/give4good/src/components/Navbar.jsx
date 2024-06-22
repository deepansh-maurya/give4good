import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AppContext";
import { CgProfile } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
export const Navbar = () => {
  const { isauth } = useAuth();
  console.log(isauth);
  return (
    <>
      <nav className="bg-white z-50 shadow-black shadow-md text-black w-[100%] py-4 px-8 flex justify-between items-center fixed z-10">
        <Link to="/">
          <div className="font-extrabold">Give4Good</div>
        </Link>

        <div className="flex relative right-6  gap-40">
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
            {isauth ? (
              <Link to="/explore-campaign" className="hover:text-gray-700">
                Explore Campaign
              </Link>
            ) : (
              <span
                className=" cursor-pointer"
                onClick={() => toast.error("LOGIN TO PROCEED")}
              >
                {" "}
                Explore Campaign
              </span>
            )}

            {isauth ? (
              <Link to="/explore-goods" className="hover:text-gray-700">
                Explore Goods
              </Link>
            ) : (
              <span
                className=" cursor-pointer"
                onClick={() => toast.error("LOGIN TO PROCEED")}
              >
                Explore Goods
              </span>
            )}

            {isauth == true ? (
              <Link
                to="/create-campaign/kyc-verification"
                className="hover:text-gray-700"
              >
                Start Campaign
              </Link>
            ) : (
              <span
                onClick={() => {
                  toast.error("YOU ARE NOT LOGGED IN!");
                }}
                className="hover:text-gray-700"
              >
                Start Campaign
              </span>
            )}

            {isauth == true ? (
              <Link to="/donate-goods" className="hover:text-gray-700">
                Donate Goods
              </Link>
            ) : (
              <span
                onClick={() => {
                  toast.error("YOU ARE NOT LOGGED IN!");
                }}
                className="hover:text-gray-700"
              >
                Donate Goods
              </span>
            )}

            {isauth == false ? (
              <div className="flex space-x-6">
                <Link to="/login" className="hover:text-gray-700">
                  Login
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login" className="hover:text-gray-700">
                  {"    "}
                </Link>
                <Link to="/signup" className="hover:text-gray-700">
                  {"    "}
                </Link>
              </div>
            )}
          </div>

          {isauth == true ? (
            <div>
              <Link to="/user-profile/profile">
                <CgProfile />
              </Link>
            </div>
          ) : (
            <div>
              <span className="hover:text-gray-700 flex  cursor-pointer items-center">
                <CgProfile
                  onClick={() => {
                    toast.error("YOU ARE NOT LOGGED IN!");
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </nav>
      <Toaster />
    </>
  );
};
