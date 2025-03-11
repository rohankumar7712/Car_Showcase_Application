import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UserListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "http://localhost:5050";

  // Ref for the slider
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid listing ID.");
      setLoading(false);
      return;
    }

    axios
      .get(`${apiUrl}/api/car/${id}`, { withCredentials: true })
      .then((response) => {
        if (!response.data) {
          throw new Error("Listing not found.");
        }
        setListing(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching listing details:", error);
        setError("Failed to fetch listing details.");
      })
      .finally(() => setLoading(false));
  }, [id, apiUrl]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );

  if (!listing || !listing.name || !listing.brand || !listing.model) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          Invalid listing data.
        </div>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // Disable default arrows
  };

  // Function to go to the previous slide
  const goToPrevious = () => {
    sliderRef.current.slickPrev();
  };

  // Function to go to the next slide
  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6 mt-10">
      <article className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl lg:w-[70%]">
        <header>
          <h1 className="text-3xl font-bold text-center text-yellow-400 mb-4">
            {listing.name}
          </h1>
        </header>

        {/* Image Carousel with Custom Arrows */}
        <div className="relative">
          <Slider
            ref={sliderRef}
            {...sliderSettings}
            className="rounded-lg overflow-hidden mb-6"
          >
            {listing.images && listing.images.length > 0 ? (
              listing.images.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`${listing.name} - Image ${index + 1}`}
                    className="w-full min-h-96 object-cover rounded-lg" // Increased minimum height
                  />
                </div>
              ))
            ) : (
              <div className="w-full">
                <img
                  src="/path/to/placeholder-image.jpg"
                  alt="No images available"
                  className="w-full min-h-96 object-cover rounded-lg" // Increased minimum height
                />
              </div>
            )}
          </Slider>

          {/* Custom Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Custom Next Button */}
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Car Details */}
        <section className="space-y-4">
          {/* Brand, Model, and Year in the same row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <p className="text-lg">
              <span className="font-semibold">Brand:</span> {listing.brand}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Model:</span> {listing.model}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Year:</span> {listing.year}
            </p>
          </div>

          {/* Year and Type in the same row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-lg">
              <span className="font-semibold">Year:</span> {listing.year}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Type:</span> {listing.type}
            </p>
          </div>

          {/* Price and Description in separate rows */}
          <p className="text-lg">
            <span className="font-semibold">Price:</span> ${listing.price}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Description:</span>
            <p className="mt-2 text-gray-300">{listing.description}</p>
          </p>
        </section>
      </article>
    </div>
  );
};

export default UserListingDetails;
