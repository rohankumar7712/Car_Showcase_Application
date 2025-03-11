import React from "react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      title: "🚘 Explore Cars",
      description:
        "Browse a variety of cars with detailed specifications and images.",
    },
    {
      title: "🔍 Advanced Search",
      description:
        "Filter cars based on brand, type, and price range to find the perfect match.",
    },
    {
      title: "📝 Submit Feedback",
      description:
        "Share your experiences and reviews on the cars you've explored.",
    },
    {
      title: "👀 View Feedback",
      description:
        "See what others have to say about different cars before making a decision.",
    },
    {
      title: "🗑️ Delete Your Feedback",
      description:
        "Easily remove feedback you have posted, ensuring complete control.",
    },
    {
      title: "🔐 Secure Authentication",
      description:
        "Role-based access ensures only authorized users can perform actions.",
    },
    {
      title: "🛠️ Admin Dashboard",
      description:
        "Admins can add, update, or delete car listings for better management.",
    },
    {
      title: "📱 Mobile Optimized",
      description: "A fully responsive design that looks great on all devices.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-white">
          🚗 Car Showcase
        </Link>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-10 py-10 px-6">
        <Link
          to="/dashboard"
          className="text-4xl font-bold text-center text-gray-100 mb-6"
        >
          Car Showcase Features
        </Link>
        <p className="text-gray-400 text-center mb-8">
          Explore all the functionalities available in this sleek car showcase
          platform.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg flex items-start space-x-4 hover:bg-gray-800 transition duration-300"
            >
              <span className="text-3xl">{feature.title.split(" ")[0]}</span>
              <div>
                <h2 className="text-xl font-semibold">
                  {feature.title.slice(2)}
                </h2>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
