const mongoose = require('mongoose')
const LegendVideo = require('../models/Video').LegendVideo
const MasterVideo = require('../models/Video').MasterVideo
const Map1Video = require('../models/Video').Map1Video
const Map2Video = require('../models/Video').Map2Video
const Map3Video = require('../models/Video').Map3Video

// get all legend videos
const getAllLegendVideos = async (req, res) => {
  try {
    const videos = await LegendVideo.find().sort({ createdAt: -1 })
    res.json(videos)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// get all master videos
const getAllMasterVideos = async (req, res) => {
  try {
    const videos = await MasterVideo.find().sort({ createdAt: -1 })
    res.json(videos)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// get all master videos
const getAllMap1Videos = async (req, res) => {
  try {
    const videos = await Map1Video.find().sort({ createdAt: -1 })
    res.json(videos)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// get all master videos
const getAllMap2Videos = async (req, res) => {
  try {
    const videos = await Map2Video.find().sort({ createdAt: -1 })
    res.json(videos)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// get all master videos
const getAllMap3Videos = async (req, res) => {
  try {
    const videos = await Map3Video.find().sort({ createdAt: -1 })
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
      return res.status(404).json({ message: 'Video not found!' })
    }

    const video = await Video.findById(id)
    if (video) {
      return res.json(video)
    }
    res.status(404).json({ message: 'Video not found!' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// create a video
const createVideoMaster = async (req, res) => {
  const { title, description, difficulty, video } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!description) {
    emptyFields.push('description')
  }

  if (!difficulty) {
    emptyFields.push('difficulty')
  }

  if (!video) {
    emptyFields.push('video')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const newVideo = await MasterVideo.create({
      title,
      description,
      difficulty,
      video,
    })
    res.json(newVideo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

const createVideoLegend = async (req, res) => {
  const { title, description, difficulty, video } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!description) {
    emptyFields.push('description')
  }

  if (!difficulty) {
    emptyFields.push('difficulty')
  }

  if (!video) {
    emptyFields.push('video')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const newVideo = await LegendVideo.create({
      title,
      description,
      difficulty,
      video,
    })
    res.json(newVideo)
    console.log(newVideo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

const createVideoMap1 = async (req, res) => {
  const { title, description, difficulty, video } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!description) {
    emptyFields.push('description')
  }

  if (!difficulty) {
    emptyFields.push('difficulty')
  }

  if (!video) {
    emptyFields.push('video')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const newVideo = await Map1Video.create({
      title,
      description,
      difficulty,
      video,
    })
    res.json(newVideo)
    console.log(newVideo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

const createVideoMap2 = async (req, res) => {
  const { title, description, difficulty, video } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!description) {
    emptyFields.push('description')
  }

  if (!difficulty) {
    emptyFields.push('difficulty')
  }

  if (!video) {
    emptyFields.push('video')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const newVideo = await Map2Video.create({
      title,
      description,
      difficulty,
      video,
    })
    res.json(newVideo)
    console.log(newVideo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

const createVideoMap3 = async (req, res) => {
  const { title, description, difficulty, video } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!description) {
    emptyFields.push('description')
  }

  if (!difficulty) {
    emptyFields.push('difficulty')
  }

  if (!video) {
    emptyFields.push('video')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const newVideo = await Map3Video.create({
      title,
      description,
      difficulty,
      video,
    })
    res.json(newVideo)
    console.log(newVideo)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

// update a video
const updateVideo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Video not found!' })
  }

  const video = await Video.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

  if (!video) {
    return res.status(404).json({ message: 'Video not found!' })
  }

  res.json(video)
}

// delete a video
const deleteVideo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Video not found!' })
  }

  const video = await Video.findByIdAndRemove({ _id: id })

  if (!video) {
    return res.status(404).json({ message: 'Video not found!' })
  }

  res.json({ message: 'Video deleted!' })
}

module.exports = {
  getAllLegendVideos,
  getAllMasterVideos,
  getAllMap1Videos,
  getAllMap2Videos,
  getAllMap3Videos,
  createVideoMaster,
  createVideoLegend,
  createVideoMap1,
  createVideoMap2,
  createVideoMap3,
  getSingleVideo,
  updateVideo,
  deleteVideo,
}
