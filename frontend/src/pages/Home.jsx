import { useEffect, useState } from 'react'

// components
import VideoDetails from '../components/VideoDetails'

const Home = () => {
  const [videos, setVideos] = useState(null)
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:8000/api/videos')
      const json = await res.json()

      if (res.status !== 200) {
        throw Error(json.message)
      }

      setVideos(json)
      console.log(json)
    }

    fetchVideos()
  }, [])

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="videos">
        {videos && videos.map((video) => <VideoDetails key={video._id} video={video} />)}
      </div>
    </div>
  )
}

export default Home
