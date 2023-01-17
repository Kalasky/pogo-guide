import { createContext, useReducer } from 'react'

export const VideoContext = createContext()

export const videoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { videos: action.payload }
    case 'ADD_VIDEO':
      return { videos: [...state.videos, action.payload] }
    case 'DELETE_VIDEO':
      return { videos: state.videos.filter((video) => video._id !== action.payload._id) }
    case 'GET_VIDEO':
      return { videos: action.payload }
    default:
      return state
  }
}

export const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, { videos: [] })
  return <VideoContext.Provider value={{ ...state, dispatch }}>{children}</VideoContext.Provider>
}
