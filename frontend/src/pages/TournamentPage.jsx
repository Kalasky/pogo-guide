import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'
import parse from 'html-react-parser'
import '../quill.css'
import Loading from '../components/Loading'

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
  }, [id])

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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{tournament.name}</h1>
      <div className="text-gray-600 mt-2 custom-quill-container">{parse(tournament.description, { replace: transformImage })}</div>
      <div className="text-gray-600 mt-2 custom-quill-container">{parse(tournament.rules, { replace: transformImage })}</div>
      {new Date(tournament.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
      <h2 className="text-xl font-bold mt-8 mb-4">Comments</h2>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentsList comments={tournament.comments} />
    </div>
  )
}

export default TournamentPage
