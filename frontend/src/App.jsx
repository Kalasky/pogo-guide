import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './index.css'

// pages and components
import Home from './pages/Home'
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
import ProfileSettings from './pages/ProfileSettings'
import ResetPassword from './pages/ResetPassword'
import TournamentPage from './pages/TournamentPage'
import TournamentsPage from './pages/TournamentsPage'

// firebase
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyD6P8sexctMJ7yRkoytgdDoubzULc8uiMY',
  authDomain: 'pogo-guide-8e1fd.firebaseapp.com',
  projectId: 'pogo-guide-8e1fd',
  storageBucket: 'pogo-guide-8e1fd.appspot.com',
  messagingSenderId: '931399758103',
  appId: '1:931399758103:web:34f5d874ac652c72794752',
  measurementId: 'G-58BNZCWJ6E',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

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
          <Route path="/settings/profile/:authorName" element={<ProfileSettings />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:id" element={<TournamentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
