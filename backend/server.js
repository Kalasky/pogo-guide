require('dotenv').config()

// express imports
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8000
const path = require('path')
const corsAnywhere = require('cors-anywhere')

// database imports
const mongoose = require('mongoose')

// import routes
const videoRoutes = require('./routes/videoRoutes')
const authRoutes = require('./routes/authRoutes')
const tournamentRoutes = require('./routes/tournamentRoutes')

// // cors-anywhere
// const proxy = corsAnywhere.createServer({
//   originWhitelist: [], // Allow all origins
// })


// middleware
// app.use((req, res) => {
//   req.url = req.url.replace(/^\/proxy\//, '/') // Strip '/proxy' from the front of the path.
//   proxy.emit('request', req, res) // Emit the request event.
// })
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json({ limit: '50mb' })) // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: '50mb' })) // for parsing application/x-www-form-urlencoded
app.use(cors()) // enable CORS for all routes
app.use('/', (req, res, next) => {
  console.log(`${req.method} request for ${req.url}`)
  next()
})

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((e) => console.log('DB CONNECTION ERROR: ', e))

// routes
app.use('/api/videos', videoRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/tournaments', tournamentRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
