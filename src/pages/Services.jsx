import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiX, FiMail, FiLinkedin } from 'react-icons/fi'
import {
  MdEventAvailable, MdMovieCreation, MdLocalShipping, MdTrendingUp
} from 'react-icons/md'
import '../styles/Services.css'

const services = [
  {
    icon: <MdEventAvailable />,
    title: 'Event Support',
    desc: 'End-to-end management for premium physical and digital experiences. We handle every detail so you can focus on what matters.',
    features: [
      'Full venue coordination & setup',
      'On-site crew management',
      'Digital & hybrid event platforms',
      'Real-time problem resolution',
      'Post-event reporting & analytics',
    ],
  },
  {
    icon: <MdMovieCreation />,
    title: 'Media Production',
    desc: 'Cinematic quality content creation tailored for modern platforms — from highlight reels to full documentary-style coverage.',
    features: [
      'Multi-camera live production',
      '4K video & photography',
      'Branded highlight packages',
      'Social media content creation',
      'Post-production & editing',
    ],
  },
  {
    icon: <MdLocalShipping />,
    title: 'Logistics',
    desc: 'Flawless execution and supply chain management for global campaigns — we ensure everything arrives on time, every time.',
    features: [
      'Nationwide equipment transport',
      'Vendor & supplier management',
      'Inventory tracking systems',
      'Last-mile delivery solutions',
      'International event logistics',
    ],
  },
  {
    icon: <MdTrendingUp />,
    title: 'Marketing',
    desc: 'Data-driven strategies that guarantee ROI and audience growth — turning every event into a marketing powerhouse.',
    features: [
      'Pre-event audience targeting',
      'Influencer & creator partnerships',
      'Social media campaign management',
      'Email & SMS marketing',
      'Post-event conversion strategies',
    ],
  },
]

// ── Contact Popup ───────────────────────────────────────────────
function ContactModal({ open, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={`modal-backdrop${open ? ' modal-backdrop--open' : ''}`} onClick={onClose}>
      <div
        className={`modal${open ? ' modal--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Contact us"
      >
        {/* Atmospheric glow */}
        <div className="modal__glow" />

        {/* Close button */}
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        {/* Header */}
        <div className="modal__eyebrow">
          <span className="modal__eyebrow-dash" />
          Get In Touch
        </div>
        <h2 className="modal__title">
          Let's Build Something Extraordinary
        </h2>
        <p className="modal__sub">
          Reach out through any of the channels below — we respond within 24 hours.
        </p>

        {/* Divider */}
        <div className="modal__divider">
          <span className="modal__divider-line" />
          <span className="modal__divider-diamond" />
          <span className="modal__divider-line" />
        </div>

        {/* Contact cards */}
        <div className="modal__contacts">

          {/* Email */}
          <a
            className="modal__contact-card"
            href="mailto:eventcrewofficial@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="modal__contact-icon">
              <FiMail />
            </div>
            <div className="modal__contact-info">
              <span className="modal__contact-label">Email Us</span>
              <span className="modal__contact-value">eventcrewofficial@gmail.com</span>
            </div>
            <FiArrowRight className="modal__contact-arrow" />
          </a>

          {/* LinkedIn */}
          <a
            className="modal__contact-card"
            href="https://www.linkedin.com/company/eventcrew-official/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="modal__contact-icon modal__contact-icon--linkedin">
              <FiLinkedin />
            </div>
            <div className="modal__contact-info">
              <span className="modal__contact-label">Connect on LinkedIn</span>
              <span className="modal__contact-value">eventcrew-official</span>
            </div>
            <FiArrowRight className="modal__contact-arrow" />
          </a>

        </div>

        {/* Footer note */}
        <p className="modal__note">
          — The Event Crew team looks forward to hearing from you.
        </p>

        {/* Corner accents */}
        <div className="modal__corner modal__corner--tl" />
        <div className="modal__corner modal__corner--br" />
      </div>
    </div>
  )
}

// ── Arrow SVG ───────────────────────────────────────────────────
function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ── Main page ───────────────────────────────────────────────────
export default function Services() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('show')
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="services-page">

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section className="services-hero">
        <div className="services-hero__atmo" />
        <div className="services-hero__atmo2" />
        <div className="services-hero__grid" />
        <div className="services-hero__noise" />

        <div className="services-hero__inner">

          {/* Vertical side label */}
          <div className="services-hero__side-label">
            <span className="services-hero__side-line" />
            <span>Event Crew — Services</span>
          </div>

          <div className="services-hero__eyebrow fade-up">
            <span className="eyebrow-dash" />
            Our Expertise
          </div>

          <h1 className="services-hero__title fade-up delay-1">
            Comprehensive<br />
            <span className="services-hero__title--red">Capabilities</span>
          </h1>

          <div className="services-hero__divider fade-up delay-2">
            <span className="sdivider-line" />
            <span className="sdivider-diamond" />
            <span className="sdivider-line" />
          </div>

          <p className="services-hero__desc fade-up delay-3">
            Everything your event needs, handled with dedication, trust, and the calculated
            precision of a professional crew.
          </p>
        </div>
      </section>


      {/* ══════════════════════════
          SERVICES GRID
      ══════════════════════════ */}
      <section className="services-grid-section">
        <div className="services-page__grid">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`svc-card fade-up delay-${i + 1}`}
            >
              {/* Top accent line */}
              <div className="svc-card__topbar" />

              {/* Ghost number */}
              <div className="svc-card__ghost">0{i + 1}</div>

              {/* Header row */}
              <div className="svc-card__header">
                <span className="svc-card__num">0{i + 1}</span>
                <div className="svc-card__icon">{s.icon}</div>
              </div>

              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__desc">{s.desc}</p>

              {/* Red rule */}
              <div className="svc-card__rule" />

              {/* Feature list */}
              <ul className="svc-card__features">
                {s.features.map((f) => (
                  <li key={f} className="svc-card__feature">
                    <span className="svc-card__feature-dot" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="svc-card__cta"
                onClick={() => setModalOpen(true)}
              >
                Get a Quote <Arrow size={12} />
              </button>

              {/* Corner accents */}
              <div className="svc-card__corner svc-card__corner--tl" />
              <div className="svc-card__corner svc-card__corner--br" />
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════
          CTA BAND
      ══════════════════════════ */}
      <section className="services-cta fade-up">
        <div className="services-cta__glow" />
        <div className="services-cta__inner">
          <div className="services-cta__eyebrow">
            <span className="eyebrow-dash" />
            Ready to Begin
            <span className="eyebrow-dash" />
          </div>
          <h2 className="services-cta__title">
            Ready to Build Something Great?
          </h2>
          <p className="services-cta__sub">
            Let's talk about your next project. We'd love to engineer your milestone story.
          </p>
          <button className="services-cta__btn" onClick={() => setModalOpen(true)}>
            Start a Conversation <Arrow size={14} />
          </button>
        </div>
      </section>

      {/* ══════════════════════════
          CONTACT MODAL
      ══════════════════════════ */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

    </main>
  )
}