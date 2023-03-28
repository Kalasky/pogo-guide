const Tournament = require('../models/Tournament')
const User = require('../models/User')
const multer = require('multer')
const admin = require('firebase-admin')

const storage = admin.storage()
const bucket = storage.bucket('gs://pogo-guide-8e1fd.appspot.com')

const multerStorage = multer.memoryStorage()

const upload = multer({ storage: multerStorage })

// Create a tournament
const createTournament = async (req, res) => {
  const { name, date, rules, description, coverImage, maxPlayers, bracketType, prizePool } = req.body

  if ((!name || !date || !rules || !description || !coverImage, !maxPlayers, !bracketType, !prizePool)) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const f = {
      name: name,
      date: date,
      rules: rules,
      description: description,
      coverImage: coverImage,
      maxPlayers: maxPlayers,
      bracketType: bracketType,
      prizePool: prizePool,
    }
    console.log('d', f.description)

    const tournament = new Tournament({
      ...f,
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
  const { name, date, rules, description, coverImage } = req.body

  try {
    const tournament = await Tournament.findById(req.params.id)
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const sanitizedTournament = {
      name: sanitizeHtml(name),
      date: sanitizeHtml(date),
      rules: sanitizeHtml(rules),
      description: sanitizeHtml(description),
      coverImage: sanitizeHtml(coverImage),
      prizePool: sanitizeHtml(prizePool),
      maxPlayers: sanitizeHtml(maxPlayers),
      bracketType: sanitizeHtml(bracketType),
    }

    tournament.name = sanitizedTournament.name || tournament.name
    tournament.date = sanitizedTournament.date || tournament.date
    tournament.rules = sanitizedTournament.rules || tournament.rules
    tournament.description = sanitizedTournament.description || tournament.description
    tournament.coverImage = sanitizedTournament.coverImage || tournament.coverImage
    tournament.prizePool = sanitizedTournament.prizePool || tournament.prizePool
    tournament.maxPlayers = sanitizedTournament.maxPlayers || tournament.maxPlayers
    tournament.bracketType = sanitizedTournament.bracketType || tournament.bracketType

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
    const user = await User.findOne({ email })

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' })
    }

    if (tournament.likes.includes(req.user._id)) {
      tournament.likes.pull(req.user._id)
      user.likedTournaments.pull(tournament._id)
    } else {
      tournament.likes.push(req.user._id)
      user.likedTournaments.push(tournament._id)
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

const uploadTournamentImage = async (req, res) => {
  console.log('uploadTournamentImage')
  if (!req.file) {
    console.log('No file uploaded.')
    res.status(400).send('No file uploaded.')
    return
  }

  // Generate a unique file name
  const fileName = `${Date.now()}-${req.file.originalname}`

  // Create a new file in the Firebase bucket
  const file = bucket.file(fileName)

  // Create a write stream to upload the image
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  })

  stream.on('error', (error) => {
    console.log(error)
    res.status(500).send('Internal server error')
  })

  stream.on('finish', async () => {
    console.log('File uploaded successfully')
    // Make the uploaded file publicly accessible
    await file.makePublic()

    // Get the public URL of the uploaded file
    const imagePath = `https://storage.googleapis.com/${bucket.name}/${file.name}`

    res.json({ image: imagePath })
  })

  // Write the image data to the write stream
  stream.end(req.file.buffer)
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
  uploadTournamentImage,
  upload,
}
