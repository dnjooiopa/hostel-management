import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null })

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    setAuth(token ? JSON.parse(token) : null)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('token', JSON.stringify(auth))
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
