import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useVideoContext } from '../hooks/useVideoContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const VideoCard = ({ video }) => {
  const { dispatch } = useVideoContext()

  const [showFullDescription, setShowFullDescription] = useState(false)
  const hasLongDescription = video.description.length > 150

  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/videos/${video._id}`, {
        method: 'DELETE',
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'DELETE_VIDEO', payload: json })
      }

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl border p-6 w-72">
      <ReactPlayer url={video.video} width="100%" height="100%" controls />
      <h5 className="text-white font-bold text-lg mb-4 mt-3">{video.title}</h5>
      <div className="text-white text-sm">
        {hasLongDescription && !showFullDescription ? video.description.substring(0, 150) + '...' : video.description}

        {hasLongDescription && (
          <div className="cursor-pointer font-bold" onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? 'Show Less' : 'Show More'}
          </div>
        )}
      </div>
      {/* footer  */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-white text-xs">{formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}</span>
          <div value="delete" className="text-red-500 cursor-pointer" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
