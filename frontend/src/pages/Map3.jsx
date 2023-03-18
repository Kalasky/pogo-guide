import { useEffect, useState } from 'react'
import { useVideoContext } from '../hooks/useVideoContext'
import '../index.css'

// components
import NavBar from '../components/Navbar'
import VideoDetails from '../components/VideoDetails'
import Pagination from '../components/Pagination'

// Font Awesome
import { motion } from 'framer-motion'

const Map1 = () => {
  const { videos, dispatch } = useVideoContext()
  const [currentPage, setCurrentPage] = useState(0)
  const [videosPerPage] = useState(6)

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }

  const videosToDisplay = videos.slice(currentPage * videosPerPage, (currentPage + 1) * videosPerPage)

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:8000/api/videos/map3')
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_VIDEOS', payload: json })
      }
    }

    fetchVideos()
  }, [dispatch])

  const cards = [
    {
      title: 'Master Tips',
      description: 'Learn from the masters with tips and tricks for completing the Master difficulty on Map 1.',
      image: '../src/assets/tips.svg',
    },
    {
      title: 'Palm Skip Guide',
      description: 'Get tips and tricks for the palm skip on Map 1 and see how it’s done in-game.',
      image: '../src/assets/palm.svg',
    },
    {
      title: 'Anvil Skip Guide',
      description: 'Learn how to skip the anvil section on Map 1 with these helpful tips and tricks.',
      image: '../src/assets/gaming.svg',
    },
    {
      title: 'Movement Guide',
      description: 'Improve your movement skills with these tips and tricks for Map 1.',
      image: '../src/assets/movement.svg',
    },
  ]

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <>
      <div className="map1-bg-section-1 bg-gradient-to-bl from-blue-800 to-purple-400 ">
        <NavBar />
        {/* Hero Section */}
        <section className="hero-section text-white pb-20">
          {/* Add your hero content */}
          <div className="container mx-auto px-4">
            <h1 className="hero-title text-5xl font-bold lg:text-6xl max-md:text-6xl max-sm:text-5xl lg:mt-20 md:mt-24 max-sm:mt-10">
              Map 3
            </h1>
            <p className="hero-subtitle text-xl mt-4 lg:w-[40vw] md:w-[50vw] sm:w-[80vw]">
              Prepare to climb to new heights as you explore a map full of branching paths and new mechanics, all leading to the
              pinnacle of your journey at the top
            </p>
            <motion.button
              className="get-started-btn-map3 bg-white text-purple-600 font-semibold py-2 px-4 rounded mt-6 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Get Started
            </motion.button>
          </div>
        </section>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-center">Map 1 Tips & Tricks</h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto md:text-center m-auto">
          Learn how to master the first map in our series with these helpful tips and tricks from our community.
        </p>
        <motion.div
          className="mt-16 grid gap-10 lg:grid-cols-4 lg:gap-x-20 lg:gap-y-16 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card) => (
            <motion.div key={card.title} className="rounded-lg shadow-lg overflow-hidden" variants={cardVariants}>
              <img className="w-full h-56 object-cover" src={card.image} alt="" />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                <p className="mt-4 text-base text-gray-500">{card.description}</p>
                <a href="#" className="mt-6 text-base font-medium text-purple-600 hover:text-purple-500">
                  Watch Now
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Video Section */}
      <div className="video-section py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Learn from the Experts</h2>
          <div className="videos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {videosToDisplay.map((video) => (
              <VideoDetails key={video._id} video={video} />
            ))}
          </div>
          <Pagination
            pageCount={Math.ceil(videos.length / videosPerPage)}
            currentPage={currentPage + 1}
            onPageChange={(pageNumber) => handlePageClick({ selected: pageNumber - 1 })}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        </div>
      </div>
    </>
  )
}

export default Map1
