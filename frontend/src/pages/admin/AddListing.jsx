import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    type: "Sedan",
    description: "",
    images: [""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...listing.images];
    newImages[index] = value;
    setListing({ ...listing, images: newImages });
  };

  const addImageField = () => {
    setListing({ ...listing, images: [...listing.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = listing.images.filter((_, i) => i !== index);
    setListing({ ...listing, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !listing.name ||
      !listing.brand ||
      !listing.model ||
      !listing.year ||
      !listing.price
    ) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5050/listings/addcar", listing, {
        withCredentials: true,
      });
      alert("Listing added successfully!");
      navigate("/dashboard/admin/listings");
    } catch (err) {
      setError("Failed to add listing. Please try again.");
      console.error("Error adding listing:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-yellow-400 mb-4">
          Add a New Car Listing
        </h1>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={listing.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={listing.brand}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={listing.model}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={listing.year}
            onChange={handleChange}
            min="1886"
            max={new Date().getFullYear()}
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={listing.price}
            onChange={handleChange}
            min="1"
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Car Type Dropdown */}
          <select
            name="type"
            value={listing.type}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Wagon">Wagon</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Electric">Electric</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={listing.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
          ></textarea>

          {/* Image URLs */}
          <div className="space-y-2">
            {listing.images.map((image, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg"
                  onClick={() => removeImageField(index)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              onClick={addImageField}
            >
              + Add Image
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
