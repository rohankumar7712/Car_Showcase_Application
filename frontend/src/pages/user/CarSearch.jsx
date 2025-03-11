import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CarSearch = () => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Memoized fetch function
  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = {};
      if (brand) params.brand = brand;
      if (type) params.type = type;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      console.log("Fetching data with params:", params);

      const response = await axios.get("http://localhost:5050/api/car/search", {
        params,
      });

      console.log("Fetched data:", response.data);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError(
        error.response?.data?.error || "Failed to fetch cars. Try again later."
      );
    } finally {
      setLoading(false);
    }
  }, [brand, type, minPrice, maxPrice]); // Dependencies for useCallback

  // Debounced search with memoized fetch function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCars();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fetchCars]); // Now eslint warning is fixed!

  return (
    <div className="p-6 max-w-3xl bg-gray-900 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Cars</h1>

      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Brand Input */}
        <div>
          <input
            type="text"
            placeholder="Search by Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type Input */}
        <div>
          <input
            type="text"
            placeholder="Search by Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Price Range Inputs */}
        <div>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 w-full mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Search Results */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Results:</h2>
        {cars.length > 0 ? (
          <ul className="border p-4 rounded-lg bg-gray-50">
            {cars.map((car) => (
              <li
                key={car._id}
                className="mb-2 p-2 border-b last:border-b-0 hover:bg-gray-100 transition-colors"
              >
                <strong>{car.brand}</strong> - {car.type} - ${car.price}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default CarSearch;
