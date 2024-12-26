const express = require("express");
const {
  addRecord,
  getUserRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, addRecord); // Add a new health record
router.get("/", protect, getUserRecords); // Get all health records for a user
router.put("/:id", protect, updateRecord); // Update a health record
router.delete("/:id", protect, deleteRecord); // Delete a health record

module.exports = router;
