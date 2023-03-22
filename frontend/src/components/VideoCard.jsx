import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useVideoContext } from '../hooks/useVideoContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useModal } from './useModal'
import Modal from './Modal'
import { useNavigate, useLocation } from 'react-router-dom'

const VideoCard = ({ video }) => {
  const { dispatch } = useVideoContext()
  const user = JSON.parse(localStorage.getItem('user'))
  const [likes, setLikes] = useState(video.likes.length)
  const [isDeleted, setIsDeleted] = useState(false)
  const location = useLocation()

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
    const models = {
      '/legend': 'LegendVideo',
      '/master': 'MasterVideo',
      '/map1': 'Map1Video',
      '/map2': 'Map2Video',
      '/map3': 'Map3Video',
    }
    const model = models[location.pathname]
    try {
      const res = await fetch(`http://localhost:8000/api/videos/${video._id}?model=${model}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'GET_VIDEO', payload: json })
        navigate(`/video/${video._id}/${model}`)
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
      // dynamically update the url based on the current page, read from location hook
      const res = await fetch(`http://localhost:8000/api/videos${location.pathname}`, {
        method: 'PUT',
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
        <div className="flex justify-center items-center">
          <div className="max-w-xs container bg-white rounded-xl transform transition duration-200 hover:scale-105 shadow-xl drop-shadow-2xl">
            <div>
              <span
                className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer"
                onClick={() => openModal(video)}
              >
                {video.difficulty} Peppers
              </span>
              <span value="delete" className="text-red-500 cursor-pointer float-right mt-4 mr-4" onClick={handleClick}>
                {user && user.role === 'admin' && <FontAwesomeIcon icon={faTrashAlt} />}
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
              <h1 className="text-2xl mt-2 mb-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                {video.title}
              </h1>
            </div>
            <div style={{ height: '11rem' }}>
              <ReactPlayer url={video.video} width="100%" height="100%" controls light />
            </div>
            <p className="ml-4 mt-3 text-gray-700 text-sm">
              {hasLongDescription && !showFullDescription ? video.description.substring(0, 50) + '...' : video.description}

              {hasLongDescription && (
                <div
                  className="cursor-pointer font-bold text-slate-600"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </div>
              )}
            </p>
            <div className="flex p-4 justify-between">
              <div className="text-white text-sm mt-2">
                <button
                  onClick={handleVideoClick}
                  className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                  View Post
                </button>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-1 items-center">
                  <span className="text-gray-500 text-xs ml-2">
                    {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex space-x-1 items-center">
                  <span className="text-red-500 text-xl">
                    <FontAwesomeIcon icon={faHeart} onClick={handleLike} /> {likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoCard
