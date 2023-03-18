import React, { useEffect, useState } from 'react'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm)
    try {
      const res = await fetch(`http://localhost:8000/api/videos/search/${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()

      if (res.ok) {
        console.log(json.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => handleSearch(searchTerm)}>Search</button>
    </div>
  )
}

export default SearchBar
