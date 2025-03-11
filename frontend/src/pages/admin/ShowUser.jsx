import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ShowUser = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5050/listings/users", { withCredentials: true })
      .then((response) => setListings(response.data))
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`http://localhost:5050/listings/users/${id}`, {
          withCredentials: true,
        });
        alert("Listing deleted successfully!");
        setListings(listings.filter((listing) => listing._id !== id));
        navigate("/dashboard/admin/listings");
      } catch (error) {
        console.error("Error deleting listing:", error);
        setError("Failed to delete listing.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 mt-10">
      <h1 className="text-3xl font-bold text-center text-yellow mb-6">
        User Listings
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-center">{listing.name}</h2>

            {/* Admin Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleDelete(listing._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUser;
