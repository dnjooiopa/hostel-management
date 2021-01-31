import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context'
import { comparePassword } from '../helpers'
import { register } from '../api'

export const Register = () => {
  const history = useHistory()

  const { auth, setAuth } = useContext(AuthContext)

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState(new Date())
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (auth.token) {
      history.push('/')
    }
  }, [auth])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comparePassword(password, confirmPassword)) {
      return alert("Password don't match!")
    }

    register({
      username,
      email,
      password,
      firstName,
      lastName,
      birthDate,
      phone,
    })
      .then((res) => {
        const { status, error, data } = res.data
        if (status === 'error') {
          alert(error)
        } else {
          alert("You've registered")
          history.push('/')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="w-256">
      <div className="w-144 ml-auto mr-auto p-6 text-sm rounded m-2">
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-full">
            Username :{' '}
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              pattern=".{5,}"
              required
              className="w-auto"
            />
          </div>
          <div className="w-full">
            Email:{' '}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            Password:{' '}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              pattern=".{6,}"
              required
            />
          </div>
          <div className="w-full">
            Confirm password:{' '}
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              pattern=".{6,}"
              required
            />
          </div>
          <div className="w-full">
            First name:{' '}
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            Last name:{' '}
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            Birth date:{' '}
            <input
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            Phone:{' '}
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              pattern=".{10,10}"
              required
            />
          </div>
          <div className="w-full">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}
