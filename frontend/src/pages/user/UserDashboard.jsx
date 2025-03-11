import React from "react";
import UserListings from "./UserListings";
import HeroSection from "../../components/HeroSection";

const UserDashboard = () => {
  return (
    <div className="bg-gray-900 mt-0">
      <div className="pl-10 pr-10">
        <HeroSection />
      </div>
      <UserListings />
    </div>
  );
};

export default UserDashboard;
