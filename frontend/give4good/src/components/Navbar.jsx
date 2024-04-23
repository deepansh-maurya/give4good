import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="bg-white text-black py-4 px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="font-extrabold">Give4Good</div>
        </Link>

        {/* Navigation links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link to="/explore-campaign" className="hover:text-gray-700">
            Explore Campaign
          </Link>
          <Link to="/explore-goods" className="hover:text-gray-700">
            Explore Goods
          </Link>
          <Link to="/create-campaign" className="hover:text-gray-700">
            Start Campaign
          </Link>
          <Link to="/donate-campaign" className="hover:text-gray-700">
            Donate Goods
          </Link>
          <Link to="/login" className="hover:text-gray-700">
            Login
          </Link>
          <Link to="/signup" className="hover:text-gray-700">
            Signup
          </Link>
          <Link to="/user-profile" className="hover:text-gray-700">
            User Profile
          </Link>
        </div>
      </nav>
    </>
  );
};
