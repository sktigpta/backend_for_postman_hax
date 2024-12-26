const express = require("express");
const { bookAppointment, updateAppointment, cancelAppointment } = require("../controllers/appointmentController");
const router = express.Router();

router.post("/", bookAppointment); // Book a new appointment
router.put("/:id", updateAppointment); // Update an existing appointment
router.delete("/:id", cancelAppointment); // Cancel an appointment

module.exports = router;
