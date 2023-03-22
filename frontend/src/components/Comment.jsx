import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Comment = ({ comment }) => {
  const { id } = useParams()
  const [likes, setLikes] = useState(comment.likes?.length ?? 0)

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const email = user.email || null

    try {
      // dynamically update the url based on the current page, read from location hook
      const res = await fetch(`http://localhost:8000/api/tournaments/${id}/comments/${comment._id}/upvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, id: comment._id }),
      })
      const json = await res.json()

      if (res.ok) {
        setLikes(json.likes.length)
      }

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      <div className="flex justify-between">
        <div className="text-gray-700 font-semibold">{comment.user?.username ?? 'Unknown User'}</div>
      </div>
      <p className="text-gray-600 mt-2">{comment.content}</p>
      <div className="flex space-x-1 items-center">
        <span className="text-red-500 text-xl">
          <FontAwesomeIcon icon={faHeart} onClick={handleLike} /> {likes}
        </span>
      </div>
    </div>
  )
}

export default Comment
