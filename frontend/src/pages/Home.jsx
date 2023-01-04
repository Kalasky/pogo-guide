import { useEffect } from 'react'
import { useVideoContext } from '../hooks/useVideoContext'

// components
import VideoDetails from '../components/VideoDetails'

const Home = () => {
  const { videos, dispatch } = useVideoContext()

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:8000/api/videos')
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_VIDEOS', payload: json })
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="home">
      <div className="videos">{videos && videos.map((video) => <VideoDetails key={video._id} video={video} />)}</div>
    </div>
  )
}

export default Home
