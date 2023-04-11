import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import '../quill.css'
import Loading from '../components/Loading'
// components
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'

// Font Awesome
import { motion } from 'framer-motion'

function TournamentPage() {
  const { id } = useParams()
  const [tournament, setTournament] = useState(null)

  const transformImage = (domNode) => {
    if (domNode.type === 'tag' && domNode.name === 'img') {
      const imageId = domNode.attribs['data-image-id']
      if (imageId) {
        return <img src={imageId} alt="" />
      }
    }
  }

  useEffect(() => {
    const fetchTournament = async () => {
      const response = await fetch(`http://localhost:8000/api/tournaments/${id}`)
      const data = await response.json()
      setTournament(data)
    }

    fetchTournament()

    // fetchSteamUserData()
    // fetchSteamLeaderboard()
    // getNumberOfCurrentPlayers()
  }, [id])

  const fetchSteamUserData = async () => {
    const proxyurl = 'http://localhost:8000/proxy/'
    const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=688130&key=22A5666F75AEC78F81260839F1729A7A&steamid=76561198289168677`
    const requestUrl = proxyurl + apiUrl
    const response = await fetch(requestUrl)
    const data = await response.json()
    console.log(data)
  }

  // const fetchSteamLeaderboard = async () => {
  //   const proxyurl = 'http://localhost:8000/proxy/'
  //   const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v1/?appid=688130&count=1&name[0]`
  //   const requestUrl = proxyurl + apiUrl
  //   const response = await fetch(requestUrl)
  //   const data = await response.json()
  //   console.log(data)
  // }

  // const getNumberOfCurrentPlayers = () => {
  //   const proxyurl = 'http://localhost:8000/proxy/'
  //   const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=688130`
  //   const requestUrl = proxyurl + apiUrl
  //   const response = fetch(requestUrl)
  //   const data = response.json()
  //   console.log('e',data)
  // }
  

  const handleCommentSubmit = async (commentText) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    try {
      const response = await fetch(`http://localhost:8000/api/tournaments/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: commentText }),
      })

      if (response.ok) {
        const { comment } = await response.json()
        setTournament({ ...tournament, comments: [...tournament.comments, comment] })
      } else {
        console.error('Failed to post comment')
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  if (!tournament) {
    return <Loading />
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <>
      <section className="hero-section bg-gradient-to-br from-pink-300 to-fuchsia-600 flex flex-col items-center justify-center">
        <NavBar />
        <div className="container mx-auto px-4 py-20">
          <motion.h1 className="text-5xl font-bold text-white mb-8" initial="hidden" animate="visible" variants={titleVariants}>
            {tournament.name}
          </motion.h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center">
            <img className="w-full max-h-[500px] object-contain" src={tournament.coverImage} alt="Cover Image" />

            <div className="p-6 space-y-4 text-center">
              <div className="text-gray-600 mt-2 custom-quill-container">
                {parse(tournament.description, { replace: transformImage })}
              </div>

              <div className="flex items-center space-x-6 justify-center">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Bracket Type:</span>
                  <span className="font-medium text-gray-600">{tournament.bracketType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Prize Pool:</span>
                  <span className="font-medium text-gray-600">{tournament.prizePool}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Date:</span>
                  <span className="font-medium text-gray-600">
                    {new Date(tournament.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Likes:</span>
                  <span className="font-medium text-gray-600">{tournament.likes && tournament.likes.length}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
              <CommentForm onSubmit={handleCommentSubmit} />
              <CommentsList comments={tournament.comments} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default TournamentPage
