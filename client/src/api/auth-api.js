import axios from 'axios'

export const login = async ({ username, password }) => (
    await axios.post('/api/login', { username, password })
        .then(res => res)
        .catch(err => err.response)
)

export const register = async ({ username, email, password, firstName, lastName, birthDate, phone }) => (
    await axios.post('/api/register', { username, email, password, first_name: firstName, last_name: lastName, birth_date: birthDate, phone })
        .then(res => res)
        .catch(err => err.response)
)
