const express = require('express')
const router = express.Router()
const {
  createVideoMaster,
  createVideoLegend,
  createVideoMap1,
  createVideoMap2,
  createVideoMap3,
  getSingleVideo,
  updateVideo,
  deleteVideo,
  getAllLegendVideos,
  getAllMasterVideos,
  getAllMap1Videos,
  getAllMap2Videos,
  getAllMap3Videos,
} = require('../controllers/videoController')

// route for getting all legend videos
router.get('/legend', getAllLegendVideos)

// route for getting all master videos
router.get('/master', getAllMasterVideos)

// route for getting all master videos
router.get('/map1', getAllMap1Videos)

// route for getting all map videos
router.get('/map2', getAllMap2Videos)

// route for getting all map videos
router.get('/map3', getAllMap3Videos)

// route for getting a single video
router.get('/:id', getSingleVideo)

// route for creating a video
router.post('/master', createVideoMaster)
router.post('/legend', createVideoLegend)
router.post('/map1', createVideoMap1)
router.post('/map2', createVideoMap2)
router.post('/map3', createVideoMap3)

// route for updating a video
router.put('/:id', updateVideo)

// route for deleting a video
router.delete('/:id', deleteVideo)

module.exports = router
