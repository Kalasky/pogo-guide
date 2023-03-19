const nodemailer = require('nodemailer')
require('dotenv').config();

const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // Set up the email data
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `Click the link below to reset your password:\n\nhttp://localhost:5173/reset-password/${token}\n\nIf you didn't request this, please ignore this email.`,
  }

  // Send the email
  try {
    await transporter.sendMail(mailOptions)
    console.log('Password reset email sent.')
  } catch (error) {
    console.error('Error sending password reset email:', error)
  }
}

module.exports = {
  sendPasswordResetEmail,
}
