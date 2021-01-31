import { useState, useEffect, useContext } from 'react'
import { login } from '../api'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context'

export const Login = () => {
  const history = useHistory()

  const { auth, setAuth } = useContext(AuthContext)

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.token) {
      history.push('/')
    }
  }, [auth])

  const handleLogin = () => {
    login({ username, password })
      .then((res) => {
        const { status, error, data } = res.data
        if (status == 'error') {
          alert(error)
        } else {
          console.log(data)
          const { token } = data
          setAuth({ token })
          history.push('/')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="container">
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        Log In
      </button>
    </div>
  )
}
