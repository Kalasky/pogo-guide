const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id }).select('_id role')

    if (user.role !== 'admin') {
      return res.status(401).json({ error: 'You must have admin privileges to access this route.' })
    }

    req.user = user
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'You must be logged in.' })
  }
}

module.exports = requireAuth
