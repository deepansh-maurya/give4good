import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/explore-campaign">Explore Campaign</Link>
        <Link to="/explore-goods">Explore Goods</Link>
        <Link to="/create-campaign">Start Campaign</Link>
        <Link to="/donate-campaign">Donate Goods</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/user-profile">User Profile</Link>
      </nav>
    </>
  );
};
