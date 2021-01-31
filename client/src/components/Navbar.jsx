import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context'

import hamburger from '../assets/hamburger.png'

export const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext)

  return (
    <div className="navbar w-full flex justify-center bg-blue-500">
      <div className="w-256 flex align-center text-white">
        <img className="w-12 h-12" src={hamburger} alt="hamburger-menu" />
        <NavLink to="/">
          <div className="text-lg">Home</div>
        </NavLink>
        {!auth.token ? (
          <NavLink to="/login" className="ml-auto">
            <button>Log In</button>
          </NavLink>
        ) : (
          <button className="ml-auto" onClick={() => setAuth({ token: null })}>
            Log Out
          </button>
        )}
      </div>
    </div>
  )
}
