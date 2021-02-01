import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div id="side-bar" className="w-120 bg-gray-700 p-6 hidden">
      <div className="w-full text-lg text-white">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          <Link to="/bookings">My booking</Link>
        </div>
      </div>
    </div>
  )
}
