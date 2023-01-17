import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useVideoContext } from '../hooks/useVideoContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useModal } from './useModal'
import Modal from './Modal'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const VideoCard = ({ video }) => {
  const { dispatch } = useVideoContext()
  const user = JSON.parse(localStorage.getItem('user'))
  const [likes, setLikes] = useState(video.likes.length)
  const [isDeleted, setIsDeleted] = useState(false)

  const [showFullDescription, setShowFullDescription] = useState(false)
  const hasLongDescription = video.description.length > 150

  const { isOpen, openModal, closeModal } = useModal()

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/videos/${video._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'DELETE_VIDEO', payload: json })
        setIsDeleted(true)
      }

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  // route to single video page
  const handleVideoClick = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/videos/${video._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'GET_VIDEO', payload: json })
        navigate(`/video/${video._id}`)
      }

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      return alert('You must be logged in to like a video')
    }

    const email = user.email || null

    try {
      const res = await fetch(`http://localhost:8000/api/videos/master`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, id: video._id }),
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
    <>
      {!isDeleted && (
        <div className="bg-slate-800 rounded-2xl shadow-2xl border p-6 w-72">
          <ReactPlayer url={video.video} width="100%" height="100%" controls />
          <h5 className="text-white font-bold text-lg mb-4 mt-3">{video.title}</h5>
          <div className="text-white text-sm">
            {hasLongDescription && !showFullDescription ? video.description.substring(0, 150) + '...' : video.description}

            {hasLongDescription && (
              <div className="cursor-pointer font-bold" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? 'Show Less' : 'Show More'}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold cursor-pointer" onClick={openModal}>
                {video.difficulty}
              </span>
              <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                title="Task Difficulty Rating"
                message={
                  <>
                    Peppers are a widely used system to indicate the level of difficulty of a task or challenge. They are a quick
                    and easy way for players to understand the level of difficulty they can expect from a task. Peppers can range
                    from one pepper for easy tasks to seven peppers for nearly impossible tasks.
                    <br />
                    <br />
                    Each post on the website has a creator rating and a community rating. The creator rating is assigned by the
                    person who created the post and reflects their personal perception of the difficulty of the task. The
                    community rating is the average rating assigned by users who have completed the task. These ratings are used
                    to give players an idea of the difficulty level they can expect from a task, and to help them compare the
                    difficulty level of different tasks.
                    <br />
                    <br />
                    <span className="text-green-500 font-bold">1 Pepper</span> - Casual <br />
                    <span className="text-yellow-500 font-bold">2 Peppers</span> - Novice <br />
                    <span className="text-orange-500 font-bold">3 Peppers</span> - Intermediate <br />
                    <span className="text-red-500 font-bold">4 Peppers</span> - Advanced <br />
                    <span className="text-red-600 font-bold">5 Peppers</span> - Hardcore <br />
                    <span className="text-red-700 font-bold">6 Peppers</span> - Elite <br />
                    <span className="text-red-800 font-bold">7 Peppers</span> - Nightmare <br />
                  </>
                }
              />
              <span className="text-white text-xs">{formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}</span>
              <span className="text-white text-xs">
                <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} /> {likes}
              </span>
            </div>
            {user && user.role === 'admin' && (
              <div value="delete" className="text-red-500 cursor-pointer" onClick={handleClick}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            )}
          </div>
          <div className="text-white text-sm mt-4">
            <Link to={`/videos/${video._id}`} onClick={handleVideoClick}>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">View Post</button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoCard
