import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

// components
import NavBar from '../components/Navbar'

// Font Awesome
import { motion } from 'framer-motion'

const Post = () => {
  const [video, setVideo] = useState({})
  const { id, model } = useParams()

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(`http://localhost:8000/api/videos/${id}?model=${model}`, {
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
  }, [id, model])

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };


  return (
    <>
      <section className="hero-section bg-gradient-to-br from-pink-300 to-fuchsia-600">
        <NavBar />
        <div className="container mx-auto px-4 py-20">
          
        <motion.h1
            className="text-5xl font-bold text-white mb-8"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            {video.title}
          </motion.h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-0 pb-[56.25%]">
              <ReactPlayer url={video.video} width="100%" height="100%" controls className="absolute top-0 left-0" />
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">{video.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Peppers:</span>
                  <span className="font-medium text-gray-600">{video.difficulty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Likes:</span>
                  <span className="font-medium text-gray-600">{video.likes && video.likes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Post
