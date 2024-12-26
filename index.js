const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

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

// Connect to MongoDB
connectDB();

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

// Start the server on port 5000
const PORT = process.env.PORT || 5000; // Use environment variable for flexibility
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
