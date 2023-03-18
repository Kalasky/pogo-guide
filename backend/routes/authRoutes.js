const express = require('express')
const router = express.Router()
const { login, signup, userProfile, updateProfile, updateProfilePicture, upload } = require('../controllers/authController')
const requireAuth = require('../middleware/requireAuth')

// login route
router.post('/login', login)

// signup route
router.post('/signup', signup)

// profile route
router.get('/profile/:username', userProfile)

// update profile route
router.put('/profile/:username', requireAuth, updateProfile)

// update profile picture route
router.post('/profile/:username/profile-picture', requireAuth, upload.single('profilePicture'), updateProfilePicture)

module.exports = router
