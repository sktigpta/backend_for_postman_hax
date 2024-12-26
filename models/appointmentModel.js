const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
  status: { type: String, default: "Scheduled" }, // "Scheduled", "Completed", "Cancelled"
});

module.exports = mongoose.model("Appointment", appointmentSchema);