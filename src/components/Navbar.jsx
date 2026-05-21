import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/Navbar.css'

// Added the 'About Us' section here
const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us', end: false },
  { to: '/services', label: 'Services', end: false },
  { to: '/gallery', label: 'Gallery', end: false },
  { to: '/family', label: 'Family', end: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu overlay is active
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={[
        'navbar',
        scrolled ? 'navbar--scrolled' : '',
        open ? 'navbar--menu-open' : '',
      ].filter(Boolean).join(' ')}>

        <div className="navbar__inner">

          {/* ── Logo ── */}
          <Link to="/" className="navbar__logo" onClick={close}>
            <div className="navbar__logo-icon">
              <span>EC</span>
              <div className="logo-pulse" />
            </div>
            <span className="navbar__logo-text">
              Event<em>Crew</em>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="navbar__links">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                >
                  <span className="link-text">{label}</span>
                  <span className="link-line" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA Button ── */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navbar__cta ${isActive ? 'active' : ''}`
            }
          >
            <span>Contact</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavLink>

          {/* ── Animated Hamburger ── */}
          <button
            className={`navbar__hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__backdrop" onClick={close} />

        <div className="mobile-menu__panel">
          <nav className="mobile-menu__nav">
            {navLinks.map(({ to, label, end }, i) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={close}
                className={({ isActive }) => isActive ? 'active' : ''}
                style={{ '--i': i }}
              >
                <span className="mobile-link__num">0{i + 1}</span>
                <span className="mobile-link__label">{label}</span>
                <span className="mobile-link__arrow">→</span>
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              onClick={close}
              className={({ isActive }) =>
                `mobile-menu__cta ${isActive ? 'active' : ''}`
              }
              style={{ '--i': navLinks.length }}
            >
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </NavLink>
          </nav>

          <div className="mobile-menu__footer">
            <p>© 2026 EventCrew. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}