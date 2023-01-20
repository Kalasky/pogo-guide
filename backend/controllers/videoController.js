const mongoose = require('mongoose')
const { LegendVideo, MasterVideo, Map1Video, Map2Video, Map3Video } = require('../models/Video')

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
const getSingleVideo = async (req, res, models) => {
  try {
    const { id } = req.params
    const model = req.query.model
    console.log('model: ', model)
    if (!models[model]) return res.status(404).json({ message: 'Model not found!' })

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Video not found!' })
    }

    const video = await models[model].findById(id)

    console.log(video)

    if (video) {
      return res.json(video)
    }
    res.status(404).json({ message: 'Video not found!' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

const validateVideoFields = (title, description, difficulty, video) => {
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
}

// create a video
const createVideoMaster = async (req, res) => {
  const { title, author, description, difficulty, video } = req.body
  validateVideoFields(title, description, difficulty, video)
  try {
    const newVideo = await MasterVideo.create({
      title,
      author,
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
  const { title, author, description, difficulty, video } = req.body
  validateVideoFields(title, description, difficulty, video)
  try {
    const newVideo = await LegendVideo.create({
      title,
      author,
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
  const { title, author, description, difficulty, video } = req.body
  validateVideoFields(title, description, difficulty, video)
  try {
    const newVideo = await Map1Video.create({
      title,
      author,
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
  const { title, author, description, difficulty, video } = req.body
  validateVideoFields(title, description, difficulty, video)
  try {
    const newVideo = await Map2Video.create({
      title,
      author,
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
  const { title, author, description, difficulty, video } = req.body
  validateVideoFields(title, description, difficulty, video)
  try {
    const newVideo = await Map3Video.create({
      title,
      author,
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

  const LegendVideoModel = await LegendVideo.findByIdAndRemove({ _id: id })
  const MasterVideoModel = await MasterVideo.findByIdAndRemove({ _id: id })
  const Map1VideoModel = await Map1Video.findByIdAndRemove({ _id: id })
  const Map2VideoModel = await Map2Video.findByIdAndRemove({ _id: id })
  const Map3VideoModel = await Map3Video.findByIdAndRemove({ _id: id })

  if (!LegendVideoModel && !MasterVideoModel && !Map1VideoModel && !Map2VideoModel && !Map3VideoModel) {
    return res.status(404).json({ message: 'Video not found!' })
  }

  res.json({ message: 'Video deleted!' })
}

// handle video likes
const likeVideo = async (req, res, model) => {
  const { id } = req.body
  const { email } = req.body

  if (!email) {
    return res.json({ message: 'Unauthenticated' })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Video not found!' })
  }

  const video = await model.findById(id)

  const index = video.likes.findIndex((email) => email === req.body.email)

  if (index === -1) {
    video.likes.push(email)
  } else {
    video.likes = video.likes.filter((email) => email !== req.body.email)
  }

  const updatedVideo = await model.findByIdAndUpdate(id, { likes: video.likes }, { new: true })

  res.json(updatedVideo)
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
  likeVideo,
}
