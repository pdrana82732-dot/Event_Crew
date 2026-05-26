import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiLinkedin, FiYoutube, FiArrowUpRight, FiMail, FiX, FiExternalLink } from 'react-icons/fi'
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
  const [showModal, setShowModal] = useState(false)

  /* Fade-up on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('ft-visible')
        }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    footerRef.current?.querySelectorAll('.ft-fade').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Lock scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  /* Close on Escape */
  useEffect(() => {
    if (!showModal) return
    const handler = (e) => { if (e.key === 'Escape') setShowModal(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showModal])

  return (
    <>
      <footer className="footer" ref={footerRef}>

        {/* ── Atmospheric glow ── */}
        <div className="footer__glow" />

        {/* ── Top divider ── */}
        <div className="footer__rule ft-fade">
          <span className="footer__rule-line" />
          <span className="footer__rule-label">Event Crew</span>
          <span className="footer__rule-line" />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="footer__body">

          {/* Brand column */}
          <div className="footer__brand ft-fade">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <span>EC</span>
                <div className="footer-logo-pulse" />
              </div>
              <span className="footer__logo-text">
                Event<em> Crew</em>
              </span>
            </Link>

            <p className="footer__tagline">
              We bring premium events to life with care, energy, and the unyielding power of a united crew.
            </p>

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

          {/* Nav columns */}
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

            {/* Contact column */}
            <div className="footer__col footer__col--contact ft-fade ft-d3">
              <h4 className="footer__col-heading">Contact</h4>
              <a href="mailto:eventcrewofficial@gmail.com" className="footer__mail-card">
                <FiMail className="footer__mail-icon" />
                <span>eventcrewofficial@gmail.com</span>
                <FiArrowUpRight className="footer__mail-arrow" />
              </a>

              {/* ── Get In Touch → opens modal ── */}
              <button
                className="footer__cta-btn"
                onClick={() => setShowModal(true)}
              >
                Get In Touch
                <FiArrowUpRight />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom ft-fade">
          <div className="footer__bottom-line" />
          <div className="footer__bottom-row">
            <p className="footer__copy">
              © {new Date().getFullYear()} Event Crew. All rights reserved.
            </p>
            <div className="footer__legal">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="footer__legal-dot" />
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

      </footer>

      {/* ══════════ GET IN TOUCH MODAL ══════════ */}
      {showModal && (
        <div className="git-modal" role="dialog" aria-modal="true" aria-label="Get in touch">

          {/* Backdrop */}
          <div className="git-modal__backdrop" onClick={() => setShowModal(false)} />

          {/* Box */}
          <div className="git-modal__box">

            {/* Red shimmer top bar */}
            <div className="git-modal__topbar" />

            {/* Close */}
            <button
              className="git-modal__close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <FiX />
            </button>

            {/* Header */}
            <div className="git-modal__header">
              <span className="git-modal__eyebrow">Direct Connect</span>
              <h2 className="git-modal__title">Get In Touch</h2>
              <p className="git-modal__desc">
                Reach us directly — we respond within 24 hours.
              </p>
            </div>

            {/* Link cards */}
            <div className="git-modal__links">

              {/* Email */}
              <a href="mailto:eventcrewofficial@gmail.com" className="git-link">
                <div className="git-link__icon git-link__icon--email">
                  <FiMail />
                </div>
                <div className="git-link__body">
                  <span className="git-link__label">Email</span>
                  <span className="git-link__value">eventcrewofficial@gmail.com</span>
                </div>
                <FiExternalLink className="git-link__ext" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/eventcrew-official/"
                target="_blank"
                rel="noopener noreferrer"
                className="git-link"
              >
                <div className="git-link__icon git-link__icon--linkedin">
                  <FiLinkedin />
                </div>
                <div className="git-link__body">
                  <span className="git-link__label">LinkedIn</span>
                  <span className="git-link__value">Event Crew Official</span>
                </div>
                <FiExternalLink className="git-link__ext" />
              </a>

            </div>

            <p className="git-modal__esc">Press <kbd>Esc</kbd> or click outside to close</p>
          </div>
        </div>
      )}
    </>
  )
}