const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      default: '',
    },
    resetPasswordExpires: {
      type: Date,
      default: Date.now,
    },
    likedTournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
    role: {
      type: String,
      default: 'user',
    },
    nameColor: {
      type: String,
      default: '#000000',
    },
    profilePicture: {
      type: String,
      default: '',
    },
    pronouns: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    socialMedia: {
      discord: {
        type: String,
        default: '',
      },
      twitch: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
      youtube: {
        type: String,
        default: '',
      },
      spotify: {
        type: String,
        default: '',
      },
    },
  },
  { timestamps: true }
)

// static method to signup user
UserSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error('All fields are required')
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid')
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough')
  }

  const exists = await this.findOne({ $or: [{ email }, { username }] })

  if (exists) {
    if (exists.email === email) {
      throw new Error('Email already exists')
    }
    if (exists.username === username) {
      throw new Error('Username already exists')
    }
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create a new user with hashed password
  const user = await this.create({ username, email, password: hashedPassword })

  return user
}

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw new Error('Email does not exist')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw new Error('Password is incorrect')
  }

  return user
}

module.exports = mongoose.model('User', UserSchema)
