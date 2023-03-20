import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const ProfileSettings = () => {
  // Get author name from URL parameters and the current user from the authentication context
  const { authorName } = useParams()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  // Check if the currently logged-in user matches the author of the profile
  const isAuthorized = user && user.username === authorName

  // Initialize state for author data and social media
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState({})
  const [nameColor, setNameColor] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [discord, setDiscord] = useState('')
  const [twitch, setTwitch] = useState('')
  const [twitter, setTwitter] = useState('')
  const [youtube, setYoutube] = useState('')
  const [spotify, setSpotify] = useState('')
  const [profilePictureURL, setProfilePictureURL] = useState('')

  // Fetch author data on component mount and when authorName changes
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        // Fetch author data from API
        const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`)
        const data = await response.json()

        // Update state with fetched data or localStorage values
        setAuthor(data)
        setNameColor(data.nameColor || localStorage.getItem('nameColor'))
        setPronouns(data.pronouns || localStorage.getItem('pronouns'))
        setLocation(data.location || localStorage.getItem('location'))
        setBio(data.bio || localStorage.getItem('bio'))
        setDiscord(data.discord || localStorage.getItem('discord'))
        setTwitch(data.twitch || localStorage.getItem('twitch'))
        setTwitter(data.twitter || localStorage.getItem('twitter'))
        setYoutube(data.youtube || localStorage.getItem('youtube'))
        setSpotify(data.spotify || localStorage.getItem('spotify'))

        // Set profile picture URL state and localStorage based on fetched data
        const fetchedProfilePictureURL = data.profilePicture
        setProfilePictureURL(fetchedProfilePictureURL)
        if (!profilePictureURL) {
          const profilePictureURLFromStorage = localStorage.getItem('profilePictureURL')
          if (profilePictureURLFromStorage) {
            setProfilePictureURL(profilePictureURLFromStorage)
          } else {
            localStorage.setItem('profilePictureURL', fetchedProfilePictureURL)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAuthor()
  }, [authorName])

  const handleResetPassword = async () => {
    // Get token from localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    // Send a request to the server to send a reset password link to the user's email
    try {
      const response = await fetch(`http://localhost:8000/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email }),
      })

      if (response.ok) {
        setMessage('Reset password link has been sent to your email.')
      } else {
        setMessage('Failed to send the reset password link. Please try again.')
      }
    } catch (error) {
      console.log(error)
      setMessage('An error occurred. Please try again.')
    }
  }

  // Handle the form submission for personal information
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault()

    // Prepare the updated author object
    const updatedAuthor = {
      ...author,
      nameColor,
      pronouns,
      location,
      bio,
    }

    // Get token from localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    // Update the author data on the server
    try {
      const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedAuthor),
      })
      const data = await response.json()

      // Update state and localStorage with updated data
      setAuthor(data)
      setNameColor(data.nameColor)
      setPronouns(data.pronouns)
      setLocation(data.location)
      setBio(data.bio)
      localStorage.setItem('nameColor', data.nameColor)
      localStorage.setItem('pronouns', data.pronouns)
      localStorage.setItem('location', data.location)
      localStorage.setItem('bio', data.bio)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle the form submission for social media information
  const handleSocialMediaSubmit = async (e) => {
    e.preventDefault()

    // Prepare the updated author object with social media information
    const updatedAuthor = {
      ...author,
      socialMedia: {
        discord,
        twitch,
        twitter,
        youtube,
        spotify,
      },
    }

    // Get token from localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    // Update the author data on the server
    try {
      const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedAuthor),
      })
      const data = await response.json()

      // Update state and localStorage with updated data
      setAuthor(data)
      setDiscord(data.socialMedia.discord)
      setTwitch(data.socialMedia.twitch)
      setTwitter(data.socialMedia.twitter)
      setYoutube(data.socialMedia.youtube)
      setSpotify(data.socialMedia.spotify)
      localStorage.setItem('discord', data.socialMedia.discord)
      localStorage.setItem('twitch', data.socialMedia.twitch)
      localStorage.setItem('twitter', data.socialMedia.twitter)
      localStorage.setItem('youtube', data.socialMedia.youtube)
      localStorage.setItem('spotify', data.socialMedia.spotify)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle profile picture change event
  const handleProfilePictureChange = (e) => {
    setProfilePictureURL(URL.createObjectURL(e.target.files[0]))
  }

  // Handle profile picture form submission
  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault()

    // Get the selected profile picture
    const profilePicture = e.target.elements.profilePicture.files[0]

    // If no profile picture is selected, return early
    if (!profilePicture) {
      return
    }

    // Create formData object with profile picture
    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    // Get token from localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    // Update the profile picture on the server
    try {
      const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}/profile-picture`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()

        // Save the URL of the uploaded file to localStorage and update the state
        localStorage.setItem('profilePictureURL', data.profilePicture)
        setProfilePictureURL(data.profilePicture)

        // Update the author object with the URL of the uploaded file
        setAuthor((prevAuthor) => ({
          ...prevAuthor,
          profilePicture: data.profilePicture,
        }))
      } else {
        console.log('Error updating profile picture')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // If the user is not authorized to view the page, redirect them to the home page
  if (!isAuthorized) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{author.username}</h1>
        {profilePictureURL && (
          <img src={profilePictureURL} alt="Profile picture" className="w-24 h-24 mb-4 rounded-full object-cover" />
        )}

        <h2 className="text-xl font-bold mb-2">Personal Information</h2>
        <form onSubmit={handlePersonalInfoSubmit}>
          <label className="block mb-4">
            Name Color:
            <input
              type="text"
              value={nameColor}
              onChange={(e) => setNameColor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            Pronouns:
            <select
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Any/All</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="It/Its">It/Its</option>
            </select>
          </label>
          <label className="block mb-4">
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            Bio:
            <textarea
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
            />
          </label>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={handleResetPassword}
          className="w-full mt-6 px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Reset Password
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Social Media</h2>
        <form onSubmit={handleSocialMediaSubmit}>
          <label className="block mb-4">
            Discord:
            <input
              type="text"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            Twitch:
            <input
              type="text"
              value={twitch}
              onChange={(e) => setTwitch(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            Twitter:
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            YouTube:
            <input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            Spotify:
            <input
              type="text"
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Socials
          </button>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-2 mt-8">Profile Picture</h2>
        <form onSubmit={handleProfilePictureSubmit} method="post" encType="multipart/form-data">
          <label className="block mb-4">
            Upload a profile picture:
            <input
              type="file"
              onChange={handleProfilePictureChange}
              name="profilePicture"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Profile Picture
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ProfileSettings
