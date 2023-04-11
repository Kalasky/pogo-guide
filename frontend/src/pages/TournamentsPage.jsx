// pages/TournamentsPage.js
import React, { useState, useEffect } from 'react'
import TournamentCard from '../components/TournamentCard'
import TournamentModal from '../components/TournamentModal'
import Pagination from '../components/Pagination'

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTournamentId, setCurrentTournamentId] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [tournamentsPerPage] = useState(3)

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage)
  }

  const tournamentsToDisplay = tournaments.slice(currentPage * tournamentsPerPage, (currentPage + 1) * tournamentsPerPage)

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
      body: JSON.stringify({ ...newTournament }),
    })
    const data = await response.json()
    setCurrentTournamentId(data._id)
    setTournaments([...tournaments, data])
    setModalOpen(false)

    return data._id
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
      <TournamentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateTournament={handleCreateTournament}
        currentTournamentId={currentTournamentId}
      />
      <div>
        {tournamentsToDisplay.map((tournament) => (
          <TournamentCard key={tournament._id} tournament={tournament} />
        ))}
        <Pagination
          pageCount={Math.ceil(tournaments.length / tournamentsPerPage)}
          currentPage={currentPage + 1}
          onPageChange={(pageNumber) => handlePageClick({ selected: pageNumber - 1 })}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      </div>
    </div>
  )
}

export default TournamentsPage
