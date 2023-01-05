const express = require("express")
const router = express.Router()
const {
  getAllVideos,
  createVideoMaster,
  createVideoLegend,
  getSingleVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController")

// route for getting all videos
router.get("/", getAllVideos)

// route for getting a single video
router.get("/:id", getSingleVideo)

// route for creating a video
router.post("/master", createVideoMaster)
router.post("/legend", createVideoLegend)

// route for updating a video
router.put("/:id", updateVideo)

// route for deleting a video
router.delete("/:id", deleteVideo)

module.exports = router
