import axios from 'axios'

export const searchHotel = async ({ searchText, limit }) => (
    await axios.get('/api/hotels', { params: { search_text: searchText, limit } })
        .then(res => res)
        .catch(err => err.response)
)