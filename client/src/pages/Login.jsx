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

  const handleLogin = (e) => {
    e.preventDefault()

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
    <div className="w-full">
      <div className="w-144 ml-auto mr-auto mt-2 p-6 flex items-center">
        <form onSubmit={handleLogin} className="w-full flex flex-col align-center">
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-64 h-8 m-2"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 h-8 m-2"
            />
          <button className="w-64 h-8 m-2" type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}
