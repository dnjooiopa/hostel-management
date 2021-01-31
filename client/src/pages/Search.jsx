import { useState } from 'react'
import { HotelGroup, SearchBox } from '../components'

export const Search = () => {
  const [hotels, setHotels] = useState([])

  return (
    <div className="w-256 ml-auto mr-auto">
      <SearchBox setHotels={setHotels} />
      <HotelGroup hotels={hotels} />
    </div>
  )
}
