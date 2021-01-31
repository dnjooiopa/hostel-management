import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHotelData } from '../api'

const filterFacility = (facility) => {
  let filtered = [
    ...Object.keys(facility).filter(
      (key) => facility[key] && key != 'hotel_id'
    ),
  ]
  filtered = filtered.map((fname => fname.replace('_', ' ')))
  return filtered
}

export const Hotel = () => {
  const { hotel_id: hotelID } = useParams()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [detail, setDetail] = useState('')
  const [phone, setPhone] = useState('')
  const [facility, setFacility] = useState([])
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    getHotelData({ hotelID })
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
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="w-256 p-6 m-2 rounded text-md">
      <div className="w-full">
        <div className="mt-3 mb-3">
          <div className="font-semibold text-xl">{name}</div>
          <div className="text-sm">{city}</div>
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
  )
}
