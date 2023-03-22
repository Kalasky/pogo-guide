const Tournament = require('../models/Tournament')

// Create a tournament
const createTournament = async (req, res) => {
  const { name, date, rules, description } = req.body

  if (!name || !date || !rules || !description) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const tournament = new Tournament({
      name,
      date,
      rules,
      description,
      createdBy: req.user._id,
    })

    await tournament.save()
    res.status(201).json(tournament)
  } catch (err) {
    res.status(500).json({ error: 'Error creating tournament' })
  }
}

// Get all tournaments
const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({}).sort({ createdAt: -1 })
    res.status(200).json(tournaments)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tournaments' })
  }
}

// Get a specific tournament by ID
const getTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('comments.user', 'username')
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }
    res.status(200).json(tournament)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tournament' })
  }
}

// Update a tournament
const updateTournament = async (req, res) => {
  const { name, date, rules, description } = req.body

  try {
    const tournament = await Tournament.findById(req.params.id)
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    tournament.name = name || tournament.name
    tournament.date = date || tournament.date
    tournament.rules = rules || tournament.rules
    tournament.description = description || tournament.description

    await tournament.save()
    res.status(200).json(tournament)
  } catch (err) {
    res.status(500).json({ error: 'Error updating tournament' })
  }
}

// Delete a tournament
const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await tournament.remove()
    res.status(200).json({ message: 'Tournament deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Error deleting tournament' })
  }
}

// Upvote a comment
const upvoteComment = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.json({ message: 'Unauthenticated' })
  }

  try {
    const tournament = await Tournament.findById(req.params.tournamentId)
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    const comment = tournament.comments.id(req.params.commentId)
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    if (comment.likes.includes(req.user._id)) {
      comment.likes.pull(req.user._id)
    } else {
      comment.likes.push(req.user._id)
    }

    await tournament.save()
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: 'Error upvoting comment' })
  }
}

// Upvote a tournament post
const upvoteTournamentPost = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.json({ message: 'Unauthenticated' })
  }

  try {
    const tournament = await Tournament.findById(req.params.tournamentId)
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    if (tournament.likes.includes(req.user._id)) {
      tournament.likes.pull(req.user._id)
    } else {
      tournament.likes.push(req.user._id)
    }

    await tournament.save()

    res.status(200).json(tournament)
  } catch (err) {
    res.status(500).json({ error: 'Error upvoting tournament' })
  }
}

// Add a comment
const addComment = async (req, res) => {
  const { content } = req.body
  const { tournamentId } = req.params

  const userId = req.user._id

  if (!content) {
    return res.status(400).json({ error: 'Content is required' })
  }

  try {
    const tournament = await Tournament.findById(tournamentId)

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    const comment = {
      content,
      user: userId,
    }

    tournament.comments.push(comment)

    await tournament.save()

    res.status(201).json({ message: 'Comment added successfully', comment: comment })
  } catch (err) {
    res.status(500).json({ error: 'Error adding comment' })
  }
}

module.exports = {
  createTournament,
  getTournaments,
  getTournament,
  updateTournament,
  deleteTournament,
  upvoteComment,
  addComment,
  upvoteTournamentPost,
}
