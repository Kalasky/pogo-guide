import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import '../tournamentCard.scss'

const TournamentCard = ({ tournament }) => {
  const [likes, setLikes] = useState(tournament.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const hasLongDescription = tournament.description.length > 350

  useEffect(() => {
    // Check if the user has already liked the post
    const checkIsLiked = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      const likedTournaments = user.likedTournaments || []
      setIsLiked(likedTournaments.includes(tournament._id))
    }

    checkIsLiked()
  }, [tournament._id])

  useEffect(() => {
    const animateButton = function (e) {
      e.preventDefault()
      //reset animation
      e.target.classList.remove('animate')
      e.target.classList.add('animate')
      setTimeout(function () {
        e.target.classList.remove('animate')
      }, 700)
    }
    const bubblyButtons = document.getElementsByClassName('bubbly-button')
    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false)
    }

    return () => {
      for (let i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].removeEventListener('click', animateButton, false)
      }
    }
  }, [])

  const removeElementsAndJoinParagraphs = (html, tagsToRemove) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    tagsToRemove.forEach((tag) => {
      const elements = doc.querySelectorAll(tag)
      elements.forEach((element) => {
        element.parentNode.removeChild(element)
      })
    })

    const paragraphs = doc.getElementsByTagName('p')
    const content = []

    for (let i = 0; i < paragraphs.length; i++) {
      content.push(paragraphs[i].textContent)
    }

    return `<p>${content.join(' - ')}</p>`
  }

  const handleLike = async (e) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const email = user.email || null

    try {
      // dynamically update the url based on the current page, read from location hook
      const res = await fetch(`http://localhost:8000/api/tournaments/${tournament._id}/upvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, id: tournament._id }),
      })
      const json = await res.json()

      if (res.ok) {
        setLikes(json.likes.length)

        // Update local storage
        const likedTournaments = user.likedTournaments || []
        if (likedTournaments.includes(tournament._id)) {
          // Remove the tournament from the likedTournaments array
          const updatedTournaments = likedTournaments.filter((id) => id !== tournament._id)
          user.likedTournaments = updatedTournaments
          setIsLiked(false)
        } else {
          // Add the tournament to the likedTournaments array
          likedTournaments.push(tournament._id)
          user.likedTournaments = likedTournaments
          setIsLiked(true)
        }

        // Update the user object in local storage
        localStorage.setItem('user', JSON.stringify(user))
      }

      if (res.status === 401) {
        alert('You must be logged in to like a post.')
      }

      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="tc light">
      <div className="tc-container py-2">
        <article className="postcard light red">
          <a className="tc postcard__img_link" href="#">
            <img className="postcard__img" src={tournament.coverImage} alt="Image Title" />
          </a>
          <div className="postcard__text t-dark">
            <h1 className="postcard__title red">
              <Link to={`/tournaments/${tournament._id}`}>{tournament.name} </Link>
              <div className="like-wrapper">
                <a
                  className={`like-button${isLiked ? ' liked' : ''} `}
                  onClick={() => {
                    handleLike()
                  }}
                >
                  <span className="like-icon">
                    <div className="heart-animation-1"></div>
                    <div className="heart-animation-2"></div>
                  </span>
                  Like
                </a>
              </div>
              <Link to={`/tournaments/${tournament._id}`}>
                <a className="effect effect-1" title="View">
                  View
                </a>
              </Link>
            </h1>

            <div className="postcard__subtitle medium">
              <i className="fas fa-calendar-alt mr-2"></i> Start Date:{' '}
              {new Date(tournament.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </div>
            <div className="postcard__bar"></div>
            {hasLongDescription && !showFullDescription ? (
              <div
                className="postcard__preview-txt"
                dangerouslySetInnerHTML={{
                  __html: removeElementsAndJoinParagraphs(tournament.description.substring(0, 350) + '...', [
                    'h1, h2, h3, h4, h5, h6',
                    'img',
                    'br',
                    'hr',
                    'ul',
                    'li',
                    'ol',
                    'blockquote',
                    'pre',
                    'code',
                  ]),
                }}
              ></div>
            ) : (
              <div
                className="postcard__preview-txt"
                dangerouslySetInnerHTML={{
                  __html: removeElementsAndJoinParagraphs(tournament.description, [
                    'h1, h2, h3, h4, h5, h6',
                    'img',
                    'br',
                    'hr',
                    'ul',
                    'li',
                    'ol',
                    'blockquote',
                    'pre',
                    'code',
                  ]),
                }}
              ></div>
            )}
            <ul className="postcard__tagbox">
              <li className="tag__item">
                <i className="fas fa-tag mr-2"></i>Prize Pool: {tournament.prizePool}
              </li>
              <li className="tag__item">
                <i className="fas fa-clock mr-2"></i>Bracket Type: {tournament.bracketType}
              </li>
              <li className="tag__item play green">
                <a href="#">
                  <i className="fas fa-play mr-2"></i>Max Players: {tournament.maxPlayers}
                </a>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}

export default TournamentCard
