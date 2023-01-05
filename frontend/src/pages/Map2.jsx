import { useEffect } from 'react'
import { useVideoContext } from '../hooks/useVideoContext'

// components
import VideoDetails from '../components/VideoDetails'

const Map2 = () => {
  const { videos, dispatch } = useVideoContext()

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:8000/api/videos/map2')
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_VIDEOS', payload: json })
      }
    }

    fetchVideos()
  }, [dispatch])

  return (
    <div className="map2">
      <div className="videos flex flex-wrap items-center justify-center">{videos && videos.map((video) => <VideoDetails key={video._id} video={video} />)}</div>
    </div>
  )
}

export default Map2
