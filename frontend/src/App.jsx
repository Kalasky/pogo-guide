import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"

// pages and components
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import VideoForm from "./components/VideoForm"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages pt-16">
        <VideoForm />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
