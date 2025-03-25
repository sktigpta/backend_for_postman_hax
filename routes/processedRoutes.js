const express = require("express");
const { getProcessedVideo } = require("../controllers/getProcessedVideo.js");

const router = express.Router();

router.get("/", getProcessedVideo);

module.exports = router;
