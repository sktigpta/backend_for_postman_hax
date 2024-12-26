const express = require("express");
const {
  addHospital,
  getNearbyHospitals,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");
const router = express.Router();

router.post("/", addHospital); // Add a new hospital
router.post("/nearby", getNearbyHospitals); // Get nearby hospitals
router.put("/:id", updateHospital); // Update hospital details
router.delete("/:id", deleteHospital); // Delete a hospital

module.exports = router;
