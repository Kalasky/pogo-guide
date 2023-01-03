import ReactPlayer from 'react-player'

const VideoDetails = ({ video }) => {
  return (
    <div className="video-details">
      <h2>
        {video.title} {video.difficulty}
      </h2>
      <ReactPlayer url={video.video} width="100%" height="100%" controls />
      <p>{video.description}</p>
      <p>{video.createdAt}</p>
      <p>{video.updatedAt}</p>
    </div>
  )
}

export default VideoDetails
