import React from 'react'
import Comment from './Comment'

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments && comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentsList
