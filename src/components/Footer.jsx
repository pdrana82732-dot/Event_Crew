import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiLinkedin, FiYoutube, FiArrowUpRight, FiMail } from 'react-icons/fi'
import '../styles/Footer.css'

const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Family', to: '/family' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Event Support', to: '/services' },
      { label: 'Media Production', to: '/services' },
      { label: 'Logistics', to: '/services' },
      { label: 'Marketing', to: '/services' },
    ],
  },
]

const SOCIALS = [
  {
    icon: <FiInstagram />,
    label: 'Instagram',
    href: 'https://www.instagram.com/eventcrew.official?igsh=MXN6cm5rd3I4dnJobA%3D%3D',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/eventcrew-official/',
  },
  {
    icon: <FiYoutube />,
    label: 'YouTube',
    href: 'https://youtube.com/@eventcrew.official?si=-h06QCTEwQLjgDYB',
  },
]

export default function Footer() {
  const footerRef = useRef(null)

  /* Fade-up on scroll for footer children */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('ft-visible')
        }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    footerRef.current
      ?.querySelectorAll('.ft-fade')
      .forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <footer className="footer" ref={footerRef}>

      {/* ── Atmospheric glow ── */}
      <div className="footer__glow" />

      {/* ── Top divider line with label ── */}
      <div className="footer__rule ft-fade">
        <span className="footer__rule-line" />
        <span className="footer__rule-label">Event Crew</span>
        <span className="footer__rule-line" />
      </div>

      {/* ══════════ MAIN CONTENT ROW ══════════ */}
      <div className="footer__body">

        {/* ── Brand column ── */}
        <div className="footer__brand ft-fade">
          <Link to="/" className="footer__logo">
            <div className="footer__logo-icon">
              <span>EC</span>
              <div className="footer-logo-pulse" />
            </div>
            <span className="footer__logo-text">
              Event<em>Crew</em>
            </span>
          </Link>

          <p className="footer__tagline">
            We bring premium events to life with care, energy, and the unyielding power of a united crew.
          </p>

          {/* Socials */}
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="footer__social-btn"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Nav columns ── */}
        <div className="footer__nav-cols">
          {NAV_COLS.map((col, ci) => (
            <div key={col.heading} className={`footer__col ft-fade ft-d${ci + 1}`}>
              <h4 className="footer__col-heading">{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">
                      <span className="footer__link-arrow">→</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Contact column ── */}
          <div className="footer__col footer__col--contact ft-fade ft-d3">
            <h4 className="footer__col-heading">Contact</h4>
            <a
              href="mailto:eventcrewofficial@gmail.com"
              className="footer__mail-card"
            >
              <FiMail className="footer__mail-icon" />
              <span>eventcrewofficial@gmail.com</span>
              <FiArrowUpRight className="footer__mail-arrow" />
            </a>
            <Link to="/contact" className="footer__cta-btn">
              Get In Touch
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════ BOTTOM BAR ══════════ */}
      <div className="footer__bottom ft-fade">
        <div className="footer__bottom-line" />
        <div className="footer__bottom-row">
          <p className="footer__copy">
            © {new Date().getFullYear()} EventCrew. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <span className="footer__legal-dot" />
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  )
}