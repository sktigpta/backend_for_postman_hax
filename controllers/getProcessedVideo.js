const admin = require("firebase-admin");

const db = admin.firestore();


const getProcessedVideo = async (req, res) => {
    try {
        const videoSnapshot = await db.collection("processed_videos").get();

        if (videoSnapshot.empty) {
            return res.status(404).json({ error: "No processed videos found" });
        }

        const videos = videoSnapshot.docs.map(doc => {
            const data = doc.data();
            const copyPercentage = data.copy_percentage || 0;

            return {
                videoId: doc.id,
                copied: copyPercentage > 40,
                copyPercentage,
                processedAt: data.processed_at || "Unknown",
                timestamps: data.timestamps || [],
                videoIdFirebase: data.video_id || doc.id,
            };
        });

        res.status(200).json({ videos });

    } catch (error) {
        console.error("Error fetching processed videos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getProcessedVideo };
