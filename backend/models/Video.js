const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LegendVideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

const MasterVideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

const Map1VideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

const Map2VideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

const Map3VideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

const LegendVideo = mongoose.model('LegendVideo', LegendVideoSchema)
const MasterVideo = mongoose.model('MasterVideo', MasterVideoSchema)
const Map1Video = mongoose.model('Map1Video', Map1VideoSchema)
const Map2Video = mongoose.model('Map2Video', Map2VideoSchema)
const Map3Video = mongoose.model('Map3Video', Map3VideoSchema)

module.exports = { LegendVideo, MasterVideo, Map1Video, Map2Video, Map3Video }
