const express = require('express')
const router = express.Router()
const {
  createTournament,
  getTournaments,
  getTournament,
  updateTournament,
  deleteTournament,
  upvoteComment,
  addComment,
  upvoteTournamentPost,
  uploadTournamentImage,
  upload
} = require('../controllers/tournamentController')
const requireAuth = require('../middleware/requireAuth')

router.post('/', requireAuth, createTournament)
router.get('/', getTournaments)
router.get('/:id', getTournament)
router.put('/:id', requireAuth, updateTournament)
router.delete('/:id', requireAuth, deleteTournament)
router.put('/:tournamentId/comments/:commentId/upvote', requireAuth, upvoteComment)
router.post('/:tournamentId/comments', requireAuth, addComment)
router.put('/:tournamentId/upvote', requireAuth, upvoteTournamentPost)
router.post('/upload-image', requireAuth, upload.single('image'), uploadTournamentImage)

module.exports = router
