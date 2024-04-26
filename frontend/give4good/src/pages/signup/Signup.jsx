import React, { useState } from "react";
import { sinupFunc } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respones = await sinupFunc({ name, email, password });
    console.log(respones);
    if (respones) {
      console.log(respones);
      nav("/login");
    } //TODO: handle toast
    else {
    } // TODO: handle toast message
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full p-8 space-y-6 border border-white">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black rounded py-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
