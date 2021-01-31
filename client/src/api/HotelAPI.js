import axios from 'axios'

export const searchHotel = async ({ searchText, limit=5 }) => (
    await axios.get('/api/hotels', { params: { search_text: searchText, limit } })
        .then(res => res)
        .catch(err => err.response)
)

export const getHotelData = async ({ hotel_id }) => (
    await axios.get(`/api/hotels/${hotel_id}`)
        .then(res => res)
        .catch(err => err.response)
)