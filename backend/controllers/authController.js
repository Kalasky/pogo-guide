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

    res.status(200).json({ email, token, role: user.role })
  } catch (e) {
    res.status(400).json({ message: e.message })
    return
  }
}

const signup = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

    res.status(200).json({ email, token, role: user.role })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

module.exports = {
  login,
  signup,
}
