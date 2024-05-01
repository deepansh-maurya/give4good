import React, { useState } from "react";
import { loginFunc } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AppContext";
const Login = () => {
  const { isauth, setisauth } = useAuth();
  const nav = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  const handleUsernameChange = (e) => setusername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginFunc({ username, password, role });
    if (response.success) {
      setisauth(true);
      await toast.success(`${response.message.toUpperCase()}`, {
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
      setTimeout(() => {
        nav("/");
      }, 1000);
    } else {
      toast.warning(`${response.message.toUpperCase()}`, {
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
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="max-w-md w-full p-8 space-y-6 border border-white">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1">
                Username
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
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
          <div className="flex justify-center gap-4">
            No Registered{" "}
            <span>
              <Link className="text-blue-500 underline" to="/signup">
                go for sinup
              </Link>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
