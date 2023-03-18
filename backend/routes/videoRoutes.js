const express = require('express')
const router = express.Router()
const {
  createVideoMaster,
  createVideoLegend,
  createVideoMap1,
  createVideoMap2,
  createVideoMap3,
  updateVideo,
  deleteVideo,
  getAllLegendVideos,
  getAllMasterVideos,
  getAllMap1Videos,
  getAllMap2Videos,
  getAllMap3Videos,
  likeVideo,
  searchContent,
} = require('../controllers/videoController')
const { MasterVideo, LegendVideo, Map1Video, Map2Video, Map3Video } = require('../models/Video')
const models = { LegendVideo, MasterVideo, Map1Video, Map2Video, Map3Video }
const { getSingleVideo } = require('../controllers/videoController')

// routes for getting all videos
router.get('/legend', getAllLegendVideos)
router.get('/master', getAllMasterVideos)
router.get('/map1', getAllMap1Videos)
router.get('/map2', getAllMap2Videos)
router.get('/map3', getAllMap3Videos)

// route for getting a single video
router.get('/:id', (req, res) => getSingleVideo(req, res, models))

// route for searching videos
router.get('/search/:searchTerm', searchContent)

// routes for creating a video
router.post('/master', createVideoMaster)
router.post('/legend', createVideoLegend)
router.post('/map1', createVideoMap1)
router.post('/map2', createVideoMap2)
router.post('/map3', createVideoMap3)

// route for updating a video
router.put('/:id', updateVideo)

// route for deleting a video
router.delete('/:id', deleteVideo)

// routes for liking a video
router.patch('/master', (req, res) => likeVideo(req, res, MasterVideo))
router.patch('/legend', (req, res) => likeVideo(req, res, LegendVideo))
router.patch('/map1', (req, res) => likeVideo(req, res, Map1Video))
router.patch('/map2', (req, res) => likeVideo(req, res, Map2Video))
router.patch('/map3', (req, res) => likeVideo(req, res, Map3Video))

module.exports = router
