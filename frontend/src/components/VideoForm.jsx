import React, { useState, useEffect } from 'react'
import { useVideoContext } from '../hooks/useVideoContext'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const VideoForm = () => {
  const { dispatch } = useVideoContext()
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.role === 'admin') {
      setIsAdmin(true)
    }

    if (!user) {
      navigate('/')
    }

    setAuthor(user.username)
  }, [user])

  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [video, setVideo] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)

  const handleRouteSelection = (route) => {
    setSelectedRoute(route)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // create a new video object to send to the backend server
    const videoObj = { title, author: user.username, difficulty, video, description }

    try {
      const postWorkouts = async () => {
        const res = await fetch(selectedRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
          body: JSON.stringify(videoObj),
        })

        const json = await res.json()

        if (!res.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }

        if (res.ok) {
          setTitle('')
          setDifficulty('')
          setVideo('')
          setDescription('')
          setError(null)
          setEmptyFields([])
          console.log(json)

          // dispatch the new video to the VideoContext
          dispatch({ type: 'ADD_VIDEO', payload: json })
        }
      }
      // Check if user is logged in and is an admin before posting a new video
      if (user && user.role === 'admin') {
        postWorkouts()
      } else {
        console.log('You are not authorized to add a new video')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center text-2xl font-extrabold text-gray-900 mb-5">Add a New Video</h3>
            {/* Add input fields */}
            {/* Video Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Video Title
              </label>
              <input
                type="text"
                placeholder="Please enter a title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`w-full mt-1 border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('title') && 'border-red-500'
                }`}
              />
            </div>
            {/* Difficulty */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Difficulty
              </label>
              <input
                type="text"
                placeholder="1-5 Peppers (1 being easy, 5 being hard)"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
                className={`w-full mt-1 border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('difficulty') && 'border-red-500'
                }`}
              />
            </div>
            {/* Video URL */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Video URL
              </label>
              <input
                type="url"
                placeholder="YouTube URL"
                onChange={(e) => setVideo(e.target.value)}
                value={video}
                className={`w-full mt-1 border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emptyFields.includes('video') && 'border-red-500'
                }`}
              />
            </div>
            {/* Video Description */}
            <div>
              <label htmlFor="about" className="block text-sm font-bold text-gray-700">
                Video Description
              </label>
              <div className="mt-1">
                <textarea
                  rows={3}
                  className={`w-full mt-1 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    emptyFields.includes('description') && 'border-red-500'
                  }`}
                  placeholder="Please enter a detailed description of the video"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  minLength="100"
                />
              </div>
            </div>
            {/* Author */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <input
                type="text"
                readOnly
                placeholder={author}
                value={author}
                className={
                  'w-full mt-1 border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                }
              />
            </div>
            {/* Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => handleRouteSelection('http://localhost:8000/api/videos/legend')}
              >
                Legend
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => handleRouteSelection('http://localhost:8000/api/videos/master')}
              >
                Master
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map1')}
              >
                Map 1
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map2')}
              >
                Map 2
              </button>
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map3')}
              >
                Map 3
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold">You are not authorized to view this page.</h1>
      </div>
    )
  }
}

export default VideoForm
