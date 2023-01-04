import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from '@material-tailwind/react'

const VideoCard = ({ video }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const hasLongDescription = video.description.length > 150

  return (
    <Card className="w-96">
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
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          {video.createdAt.substring(0, 10)}
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default VideoCard
