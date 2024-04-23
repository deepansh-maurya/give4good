import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full p-8 space-y-6 border border-white">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black rounded py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
