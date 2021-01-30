import { useState } from 'react'
import { login } from '../api'

export const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    login({ username, password })
      .then((res) => {
        const { status, error, data } = res.data
        if (status == 'error') {
          alert(error)
        } else {
          console.log(data)
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
