import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const ProfileSettings = () => {
  const { authorName } = useParams()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  // Check if the currently logged-in user matches the author of the profile
  const isAuthorized = user && user.username === authorName

  const [author, setAuthor] = useState({})
  const [nameColor, setNameColor] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [location, setLocation] = useState('')
  const [discord, setDiscord] = useState('')
  const [twitch, setTwitch] = useState('')
  const [twitter, setTwitter] = useState('')
  const [youtube, setYoutube] = useState('')
  const [spotify, setSpotify] = useState('')
  const [bio, setBio] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePictureURL, setProfilePictureURL] = useState('')

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`)
        const data = await response.json()
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
        setProfilePictureURL(data.profilePicture || localStorage.getItem('profilePicture'))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAuthor()
  }, [authorName])

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault()

    const updatedAuthor = {
      ...author,
      nameColor,
      pronouns,
      location,
      bio,
    }

    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    try {
      const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedAuthor),
      })
      const data = await response.json()
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

  const handleSocialMediaSubmit = async (e) => {
    e.preventDefault()

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

    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    try {
      const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedAuthor),
      })
      const data = await response.json()

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

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0])
  }

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault()

    if (!profilePicture) {
      return
    }

    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token

    try {
      const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}/profile-picture`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (response.ok) {
        console.log('Profile picture updated successfully')
        const data = await response.json()
        setProfilePictureURL(data.profilePicture)
        setAuthor((prevAuthor) => ({
          ...prevAuthor,
          profilePicture: data.profilePicture,
        }))
        localStorage.setItem('profilePicture', data.profilePicture)
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
        {author.profilePicture && (
          <img
            src={`http://localhost:8000/${author.profilePicture}`}
            alt="Profile picture"
            className="w-24 h-24 mb-4 rounded-full object-cover"
          />
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
    </div>
  )
}

export default ProfileSettings
