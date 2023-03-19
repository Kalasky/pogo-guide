const User = require('../models/User')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const admin = require('firebase-admin')

const serviceAccount = require('../../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const storage = admin.storage()
const bucket = storage.bucket('gs://pogo-guide-8e1fd.appspot.com')

const multerStorage = multer.memoryStorage()

const upload = multer({ storage: multerStorage })

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

const updateProfilePicture = async (req, res) => {
  const authorName = req.params.username

  if (!req.file) {
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
    // Make the uploaded file publicly accessible
    await file.makePublic()

    // Get the public URL of the uploaded file
    const profilePicturePath = `https://storage.googleapis.com/${bucket.name}/${file.name}`

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
  })

  // Write the image data to the write stream
  stream.end(req.file.buffer)
}

module.exports = {
  login,
  signup,
  userProfile,
  updateProfile,
  updateProfilePicture,
  upload,
}
