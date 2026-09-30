import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar, { Announcement } from './components/Navbar'
import Footer from './components/Footer'
import Toaster from './components/Toaster'
import { CartDrawer, WishlistDrawer, SearchModal } from './components/Drawers'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Announcement /><Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} /><Route path="/about" element={<About />} />
          <Route path="*" element={<div className="wrap py-32 text-center"><h1 className="text-7xl font-bold">Out of bounds</h1><Link to="/" className="btn btn-dark mt-8">Back home</Link></div>} />
        </Routes>
      </main>
      <Footer /><CartDrawer /><WishlistDrawer /><SearchModal /><Toaster />
    </>
  )
}
