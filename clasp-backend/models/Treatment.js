const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  treatment: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  ratings: {
    type: Array,
    required: true,
  },
});

const Treatment = mongoose.model("Treatment", treatmentSchema);

module.exports = { Treatment };
