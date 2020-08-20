const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is must define"],
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, "price is mus define"],
  },
});

const TestModel = mongoose.model("Test", testSchema);

module.exports = TestModel;
