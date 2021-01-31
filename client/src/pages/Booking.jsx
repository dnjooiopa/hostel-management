import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getBookings } from '../api'
import { BookingDetail } from '../components'
import { AuthContext } from '../context'

export const Booking = () => {
  const history = useHistory()
  const { auth, setAuth } = useContext(AuthContext)

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const { token } = auth

    if (!token) {
      alert('You have to log in first!')
      history.push('/')
    }

    getBookings({ token }).then((res) => {
      const { status, error, data } = res.data
      if (status == 'error') {
        alert(error)
      } else {
        console.table(data)
        setBookings([...data])
      }
    })
  }, [])

  return (
    <div className="flex flex-col w-256 mt-4 rounded ml-auto mr-auto">
      {bookings.map((booking) => (
        <BookingDetail key={booking.booking_id} booking={booking} />
      ))}
    </div>
  )
}
