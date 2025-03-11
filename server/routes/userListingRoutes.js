const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Car = require("../models/carModel");
const Feedback = require("../models/feedback");
const { ensureAuthenticated, ensureUser } = require("../config/auth");

// Helper function to validate numbers
const isValidNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

// ✅ Get Feedback (🔒 Students Only)
router.get("/feedback", ensureAuthenticated, ensureUser, async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ Submit Feedback (🔒 Students Only)
router.post("/feedback", ensureAuthenticated, ensureUser, async (req, res) => {
  const { name, email, phone, hostel, description } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ success: false, message: "Description is required" });
  }

  try {
    const newFeedback = await Feedback.create({
      user: req.user._id, // ✅ Store logged-in user's ID
      name,
      email,
      phone,
      hostel,
      description,
    });

    console.log("Feedback Saved:", newFeedback);
    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/feedback/:id", ensureAuthenticated, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    // ✅ Only owner can delete their feedback
    if (feedback.email !== req.user.email) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete" });
    }

    await feedback.deleteOne();
    res.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ GET all cars
router.get("/", ensureAuthenticated, ensureUser, async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching all cars:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch car listings", details: err.message });
  }
});

// ✅ Search Cars by Brand, Type, or Price Range
router.get("/search", ensureAuthenticated, ensureUser, async (req, res) => {
  try {
    const { brand, type, minPrice, maxPrice } = req.query;

    let query = {};
    if (brand) query.brand = brand;
    if (type) query.type = type;
    if (minPrice || maxPrice)
      query.price = {
        $gte: Number(minPrice) || 0,
        $lte: Number(maxPrice) || Infinity,
      };

    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET a single car by ID (Keep this at the bottom)
router.get("/:id", ensureAuthenticated, ensureUser, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if id is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid car ID format" });
    }

    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    res.status(200).json(car);
  } catch (err) {
    console.error("Error fetching car by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
