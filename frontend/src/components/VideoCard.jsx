import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from '@material-tailwind/react'
import { useVideoContext } from '../hooks/useVideoContext'

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
    <Card className="w-96 m-7">
      <CardHeader color="blue" className="relative h-56">
        <ReactPlayer url={video.video} width="100%" height="100%" controls />
      </CardHeader>

      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {video.title}
        </Typography>
        <div>
          {hasLongDescription && !showFullDescription ? video.description.substring(0, 150) + '...' : video.description}

          {hasLongDescription && (
            <Typography
              className="cursor-pointer font-bold"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </Typography>
          )}
        </div>
      </CardBody>

      <CardFooter divider className="flex items-center justify-between py-3">
        <Chip value={video.difficulty} color="amber" />
        <Chip onClick={handleClick} value="delete" color="red" />
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          {video.createdAt.substring(0, 10)}
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default VideoCard
