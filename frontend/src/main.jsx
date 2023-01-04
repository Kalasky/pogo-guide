import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeProvider } from '@material-tailwind/react'
import { VideoContextProvider } from './context/VideoContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <VideoContextProvider>
        <App />
      </VideoContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
