const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
});

hospitalSchema.index({ location: "2dsphere" }); // For geospatial queries

module.exports = mongoose.model("Hospital", hospitalSchema);
