import { VideoContext } from '../context/VideoContext'
import { useContext } from 'react'

export const useVideoContext = () => {
  const context = useContext(VideoContext)

  if (!context) {
    throw new Error('useVideoContext must be used within a VideoContextProvider')
  }
  
  return context
}
