const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // Faster search by name
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1886, // First car invented
      max: new Date().getFullYear(), // Cannot be in the future
    },
    price: {
      type: Number,
      required: true,
      min: 1, // Price should be a valid positive number
    },
    type: {
      type: String,
      enum: [
        "Sedan",
        "SUV",
        "Coupe",
        "Hatchback",
        "Convertible",
        "Truck",
        "Van",
        "Wagon",
        "Sports Car",
        "Electric",
      ],
      default: "Sedan", // Default to Sedan if not provided
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    images: {
      type: [String],
      validate: {
        validator: (val) => val.length <= 10,
        message: "Exceeds the limit of 10 images",
      },
    },
  },
  { timestamps: true } // Automatically creates createdAt & updatedAt
);

module.exports = mongoose.model("Car", carSchema);
