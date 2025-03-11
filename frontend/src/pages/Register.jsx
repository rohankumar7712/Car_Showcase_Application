import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5050/auth/register", {
        name,
        email,
        password,
        password2,
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(
        "Registration failed: " + (error.response?.data.msg || error.message)
      );
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
        {/* Right Side (Registration Form) */}
        <div className="w-full md:w-1/2 bg-gray-800 p-10 flex flex-col items-center justify-center rounded-r-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Register</h2>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center bg-gray-700 p-4 rounded-lg">
              <FiUser className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent text-white w-full focus:outline-none"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-gray-700 p-4 rounded-lg">
              <FiMail className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-white w-full focus:outline-none"
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-gray-700 p-4 rounded-lg">
              <FiLock className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent text-white w-full focus:outline-none"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Register
            </button>
          </form>
          <div className="text-white mt-4">
            Already an User?{" "}
            <Link
              to="/login"
              className="text-orange-300 hover:underline hover:text-orange-400"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
