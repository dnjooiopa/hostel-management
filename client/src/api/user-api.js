import axios from 'axios'

export const getProfile = async ({ token }) => (
    await axios.get(`/api/customers`, { headers: { token } })
        .then(res => res)
        .catch(err => err.response)
)