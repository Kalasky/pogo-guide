import React, { useState, useEffect } from 'react'
import { useVideoContext } from '../hooks/useVideoContext'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const VideoForm = () => {
  const { dispatch } = useVideoContext()
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.role === 'admin') {
      setIsAdmin(true)
    }

    if (!user) {
      navigate('/')
    }
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

    const videoObj = { title, difficulty, video, description }

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
          console.log('New Video Added!')

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
      <form className="mb-10 text-center m-auto" onSubmit={handleSubmit}>
        <h3>Add a New Video</h3>
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="name">
            Video Title
          </label>
          <input
            type="text"
            placeholder="Please enter a title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={`lg:w-3/6 mt-1 block w-3/6 m-auto appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emptyFields.includes('title') && 'border-red-500'
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="name">
            Difficulty
          </label>
          <input
            type="text"
            placeholder="1-5 Peppers (1 being easy, 5 being hard)"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
            className={`lg:w-3/6 mt-1 block w-3/6 m-auto appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emptyFields.includes('difficulty') && 'border-red-500'
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="name">
            Video URL
          </label>
          <input
            type="url"
            placeholder="YouTube URL"
            onChange={(e) => setVideo(e.target.value)}
            value={video}
            className={`lg:w-3/6 mt-1 block w-3/6 m-auto appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emptyFields.includes('video') && 'border-red-500'
            }`}
          />
        </div>
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-100">
            Video Description
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              className={`m-auto lg:w-3/6 mt-1 block w-3/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  ${
                emptyFields.includes('description') && 'border-red-500'
              }`}
              placeholder="Please enter a detailed description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              minLength="100"
            />
          </div>
        </div>
        <div className='mt-6'>
          <button
            className="btn-primary rounded-l-lg"
            type="submit"
            color="green"
            onClick={() => handleRouteSelection('http://localhost:8000/api/videos/legend')}
          >
            Legend
          </button>
          <button
            className="btn-primary"
            type="submit"
            color="purple"
            onClick={() => handleRouteSelection('http://localhost:8000/api/videos/master')}
          >
            Master
          </button>
          <button
            className="btn-primary"
            type="submit"
            color="purple"
            onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map1')}
          >
            Map 1
          </button>
          <button
            className="btn-primary"
            type="submit"
            color="purple"
            onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map2')}
          >
            Map 2
          </button>
          <button
            className="btn-primary rounded-r-lg"
            type="submit"
            color="purple"
            onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map3')}
          >
            Map 3
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
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
