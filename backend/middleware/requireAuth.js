const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
  console.log('Inside requireAuth middleware')

  // verify authentication
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' })
  }

  const token = authorization.split(' ')[1]

  try {
    // verify token by decoding it and checking if it matches the secret
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    // find user by id and select the role
    const user = await User.findOne({ _id }).select('_id role')

    // if no user is found, return error
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in.' })
    }

    req.user = user
    next()
  } catch (err) {
    console.log('requireAuth', err)
    return res.status(401).json({ error: 'You must be logged in.' })
  }
}

module.exports = requireAuth
