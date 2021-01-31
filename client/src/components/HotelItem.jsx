import { Link } from 'react-router-dom'

export const HotelItem = ({ hotel }) => {
  return (
    <div className="rounded m-2 p-6">
      <div className="text-lg">{hotel.name}</div>
      <div>{hotel.city}</div>
      <Link to={`/hotels/${hotel.hotel_id}`}>
        <button type="text">View Detail</button>
      </Link>
    </div>
  )
}
