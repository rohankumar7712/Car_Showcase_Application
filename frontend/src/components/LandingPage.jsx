import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import carBg from "../assets/car1.avif"; // Ensure this image exists in src/assets

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${carBg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center md:text-left">
        <motion.h1
          className="text-5xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Find Your Dream Car
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mt-4 max-w-4xl leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Discover the perfect car for you with our seamless search and booking
          experience. Browse through a diverse collection of vehicles, view
          high-quality images, read user reviews, and make informed decisions
          effortlessly.
        </motion.p>

        <motion.div
          className="mt-6 space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            to="/allfeature"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition"
          >
            View Features
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
