import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { token } = useParams()
  const [message, setMessage] = useState('')

  const history = useNavigate()

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to reset password')
      }

      const data = await response.json()
      setMessage(data.message || 'Password reset successfully')

      // Redirect to the login page after a short delay
      setTimeout(() => {
        history('/login')
      }, 2000)
    } catch (error) {
      console.error('Error resetting password:', error.message)
      setMessage(error.message)
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <p>{message}</p>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New Password" />
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="Confirm Password"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  )
}

export default ResetPassword
