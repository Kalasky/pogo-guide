const Video = require("../models/video")
const mongoose = require("mongoose")

// get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 })
    res.json(videos)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// get single video
const getSingleVideo = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Video not found!" })
    }

    const video = await Video.findById(id)
    if (video) {
      return res.json(video)
    }
    res.status(404).json({ message: "Video not found!" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// create a video
const createVideo = async (req, res) => {
  const { title, description, difficulty, url } = req.body
  try {
    const newVideo = await Video.create({
      title,
      description,
      difficulty,
      url,
    })
    res.json(newVideo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// update a video
const updateVideo = async (req, res) => {
  const { id } = req.params
  const { title, description, difficulty, url } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Video not found!" })
  }

  const video = await Video.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

  if (!video) {
    return res.status(404).json({ message: "Video not found!" })
  }

  res.json(video)
}

// delete a video
const deleteVideo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Video not found!" })
  }

  const video = await Video.findByIdAndRemove({ _id: id })

  if (!video) {
    return res.status(404).json({ message: "Video not found!" })
  }

  res.json({ message: "Video deleted!" })
}

// export the controller
module.exports = {
  getAllVideos,
  createVideo,
  getSingleVideo,
  updateVideo,
  deleteVideo,
}
