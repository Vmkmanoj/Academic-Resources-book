const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the Question Schema
const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [(v) => v.length === 4, 'Must have exactly 4 options'],
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,  // Ensuring the correct answer is within the range of options
    max: 3,  // Since we have 4 options (0-3)
  },
});

// Create the Mongoose Model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
