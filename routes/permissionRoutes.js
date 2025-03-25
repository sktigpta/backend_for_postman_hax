const express = require("express");
const {
  getPermittedVideos,
  getKnownChannels,
  deletePermittedVideo,
  deleteKnownChannel,
  addPermittedVideo,
  addKnownChannel
} = require("../controllers/permissionController");

const router = express.Router();

router.get("/permitted-videos", getPermittedVideos);
router.get("/known-channels", getKnownChannels);
router.delete("/permitted-videos/:id", deletePermittedVideo);
router.delete("/known-channels/:id", deleteKnownChannel);
router.post("/permitted-videos", addPermittedVideo);
router.post("/known-channels", addKnownChannel);


module.exports = router;
