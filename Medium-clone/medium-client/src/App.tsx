import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Demo from './components/demo/Demo'

function App() {
  const auth = false

  return (
    <BrowserRouter>
      {auth ? <Home /> : <Demo />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
