import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const HotelItem = ({ hotel }) => {
  const [startPrice, setStartPrice] = useState(0.0)

  useEffect(() => {
    const prices = hotel.rooms.map((room) => Number.parseFloat(room.price))
    setStartPrice(Math.min(...prices).toFixed(2))
  }, [])

  return (
    <div className="rounded m-2 p-6">
      <div className="text-lg">{hotel.name}</div>
      <div>{hotel.city}</div>
      <div>start from THB{startPrice}/night</div>
      <Link to={`/hotels/${hotel.hotel_id}`}>
        <button type="text">View Detail</button>
      </Link>
    </div>
  )
}
