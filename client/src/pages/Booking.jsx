import { useContext, useEffect, useState } from 'react'
import { getBookings, deleteBooking } from '../api'
import { AuthContext } from '../context'

export const BookingRow = ({ booking, cancleBooking }) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [bookingDate, setBookingDate] = useState('')

  useEffect(() => {
    const start = new Date(booking.check_in_date)
    const end = new Date(booking.check_out_date)
    const days = Number.parseInt(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    )
    setTotalPrice((days * Number.parseFloat(booking.room.price)).toFixed(2))

    setCheckInDate(String(new Date(booking.check_in_date)))
    setCheckOutDate(String(new Date(booking.check_out_date)))
    setBookingDate(String(new Date(booking.booking_date)))
  }, [])

  return (
    <tr>
      <td>{booking.hotel.name}</td>
      <td>{booking.room.room_type}</td>
      <td>{booking.no_guest}</td>
      <td>{checkInDate.substr(0, 21)}</td>
      <td>{checkOutDate.substr(0, 21)}</td>
      <td>{bookingDate.substr(0, 21)}</td>
      <td>{totalPrice}</td>
      <td>
        <button onClick={() => cancleBooking(booking.booking_id)}>
          Cancel
        </button>
      </td>
    </tr>
  )
}

export const Booking = () => {
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
  }, [auth, bookings])

  const cancleBooking = (booking_id) => {
    deleteBooking({ token: auth.token, booking_id }).then((res) => {
      const { status, error, data } = res.data
      if (status == 'error') {
        alert(error)
      } else {
        setBookings(
          bookings.filter((booking) => booking.booking_id != booking_id)
        )
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
        <table>
          <tr>
            <th>Hotel</th>
            <th>Room</th>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booking-date</th>
            <th>Total price(THB)</th>
            <th></th>
          </tr>
          {bookings.map((booking) => (
            <BookingRow
              key={booking.booking_id}
              booking={booking}
              cancleBooking={cancleBooking}
            />
          ))}
        </table>
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
