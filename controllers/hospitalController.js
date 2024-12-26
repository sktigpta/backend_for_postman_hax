const axios = require('axios');
const Hospital = require("../models/hospitalModel");

const GOOGLE_API_KEY = 'AIzaSyDpGBL6L6BhaV0LcOPmu3REt2W7oD7tHbA';

// Controller to add a new hospital
const addHospital = async (req, res) => {
  try {
    const { name, address, contact, latitude, longitude } = req.body;

    // Validate required fields
    if (!name || !address || !contact || latitude === undefined || longitude === undefined) {
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

// Controller to get nearby hospitals using req.body
const getNearbyHospitals = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: 'Latitude and Longitude are required in the request body.',
      });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        message: 'Latitude and Longitude must be valid numbers.',
      });
    }

    const placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

    const params = {
      location: `${latitude},${longitude}`,
      radius: 5000,
      type: 'hospital',
      key: GOOGLE_API_KEY,
    };

    const response = await axios.get(placesUrl, { params });

    if (response.data.status === 'OK') {
      const hospitals = response.data.results.map((hospital) => ({
        name: hospital.name,
        address: hospital.vicinity,
        rating: hospital.rating || 'N/A',
        location: {
          lat: hospital.geometry.location.lat,
          lng: hospital.geometry.location.lng,
        },
      }));

      return res.status(200).json({
        message: 'Nearby hospitals found.',
        hospitals: hospitals,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to fetch nearby hospitals.',
        error: response.data.error_message || 'Unknown error.',
      });
    }
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error.message);
    return res.status(500).json({
      message: 'Error fetching nearby hospitals.',
      error: error.message,
    });
  }
};

// Controller to update hospital details
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact, latitude, longitude } = req.body;

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    if (name) hospital.name = name;
    if (address) hospital.address = address;
    if (contact) hospital.contact = contact;
    if (latitude !== undefined && longitude !== undefined) {
      hospital.location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

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

// Exporting all controllers
module.exports = {
  addHospital,
  getNearbyHospitals,
  updateHospital,
  deleteHospital,
};
