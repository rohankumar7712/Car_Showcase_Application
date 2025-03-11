import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/listings", { withCredentials: true })
      .then((response) => setListings(response.data))
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 mt-10">
      <h1 className="text-3xl font-bold text-center text-yellow mb-6 mt-5 mb-5">
        Admin Listings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <h2 className="text-xl font-bold text-center p-4">
              {listing.name}
            </h2>
            <img
              src={listing.images[0]}
              alt={listing.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-lg">
                <span className="font-semibold">Brand:</span> {listing.brand}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Type:</span> {listing.type}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Price:</span> ${listing.price}
              </p>
              <Link
                to={`/dashboard/admin/listings/${listing._id}`}
                className="block mt-4 text-center bg-blue-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded-lg transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListings;
