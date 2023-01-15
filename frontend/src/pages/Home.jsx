import NavBar from '../components/Navbar'

const Home = () => {
  return (
    <div className="home text-center">
      {/* section 1 */}
      <div className="home-bg-section-1">
        <NavBar />
        <div
          className="hero lg:text-9xl max-lg:text-9xl max-md:text-6xl max-sm:text-5xl lg:mt-32 md:mt-24 max-sm:mt-10 text-center text-white m-auto"
          style={{ position: 'relative', fontFamily: 'Playfair Display' }}
        >
          Pogo Guide
        </div>

        <div
          className="text-center text-white lg:text-2xl max-sm:text-xl mt-14 lg:w-96 max-sm:w-72 m-auto"
          style={{ fontFamily: 'Sofia Sans' }}
        >
          Unlock the full potential of Pogostuck with us.
        </div>

        <div>
          <p className="text-center text-white text-l lg:mt-10 max-sm:mt-1 max-w-2xl m-auto max-sm:p-20">
            Welcome to Pogostuck guide. We provide speedrun skips, tips and game achievements to help you master the game. Join
            our community and discover the full potential of Pogostuck.
          </p>
        </div>
        <button className="bg-pink-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full transition duration-500 ease-in-out mt-10">
          Get Started
        </button>
      </div>
      {/* Section 2 */}
      <div className="home-bg-section-2 -mt-5">
        <div>
          Exercitation non aliquip exercitation consequat ea aliquip ullamco minim deserunt irure eiusmod. Voluptate minim ea
          minim labore eu non dolore adipisicing et ea elit exercitation elit. Occaecat cupidatat mollit excepteur ex.
        </div>
      </div>
    </div>
  )
}

export default Home
