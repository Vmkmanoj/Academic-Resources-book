const mongoose = require("mongoose");

// Define the schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Feedback: { type: String, required: true },
  Rate: { type: String, required: true },
});

// Create the model
const FeedBackDetails = mongoose.model("FeedBackModel", feedbackSchema);

// Export the model
module.exports = FeedBackDetails;
