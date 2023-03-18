import React from 'react'
import { motion } from 'framer-motion'
import { Popover } from '@headlessui/react'
import NavBar from '../components/NavBar'

const Home = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <section className="relative bg-gradient-to-r from-pink-400 to-indigo-500">
          <NavBar />
          <motion.div
            className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-white"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              custom={0.2}
            >
              Welcome to Pogostuck Guide
            </motion.h1>
            <motion.p
              className="text-lg leading-relaxed text-center mb-6 w-4/5"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              custom={0.4}
            >
              Discover everything you need to know about the game Pogostuck. Our comprehensive guide covers all aspects of the
              game, offering insights, tips, and strategies to help you master Pogostuck.
            </motion.p>
            <motion.button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transition duration-200"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              custom={0.6}
            >
              Get Started
            </motion.button>
          </motion.div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mb-6">{/* Add feature icon here */}</div>
                <h3 className="text-xl font-semibold mb-4">In-Depth Guides</h3>
                <p>
                  Our guides cover every aspect of Pogostuck, providing you with the knowledge and skills needed to conquer the
                  game.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mb-6">{/* Add feature icon here */}</div>
                <h3 className="text-xl font-semibold mb-4">Expert Strategies</h3>
                <p>
                  Learn from the best with our expert strategies, designed to help you master Pogostuck and maximize your success.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mb-6">{/* Add feature icon here */}</div>
                <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                <p>
                  Join our vibrant community of Pogostuck enthusiasts, where you can share experiences, tips, and tricks with
                  fellow players.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Step 1 */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mr-8">{/* Add step icon here */}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Sign Up</h3>
                  <p>
                    Create a free account on our platform to get access to exclusive content and join our community of Pogostuck
                    enthusiasts.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mr-8">{/* Add step icon here */}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Explore</h3>
                  <p>
                    Dive into our vast library of in-depth guides, expert strategies, and community-driven discussions to enhance
                    your Pogostuck skills.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mr-8">{/* Add step icon here */}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Implement</h3>
                  <p>
                    Put your newfound knowledge to the test by applying the strategies and techniques you've learned to your
                    Pogostuck gameplay.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.8 } }}
              >
                <div className="bg-indigo-500 p-5 rounded-full mr-8">{/* Add step icon here */}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Conquer</h3>
                  <p>
                    Master the game of Pogostuck with confidence, using the knowledge and support from our platform to reach new
                    heights and achievements.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Testimonial 1 */}
              <motion.div
                className="bg-white rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } }}
              >
                <p className="text-gray-600 italic mb-6">
                  "Thanks to this platform, I've been able to improve my Pogostuck skills dramatically. The guides and strategies
                  are top-notch!"
                </p>
                <div className="flex items-center">
                  {/* Add user avatar here */}
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">John Doe</h4>
                    <p className="text-gray-500">Pogostuck Enthusiast</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                className="bg-white rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } }}
              >
                <p className="text-gray-600 italic mb-6">
                  "The community on this platform is incredibly supportive and welcoming. I've learned so much from fellow
                  players, and it's been a fantastic experience."
                </p>
                <div className="flex items-center">
                  {/* Add user avatar here */}
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">Jane Smith</h4>
                    <p className="text-gray-500">Casual Gamer</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                className="bg-white rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } }}
              >
                <p className="text-gray-600 italic mb-6">
                  "I can't recommend this platform enough! It's helped me conquer Pogostuck and has made the game so much more
                  enjoyable to play."
                </p>
                <div className="flex items-center">
                  {/* Add user avatar here */}
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold mb-1">Alex Brown</h4>
                    <p className="text-gray-500">Pro Gamer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-500 py-12">
        <div className="container mx-auto px-4">{/* Add footer content here */}</div>
      </footer>
    </div>
  )
}

export default Home
