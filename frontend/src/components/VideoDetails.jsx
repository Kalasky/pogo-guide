import VideoCard from './VideoCard'

const VideoDetails = ({ video }) => {
  return (
    <div className="video-details">
      <VideoCard video={video} />
    </div>
  )
}

export default VideoDetails
