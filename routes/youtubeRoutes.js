const express = require("express");
const { getYouTubeVideos, getStoredVideos } = require("../controllers/youtubeController");

const router = express.Router();

router.post("/get-videos", getYouTubeVideos);
router.get("/stored-videos", getStoredVideos);

module.exports = router;
