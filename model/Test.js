const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is must define"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A test must have a duration "],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A test must have a group size "],
  },
  difficulty: {
    type: String,
    required: [true, "A test must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "price is must define"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "the test must have description"],
  },
  imageCover: {
    type: String,
    required: [true, "the test must have cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const TestModel = mongoose.model("Test", testSchema);

module.exports = TestModel;
