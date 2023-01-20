import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './index.css'

// pages and components
import Home from './pages/Home'
import NavBar from './components/NavBar'
import VideoForm from './components/VideoForm'
import Legend from './pages/Legend'
import Master from './pages/Master'
import Map1 from './pages/Map1'
import Map2 from './pages/Map2'
import Map3 from './pages/Map3'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Post from './pages/Post'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { user } = useAuthContext()
  const isAdmin = user && user.role === 'admin'

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legend" element={<Legend />} />
          <Route path="/master" element={<Master />} />
          <Route path="/map1" element={<Map1 />} />
          <Route path="/map2" element={<Map2 />} />
          <Route path="/map3" element={<Map3 />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/add-data" element={<VideoForm />} />
          <Route path="/video/:id/:model" element={<Post />} />
          <Route path="/profile/:authorName" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
