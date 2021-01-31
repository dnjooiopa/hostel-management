import { Sidebar } from './components'
import { Navbar } from './components/Navbar'
import Routing from './routes'

const App = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Routing />
      </div>
    </>
  )
}

export default App
