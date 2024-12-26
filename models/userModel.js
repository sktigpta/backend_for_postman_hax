const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  healthData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }], // Link to health records
});

module.exports = mongoose.model("User", userSchema);
