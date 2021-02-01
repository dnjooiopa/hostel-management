import { NavLink, useHistory } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context'

import hamburger from '../assets/hamburger.png'

export const Navbar = () => {
  const history = useHistory()
  const { auth, setAuth } = useContext(AuthContext)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      document.getElementById('side-bar').style.display = 'none'
      setIsSidebarOpen(false)
    } else {
      document.getElementById('side-bar').style.display = 'flex'
      setIsSidebarOpen(true)
    }
  }

  const handleLogOut = () => {
    setAuth({ token: null })
    return history.push('/')
  }

  return (
    <div className="navbar w-full flex justify-center bg-blue-500">
      <div className="w-256 flex align-center text-white">
        <img
          onClick={toggleSidebar}
          className="hamburger-menu w-12 h-12"
          src={hamburger}
          alt="hamburger-menu"
        />
        <NavLink to="/" className="text-lg ml-4">
          Home
        </NavLink>
        <NavLink to="/search" className="text-md ml-6">
          Search
        </NavLink>
        <div className="ml-auto">
          {!auth.token ? (
            <>
              <NavLink to="/login" className="mr-2">
                <button>Log In</button>
              </NavLink>
              <NavLink to="/register" className="mr-2">
                <button>Register</button>
              </NavLink>
            </>
          ) : (
            <button className="mr-2" onClick={() => handleLogOut()}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
