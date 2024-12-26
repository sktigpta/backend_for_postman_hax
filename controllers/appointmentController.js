const Appointment = require("../models/appointmentModel");
const Hospital = require("../models/hospitalModel");
const User = require("../models/userModel");

// Controller to book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, hospitalId, date, timeSlot } = req.body;

    // Validate required fields
    if (!userId || !hospitalId || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    // Create a new appointment
    const appointment = new Appointment({
      userId,
      hospitalId,
      date,
      timeSlot,
    });

    // Save the appointment to the database
    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to update an existing appointment
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, timeSlot, status } = req.body;

    // Find the appointment by ID
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Update the appointment fields
    if (date) appointment.date = date;
    if (timeSlot) appointment.timeSlot = timeSlot;
    if (status) appointment.status = status;

    // Save the updated appointment
    const updatedAppointment = await appointment.save();

    res.status(200).json({
      message: "Appointment updated successfully.",
      updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the appointment by ID
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json({
      message: "Appointment canceled successfully.",
      deletedAppointment,
    });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  bookAppointment,
  updateAppointment,
  cancelAppointment,
};
