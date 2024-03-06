import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import Home from './components/home/Home'
import Demo from './components/demo/Demo'
import HomeHeader from './components/home/HomeHeader'
import DemoHeader from './components/demo/DemoHeader'
import { useBlogContext } from './context/Context'

function App() {
  const { currentUser } = useBlogContext()

  return (
    <BrowserRouter>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        {currentUser && <Route path='/' element={<Home />} />}
        {!currentUser && <Route path='/demo' element={<Demo />} />}
        <Route
          path='*'
          element={<Navigate to={!currentUser ? '/demo' : '/'} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
