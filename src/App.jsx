import { useEffect } from 'react' // ✅ Added useEffect
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom' // ✅ Added useLocation
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Family from './pages/Family'
import Contact from './pages/Contact'

// ─── TINY INLINE HELP COMPONENT ───
function ScrollToTopInsideApp() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Snaps page to top instantly on click
  }, [pathname])

  return null // It doesn't render anything visual
}

export default function App() {
  return (
    <BrowserRouter>
      {/* This invisible helper component handles the top scroll logic */}
      <ScrollToTopInsideApp />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/family" element={<Family />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}