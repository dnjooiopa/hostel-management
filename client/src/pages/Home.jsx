import { useState, useEffect } from 'react'
import { searchHotel } from '../api'
import { HotelGroup } from '../components'

export const Home = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    searchHotel({ searchText: null, limit: null }).then((res) => {
      const { status, error, data } = res.data
      if (status == 'error') {
        alert(error)
      } else {
        setHotels([...data])
      }
    })
  }, [])

  return (
    <div className="w-256">
      <h1>Home page</h1>
      <HotelGroup hotels={hotels} />
    </div>
  )
}
