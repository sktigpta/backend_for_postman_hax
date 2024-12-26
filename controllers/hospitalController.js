const Hospital = require("../models/hospitalModel");

// Controller to add a new hospital
const addHospital = async (req, res) => {
  try {
    const { name, address, contact, latitude, longitude } = req.body;

    // Validate required fields
    if (!name || !address || !contact || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new hospital
    const newHospital = new Hospital({
      name,
      address,
      contact,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    // Save hospital to database
    await newHospital.save();

    res.status(201).json({ message: "Hospital added successfully.", newHospital });
  } catch (error) {
    console.error("Error adding hospital:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to get nearby hospitals
const getNearbyHospitals = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required." });
    }

    // Query hospitals within the specified distance (in meters)
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    });

    res.status(200).json({ hospitals });
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to update hospital details
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact, latitude, longitude } = req.body;

    // Find the hospital by ID
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    // Update the fields if provided
    if (name) hospital.name = name;
    if (address) hospital.address = address;
    if (contact) hospital.contact = contact;
    if (latitude && longitude) {
      hospital.location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

    // Save updated hospital
    const updatedHospital = await hospital.save();

    res.status(200).json({
      message: "Hospital updated successfully.",
      updatedHospital,
    });
  } catch (error) {
    console.error("Error updating hospital:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to delete a hospital
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the hospital
    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    res.status(200).json({
      message: "Hospital deleted successfully.",
      deletedHospital,
    });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  addHospital,
  getNearbyHospitals,
  updateHospital,
  deleteHospital,
};
