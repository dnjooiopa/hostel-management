import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context'

import hamburger from '../assets/hamburger.png'

export const Navbar = () => {
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

  return (
    <div className="navbar w-full flex justify-center bg-blue-500">
      <div className="w-256 flex align-center text-white">
        <img
          onClick={toggleSidebar}
          className="w-12 h-12"
          src={hamburger}
          alt="hamburger-menu"
        />
        <NavLink to="/">
          <div className="text-lg ml-4">Home</div>
        </NavLink>
        <div className="ml-auto">
          {!auth.token ? (
            <>
              <NavLink to="/login">
                <button>Log In</button>
              </NavLink>
              <NavLink to="/register">
                <button>Register</button>
              </NavLink>
            </>
          ) : (
            <button onClick={() => setAuth({ token: null })}>Log Out</button>
          )}
        </div>
      </div>
    </div>
  )
}
