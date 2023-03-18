const User = require('../models/User')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// login user
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    // json object that is sent to the client upon successful login
    res.status(200).json({ username: user.username, email, token, role: user.role })
  } catch (e) {
    res.status(400).json({ message: e.message })
    return
  }
}

const signup = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.signup(username, email, password)

    const token = createToken(user._id)

    res.status(200).json({ username, email, token, role: user.role })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const userProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })

    res.status(200).json({ username: user.username, email: user.email, role: user.role })

    if (!user) return res.status(404).json({ message: 'User not found' })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const updateProfile = async (req, res) => {
  console.log('updateProfile', req.body)
  try {
    const user = await User.findOne({ username: req.params.username })

    if (!user) return res.status(404).json({ message: 'User not found' })

    // check if user is authorized to perform this action (only the user can update their own profile)
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'You are not authorized to perform this action.' })
    }

    const { nameColor, pronouns, location, socialMedia, bio } = req.body

    user.nameColor = nameColor || user.nameColor
    user.bio = bio || user.bio
    user.pronouns = pronouns || user.pronouns
    user.location = location || user.location
    user.socialMedia = socialMedia || user.socialMedia

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })

const updateProfilePicture = async (req, res) => {
  const authorName = req.params.username
  const profilePicturePath = req.file.path

  try {
    const user = await User.findOne({ username: authorName })

    if (!user) {
      res.status(404).send('User not found')
      return
    }

    user.profilePicture = profilePicturePath
    await user.save()

    res.json({ profilePicture: profilePicturePath })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}

module.exports = {
  login,
  signup,
  userProfile,
  updateProfile,
  updateProfilePicture,
  upload,
}
