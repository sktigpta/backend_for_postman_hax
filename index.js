const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS setup
const corsOptions = {
  origin: ["https://ambulance-frontend.vercel.app", "http://localhost:5173"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Include PATCH
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies/authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware for JSON parsing
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI) // Removed deprecated options
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  });

// Import routes
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const recordRoutes = require("./routes/recordRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/hospitals", hospitalRoutes); // Hospital locator routes
app.use("/api/records", recordRoutes); // Health records routes
app.use("/api/appointments", appointmentRoutes); // Appointment scheduling routes

// Export the app for Vercel compatibility
module.exports = app;
