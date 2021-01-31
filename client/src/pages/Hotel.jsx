import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { bookRoom, getHotelData } from '../api'
import { AuthContext } from '../context'
import { validateDate } from '../helpers'

const filterFacility = (facility) => {
  let filtered = [
    ...Object.keys(facility).filter(
      (key) => facility[key] && key != 'hotel_id'
    ),
  ]
  filtered = filtered.map((fname) => fname.replace('_', ' '))
  return filtered
}
const Room = ({ room, handleBooking }) => (
  <div className="rounded m-2 p-6">
    <div className="flex">
      <div className="img-room"></div>
      <div className="flex flex-col ml-6">
        <span className="font-semibold">{room.room_type}</span>
        <span className="text-sm">{room.max_guest} guest</span>
      </div>
      <div className="flex flex-col content-end items-end ml-auto w-50">
        <span className="text-sm">price/room/night</span>
        <span className="font-medium">THB{room.price}</span>
        <button onClick={() => handleBooking(room)}>Book now!</button>
      </div>
    </div>
  </div>
)

const BookingBox = ({ setCheckInDate, setCheckOutDate, setNumberOfGuest }) => {
  return (
    <div className="w-256 p-6 m-2 mt-4 rounded text-md ml-auto mr-auto">
      <form className="flex text-md">
        <div className="ml-2">
          check-in:{' '}
          <input
            type="date"
            onChange={(e) => setCheckInDate(new Date(e.target.value))}
          />
        </div>
        <div className="ml-2">
          check-out:{' '}
          <input
            type="date"
            onChange={(e) => setCheckOutDate(new Date(e.target.value))}
          />
        </div>
        <div className="ml-2">
          guest:{' '}
          <input
            type="number"
            min="1"
            max="10"
            defaultValue="1"
            onChange={(e) => setNumberOfGuest(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

export const Hotel = () => {
  const { auth } = useContext(AuthContext)

  const { hotel_id } = useParams()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [detail, setDetail] = useState('')
  const [phone, setPhone] = useState('')
  const [facility, setFacility] = useState([])
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [rooms, setRooms] = useState([])

  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const [numberOfGuest, setNumberOfGuest] = useState(1)

  useEffect(() => {
    getHotelData({ hotel_id })
      .then((res) => {
        const { status, error, data } = res.data
        if (status === 'error') {
          alert(error)
        } else {
          setName(data.name)
          setCity(data.city)
          setDetail(data.detail)
          setPhone(data.phone)
          setFacility([...filterFacility(data.facility)])
          setLatitude(data.latitude)
          setLongitude(data.longitude)
          setRooms([...data.rooms])
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const handleBooking = (room) => {
    const { token } = auth
    if (!token) {
      return alert('You have to log in first!')
    }

    const { room_id, max_guest } = room

    if (numberOfGuest > max_guest) {
      return alert('Number of guest is exceeded!')
    }

    checkInDate.setHours(12)
    checkInDate.setMinutes(0)
    checkOutDate.setHours(12)
    checkOutDate.setMinutes(0)

    if (!validateDate(checkInDate, checkOutDate)) {
      return alert('Invalid check-in check-out date!')
    }

    console.table({
      token,
      hotel_id,
      room_id,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      booking_date: new Date(),
      no_guest: numberOfGuest,
    })

    bookRoom({
      token,
      hotel_id,
      room_id,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      booking_date: new Date(),
      no_guest: numberOfGuest,
    })
      .then((res) => {
        const { status, error, data } = res.data
        if (status == 'error') {
          alert(error)
        } else {
          console.table(data)
          alert('You have successfully booked room')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="w-256 p-6 m-2 mt-4 rounded text-md ml-auto mr-auto">
        <div className="w-full">
          <div className="mt-3 mb-3">
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-sm">{city}</div>
          </div>
          <div className="mt-3 mb-3">
            <div className="img-hotel"></div>
          </div>
          <div className="mt-3 mb-3">
            <span className="md font-medium">Detail</span>
            <div className="text-sm">{detail}</div>
          </div>
          <div className="mt-3 mb-3 ">
            <span className="md font-medium">Phone</span>
            <div>{phone}</div>
          </div>
          <div className="mt-3 mb-3 ">
            <span className="md font-medium">Facilities</span>
            <div>{facility.join(', ')}</div>
          </div>
        </div>
      </div>
      <BookingBox
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setNumberOfGuest={setNumberOfGuest}
      />
      <div className="w-256 p-6 m-2 mt-4 rounded text-md ml-auto mr-auto">
        <div className="mt-3 mb-3 m-2">
          <div className="font-semibold text-lg">Avalable Rooms</div>
        </div>
        {rooms.map((room) => (
          <Room key={room.room_id} room={room} handleBooking={handleBooking} />
        ))}
      </div>
    </>
  )
}
