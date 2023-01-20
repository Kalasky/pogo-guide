import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  const { authorName } = useParams()
  const [author, setAuthor] = useState({})

  console.log(authorName)

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/auth/profile/${authorName}`)
        const data = await response.json()
        setAuthor(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAuthor()
  }, [authorName])
  
  return (
    <div>
      <h1>Username: {author.username}</h1>
      <p>Role: {author.role}</p>
    </div>
  )
}

export default ProfilePage