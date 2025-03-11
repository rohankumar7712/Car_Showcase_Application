const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  hostel: String,
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
