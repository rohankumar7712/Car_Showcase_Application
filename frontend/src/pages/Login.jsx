import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const response = await login(email, password);
    if (response) {
      navigate(response.redirectUrl); // Redirect based on role
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-11/12 md:w-4/5 lg:w-[70%] flex bg-gray-800 rounded-lg shadow-lg border-2 border-white">
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 w-1/2 p-8 rounded-l-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to Website
          </h2>
          <p className="text-white text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-1/2 bg-gray-800 p-10 flex flex-col items-center justify-center rounded-r-lg">
          <h2 className="text-3xl font-bold text-white mb-6">User Login</h2>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center bg-gray-700 p-4 rounded-lg">
              <FiUser className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-white w-full focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-gray-700 p-4 rounded-lg">
              <FiLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent text-white w-full focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
          <div className="text-white mt-4">
            Dont Have an account?{" "}
            <Link
              to="/register"
              className="text-orange-300 hover:underline hover:text-orange-400"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
