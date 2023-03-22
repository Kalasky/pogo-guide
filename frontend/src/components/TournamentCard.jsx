import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TournamentCard = ({ tournament }) => {
  const [likes, setLikes] = useState(tournament.likes.length)

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const email = user.email || null

    try {
      // dynamically update the url based on the current page, read from location hook
      const res = await fetch(`http://localhost:8000/api/tournaments/${tournament._id}/upvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, id: tournament._id }),
      })
      const json = await res.json()

      if (res.ok) {
        setLikes(json.likes.length)
      }

      if (res.status === 401) {
        alert('You must be logged in to like a post.')
      }

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <Link to={`/tournaments/${tournament._id}`} className="text-blue-500 hover:text-blue-600">
        <h2 className="text-xl font-bold">{tournament.name}</h2>
      </Link>
      <p className="text-gray-600 mt-2">{tournament.description}</p>
      <p className="text-gray-600 mt-2">{tournament.rules}</p>
      <p className="text-gray-600 mt-2">
        {new Date(tournament.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="flex space-x-1 items-center">
            <span className="text-red-500 text-xl">
              <FontAwesomeIcon icon={faHeart} onClick={handleLike} /> {likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentCard
