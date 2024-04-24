import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor"); // Default role is donor

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with email, password, and role
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full p-8 space-y-6 border border-white">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="role" className="block mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option value="donor">Donor</option>
              <option value="admin">Admin</option>
            </select>
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