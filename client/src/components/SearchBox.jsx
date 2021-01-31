import { useState } from 'react'
import { searchHotel } from '../api'

export const SearchBox = ({ setHotels }) => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    searchHotel({ searchText }).then((res) => {
      const { status, error, data } = res.data
      if (status == 'error') {
        alert(error)
      } else {
        console.log(data)
        setHotels([...data])
      }
    })
  }

  return (
    <div>
      <div className="rounded m-2 p-6">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Hotel name or detail"
            onChange={(e) => setSearchText(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}