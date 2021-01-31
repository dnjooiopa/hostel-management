import axios from 'axios'

export const searchHotel = async ({ searchText, limit=5 }) => (
    await axios.get('/api/hotels', { params: { search_text: searchText, limit } })
        .then(res => res)
        .catch(err => err.response)
)

export const getHotelData = async ({ hotelID }) => (
    await axios.get(`/api/hotels/${hotelID}`)
        .then(res => res)
        .catch(err => err.response)
)