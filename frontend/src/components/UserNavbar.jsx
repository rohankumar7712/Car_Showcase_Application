import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = ({ logout }) => {
  return (
    <nav className="bg-black text-white shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center fixed top-0 left-0 w-full z-50">
      <Link className="text-2xl font-bold text-white" to="/dashboard/user">
        Car Showcase
      </Link>
      <div className="flex-1 flex justify-center space-x-6 my-2 sm:my-0">
        <Link
          to="/dashboard/user"
          className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
        >
          Dashboard
        </Link>
        {/* <Link
          to="/dashboard/user/carsearch"
          className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
        >
          Search
        </Link> */}
        <Link
          to="/dashboard/user/features"
          className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
        >
          Features
        </Link>
        <Link
          to="/dashboard/user/browse"
          className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
        >
          Browse
        </Link>
        <Link
          to="/dashboard/user/feedback"
          className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
        >
          Feedback
        </Link>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default UserNavbar;
