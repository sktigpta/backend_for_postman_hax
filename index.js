require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./config/firebase.js");

const youtubeRoutes = require("./routes/youtubeRoutes.js");
const searchQueriesRoute = require("./routes/searchQueries.js");
const gettingPermissionIds = require("./routes/permissionRoutes.js");
const processedRoutes = require("./routes/processedRoutes.js");
const dmcaRoutes = require("./routes/dmcaRoutes.js");

const app = express();

const allowedOrigins = [
  `http://localhost:${process.env.FRONTEND_PORT}`,
  process.env.SECONDARY_FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/youtube", youtubeRoutes);
app.use("/api/search-queries", searchQueriesRoute);
app.use("/api/permissions", gettingPermissionIds);
app.use("/api/processed", processedRoutes);
app.use("/api/dmca", dmcaRoutes);

module.exports = app;
