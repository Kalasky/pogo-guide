import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

// single video page
const Post = () => {
  const [video, setVideo] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(`http://localhost:8000/api/videos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()

      if (res.ok) {
        setVideo(json)
      }
      console.log(json)
    }
    fetchVideo()
  }, [id])

  return (
    <div>
      <h1>{video.title}</h1>
      <ReactPlayer url={video.video} width="50%" height="100%" controls />
      <p>Description: {video.description}</p>
      <p>Peppers: {video.difficulty}</p>
      <p>Likes: {video.likes && video.likes.length}</p>
    </div>
  )
}

export default Post
