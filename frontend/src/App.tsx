import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Footer from './components/footer'
import Contact from './pages/contact'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
