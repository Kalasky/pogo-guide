import React, { useState } from 'react'

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(commentText)
    setCommentText('')
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="border rounded-md px-3 py-2 w-full mr-2"
        placeholder="Write a comment..."
      />
      <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none">
        Post Comment
      </button>
    </form>
  )
}

export default CommentForm
