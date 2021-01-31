import { Link } from 'react-router-dom'

export const HotelItem = ({ hotel }) => {
  return (
    <div>
      <div>{hotel.name}</div>
      <div>{hotel.city}</div>
      <Link to={`/hotels/${hotel.hotel_id}`}>
        <button type='text'>View Detail</button>
      </Link>
    </div>
  )
}
