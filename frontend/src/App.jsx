import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages pt-16">
          <VideoForm />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/legend" element={<Legend />} />
            <Route path="/master" element={<Master />} />
            <Route path="/map1" element={<Map1 />} />
            <Route path="/map2" element={<Map2 />} />
            <Route path="/map3" element={<Map3 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
