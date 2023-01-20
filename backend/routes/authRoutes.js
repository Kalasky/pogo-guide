const express = require('express')
const router = express.Router()
const { login, signup, userProfile } = require('../controllers/authController')

// login route
router.post('/login', login)

// signup route
router.post('/signup', signup)

// profile route username as param
router.get('/profile/:username', userProfile)

module.exports = router
