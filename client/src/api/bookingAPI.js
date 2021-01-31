import axios from 'axios'

export const bookRoom = async ({ token, hotel_id, room_id, check_in_date, check_out_date, booking_date, no_guest }) => (
    await axios.post('/api/bookings', { hotel_id, room_id, check_in_date, check_out_date, booking_date, no_guest }, { headers: { token } })
        .then(res => res)
        .catch(err => err.response)
)

export const getBookings = async ({ token }) => (
    await axios.get('/api/bookings', { headers: { token } })
        .then(res => res)
        .catch(err => err.response)
)

