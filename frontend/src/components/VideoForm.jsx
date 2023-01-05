import { Typography, Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useVideoContext } from '../hooks/useVideoContext'

const VideoForm = () => {
  const { dispatch } = useVideoContext()

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

  // if (!selectedRoute) {
  //   return setError('Please select a route')
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const videoObj = { title, difficulty, video, description }

    try {
      const res = await fetch(selectedRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="w-1/2 mb-10 text-center m-auto" onSubmit={handleSubmit}>
      <Typography variant="h3" className="mb-5">
        Add a New Video
      </Typography>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Video Title
        </label>
        <input
          type="text"
          placeholder="Please enter a title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            emptyFields.includes('title') && 'border-red-500'
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Difficulty
        </label>
        <input
          type="text"
          placeholder="1-5 Peppers (1 being easy, 5 being hard)"
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}
          className={`appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            emptyFields.includes('difficulty') && 'border-red-500'
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Video URL
        </label>
        <input
          type="url"
          placeholder="YouTube URL"
          onChange={(e) => setVideo(e.target.value)}
          value={video}
          className={`appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            emptyFields.includes('video') && 'border-red-500'
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Video Description
        </label>
        <input
          type="text"
          placeholder="Please enter a detailed description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            emptyFields.includes('description') && 'border-red-500'
          }`}
          minLength="100"
        />
      </div>

      <Button className="ml-3 mr-3" type="submit" color="green" onClick={() => handleRouteSelection('http://localhost:8000/api/videos/legend')}>
        Legend
      </Button>

      <Button className="ml-3 mr-3" type="submit" color="purple" onClick={() => handleRouteSelection('http://localhost:8000/api/videos/master')}>
        Master
      </Button>

      <Button className="ml-3 mr-3" type="submit" color="purple" onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map1')}>
        Map 1
      </Button>

      <Button className="ml-3 mr-3" type="submit" color="purple" onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map2')}>
        Map 2
      </Button>

      <Button className="ml-3 mr-3" type="submit" color="purple" onClick={() => handleRouteSelection('http://localhost:8000/api/videos/map3')}>
        Map 3
      </Button>

      {error && <div className="text-red-500">{error}</div>}
    </form>
  )
}

export default VideoForm
