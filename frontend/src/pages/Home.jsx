import { useEffect, useState } from 'react'

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
        {videos &&
          videos.map((video) => (
            <div key={video._id}>
              <h2>
                {video.title} {video.difficulty}
              </h2>
              <p>{video.description}</p>
              <video src={video.video + '#t=0.1'} controls />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Home
