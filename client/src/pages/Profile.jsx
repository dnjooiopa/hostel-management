import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getProfile } from '../api'
import { AuthContext } from '../context'

const filterBirthDate = (dateString) => {
  const utcDate = new Date(dateString).toUTCString()
  return utcDate.split(' ').slice(0, 4).join(' ')
}

export const Profile = () => {
  const { auth, setAuth } = useContext(AuthContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const { token } = auth
    if (token) {
      getProfile({ token })
        .then((res) => {
          const { status, error, data } = res.data
          if (status == 'error') {
            alert(error)
            history.push('/')
          } else {
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setEmail(data.email)
            setBirthDate(filterBirthDate(data.birth_date))
            setPhone(data.phone)
          }
        })
        .catch((error) => console.log(error))
    }
  }, [auth])

  if (auth.token) {
    return (
      <div className="flex flex-col w-256 mt-4 ml-auto mr-auto">
        <div className="flex rounded mt-4 justify-center">
          <h2>My Profile</h2>
        </div>
        <div className="rounded p-6 mt-4 text-md">
          <div>
            <span>NAME: </span>
            <span>
              {firstName} {lastName}
            </span>
          </div>
          <div>
            <span>EMAIL: </span>
            <span>{email}</span>
          </div>
          <div>
            <span>PHONE: </span>
            <span>{phone}</span>
          </div>
          <div>
            <span>BIRTH DATE: </span>
            <span>{birthDate}</span>
          </div>
        </div>
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
