import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Footer from './components/footer'
import Contact from './pages/contact'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Add from './pages/add'
import Manual from './pages/manualEntry'
import PrivateRoutes from './utils/PrivateRoutes'
import WatchlistPage from './pages/watchlistPage'
import Edit from './pages/edit'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add' element={<Add />} />
          <Route path='/manual' element={<Manual />} />
          <Route path='/watchlist' element={<WatchlistPage />} />
          <Route path='/edit' element={<Edit />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
