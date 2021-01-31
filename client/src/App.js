import { Navbar } from './components/Navbar'
import Routing from './routes'

const App = () => {
  return (
    <div className="flex justify-center w-full flex-wrap">
      <Navbar />
      <Routing />
    </div>
  )
}

export default App
