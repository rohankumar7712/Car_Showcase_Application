const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");
const Car = require("../models/carModel");
const User = require("../models/User");

// Fetch all car listings (available to all authenticated users)
router.get("", ensureAuthenticated, async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch car listings", details: err.message });
  }
});

// Add a New Car Listing (Admin only)
router.post("/addcar", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ message: "Car added successfully!", car });
  } catch (err) {
    res.status(400).json({ error: "Failed to add car", details: err.message });
  }
});

// Fetch all users with role 'user' (Move this above the dynamic route)
router.get("/users", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
});

// Fetch a single car by ID (Available to all authenticated users)
router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ error: "Invalid request", details: err.message });
  }
});

// Update a car listing (Admin only)
router.put("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateDetails = req.body;
    const updatedCar = await Car.findByIdAndUpdate(id, updateDetails, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) return res.status(404).json({ error: "Car not found" });
    res.status(200).json({ message: "Car updated successfully!", updatedCar });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update car", details: err.message });
  }
});

// Delete a car listing (Admin only)
router.delete("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) return res.status(404).json({ error: "Car not found" });

    res.status(200).json({ message: "Car deleted successfully!", deletedCar });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to delete car", details: err.message });
  }
});

router.delete(
  "/users/:id",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUser = await User.findByIdAndDelete(id);
      if (!deleteUser) return res.status(404).json({ error: "User not found" });

      res
        .status(200)
        .json({ message: "User deleted successfully!", deleteUser });
    } catch (err) {
      res
        .status(400)
        .json({ error: "Failed to delete User", details: err.message });
    }
  }
);

module.exports = router;
