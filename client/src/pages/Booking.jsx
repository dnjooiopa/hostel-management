import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getBookings, deleteBooking } from '../api'
import { AuthContext } from '../context'

export const BookingItem = ({ booking, cancleBooking }) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [bookingDate, setBookingDate] = useState('')

  useEffect(() => {
    const start = new Date()
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
        <span className="text-md">CHECK-IN:</span> {checkInDate.substr(0, 21)}
      </div>
      <div>
        <span className="text-md">CHECK-OUT:</span> {checkOutDate.substr(0, 21)}
      </div>
      <div>
        <span className="text-md">BOOKING-DATE:</span> {bookingDate.substr(0, 21)}
      </div>
      <div>
        <span className="text-md">TOTAL-PRICE(THB):</span> {totalPrice}
      </div>
      <button onClick={() => cancleBooking(booking.booking_id)}>Cancel</button>
    </div>
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
