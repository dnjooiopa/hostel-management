import { HotelItem } from './HotelItem'

export const HotelGroup = ({ hotels }) => {
  return (
    <div>
      {hotels.map((hotel) => (
        <HotelItem key={hotel.hotel_id} hotel={hotel} />
      ))}
    </div>
  )
}
