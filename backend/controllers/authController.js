const User = require('../models/User')
const jwt = require('jsonwebtoken')

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
    const user = await User.findOne({username: req.params.username})

    res.status(200).json({ username: user.username, email: user.email, role: user.role })

    if (!user) return res.status(404).json({ message: 'User not found' })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

module.exports = {
  login,
  signup,
  userProfile,
}
