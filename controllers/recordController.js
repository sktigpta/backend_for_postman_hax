const Record = require("../models/recordModel");

// Controller to add a new health record
const addRecord = async (req, res) => {
  try {
    const { title, description, type, date } = req.body;
    const userId = req.user.id; // Extracted from the authentication middleware

    // Validate input
    if (!title || !description || !type || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new record
    const newRecord = new Record({
      user: userId,
      title,
      description,
      type,
      date,
    });

    // Save the record to the database
    await newRecord.save();

    res.status(201).json({ message: "Health record added successfully.", newRecord });
  } catch (error) {
    console.error("Error adding health record:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to fetch all health records for a user
const getUserRecords = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the authentication middleware

    // Find all records for the user
    const records = await Record.find({ user: userId });

    res.status(200).json({ records });
  } catch (error) {
    console.error("Error fetching health records:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to update a health record
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, date } = req.body;

    // Find the record by ID
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Health record not found." });
    }

    // Ensure the record belongs to the logged-in user
    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this record." });
    }

    // Update the fields if provided
    if (title) record.title = title;
    if (description) record.description = description;
    if (type) record.type = type;
    if (date) record.date = date;

    // Save the updated record
    const updatedRecord = await record.save();

    res.status(200).json({
      message: "Health record updated successfully.",
      updatedRecord,
    });
  } catch (error) {
    console.error("Error updating health record:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller to delete a health record
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the record by ID
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Health record not found." });
    }

    // Ensure the record belongs to the logged-in user
    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this record." });
    }

    // Delete the record
    await record.remove();

    res.status(200).json({ message: "Health record deleted successfully." });
  } catch (error) {
    console.error("Error deleting health record:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  addRecord,
  getUserRecords,
  updateRecord,
  deleteRecord,
};
