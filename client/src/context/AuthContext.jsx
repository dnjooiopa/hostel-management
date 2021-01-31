import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null })

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    setAuth({ token: token || null })
  }, [])

  useEffect(() => {
    if (auth.token) {
      window.localStorage.setItem('token', auth.token)
    } else {
      window.localStorage.clear()
    }
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
