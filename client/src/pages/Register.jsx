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
    <div className="w-256 flex justify-center m-auto mt-4">
      <div className="w-144 p-6 text-sm rounded m-2">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Username : </span>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                pattern=".{5,}"
                className="w-64 h-8 m-2"
                placeholder="username"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Email : </span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-64 h-8 m-2"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Password : </span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                pattern=".{6,}"
                className="w-64 h-8 m-2"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Confirm password : </span>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                pattern=".{6,}"
                className="w-64 h-8 m-2"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> First name : </span>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-64 h-8 m-2"
                placeholder="Firstname"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Last name : </span>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className="w-64 h-8 m-2"
                placeholder="Lastname"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Birth date : </span>
              <input
                type="date"
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-64 h-8 m-2"
                required
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="ml-auto mr-24">
              <span> Phone : </span>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                pattern=".{10,10}"
                className="w-64 h-8 m-2"
                placeholder="0912345678"
                required
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="w-64 h-8 m-2" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
