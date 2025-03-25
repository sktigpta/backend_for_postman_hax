const { fetchYouTubeVideos } = require("../controllers/youtubeController");

setInterval(async () => {
  console.log("Fetching new YouTube videos...");
  await fetchYouTubeVideos();
}, 10 * 60 * 1000);
