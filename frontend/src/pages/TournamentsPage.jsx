// pages/TournamentsPage.js
import React, { useState, useEffect } from 'react'
import TournamentCard from '../components/TournamentCard'
import TournamentModal from '../components/TournamentModal'

function TournamentsPage() {
  const [tournaments, setTournaments] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Fetch tournaments data and set it to the component state
    const fetchTournaments = async () => {
      const response = await fetch('http://localhost:8000/api/tournaments')
      const data = await response.json()
      setTournaments(data)
    }

    fetchTournaments()
  }, [])

  const handleCreateTournament = async (newTournament) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    // Call your API to create a new tournament
    const response = await fetch('http://localhost:8000/api/tournaments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTournament),
    })
    const data = await response.json()
    setTournaments([...tournaments, data])
    setModalOpen(false)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tournaments</h1>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none mb-4"
        onClick={() => setModalOpen(true)}
      >
        Create a Tournament
      </button>
      <TournamentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreateTournament={handleCreateTournament} />
      <div>
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament._id} tournament={tournament} />
        ))}
      </div>
    </div>
  )
}

export default TournamentsPage
