import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getBookings, deleteBooking } from '../api'
import { AuthContext } from '../context'

export const BookingItem = ({ booking, cancleBooking }) => {
  return (
    <div className="rounded p-6 m-2">
      <div>
        <span className="text-md">HOTEL:</span> {booking.hotel.name}
      </div>
      <div>
        <span className="text-md">ROOM:</span> {booking.room.room_type}
      </div>
      <div>
        <span className="text-md">NUMBER OF GUEST:</span> {booking.no_guest}
      </div>
      <div>
        <span className="text-md">CHECK-IN:</span>{' '}
        {new Date(booking.check_in_date).toUTCString()}
      </div>
      <div>
        <span className="text-md">CHECK-OUT:</span>{' '}
        {new Date(booking.check_out_date).toUTCString()}
      </div>
      <div>
        <span className="text-md">BOOKING-DATE:</span>{' '}
        {new Date(booking.booking_date).toUTCString()}
      </div>
      <div>
        <span className="text-md">TOTAL-PRICE(THB):</span> {booking.room.price}
      </div>
      <button onClick={() => cancleBooking(booking.booking_id)}>Cancel</button>
    </div>
  )
}

export const Booking = () => {
  const history = useHistory()
  const { auth, setAuth } = useContext(AuthContext)

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const { token } = auth

    if (token) {
      getBookings({ token }).then((res) => {
        const { status, error, data } = res.data
        if (status == 'error') {
          alert(error)
        } else {
          setBookings([...data])
        }
      })
    }
  }, [bookings])

  const cancleBooking = (booking_id) => {
    deleteBooking({ token: auth.token, booking_id }).then((res) => {
      const { status, error, data } = res.data
      if (status == 'error') {
        alert(error)
      } else {
        setBookings(bookings.filter(booking=>booking.booking_id != booking_id))
        alert(`Booking ${data.booking_id} has been canceled`)
      }
    })
  }

  if (auth.token) {
    return (
      <div className="flex flex-col w-256 mt-4 ml-auto mr-auto">
        <div className="flex rounded p-2 m-2 justify-center">
          <h2>My Bookings</h2>
        </div>
        {bookings.map((booking) => (
          <BookingItem
            key={booking.booking_id}
            booking={booking}
            cancleBooking={cancleBooking}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div className="flex flex-col w-256 mt-4 rounded ml-auto mr-auto">
        <h2>You are not logged in</h2>
      </div>
    )
  }
}
