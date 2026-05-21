import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

// ─── Data ────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '🎯',
    title: 'Event Support',
    desc: 'End-to-end management for premium physical and digital experiences, crafted with precision and elegance.',
    points: [
      'Full end-to-end event planning & coordination',
      'On-site crew management and execution',
      'Venue sourcing, setup, and teardown',
      'Real-time issue resolution & contingency planning',
      'Post-event reporting and client debrief',
    ],
  },
  {
    icon: '🎬',
    title: 'Media Production',
    desc: 'Cinematic quality content creation tailored for modern platforms and discerning audiences.',
    points: [
      'Professional videography & photography',
      'Live streaming with multi-camera setups',
      'Post-production editing and color grading',
      'Social media content packages',
      'Highlight reels and full-event coverage',
    ],
  },
  {
    icon: '🚚',
    title: 'Logistics',
    desc: 'Flawless execution and supply chain mastery for seamless global campaigns.',
    points: [
      'End-to-end supply chain coordination',
      'Equipment procurement and transport',
      'Vendor and supplier management',
      'On-time delivery tracking and reporting',
      'Customs handling for international events',
    ],
  },
  {
    icon: '📈',
    title: 'Marketing',
    desc: 'Data-driven strategies that guarantee measurable ROI and sustained audience growth.',
    points: [
      'Targeted digital & social media campaigns',
      'Brand identity development and design',
      'Audience analytics and performance reporting',
      'Influencer outreach and partnership management',
      'Email marketing and campaign automation',
    ],
  },
]

const GALLERY = [
  {
    src: 'https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1777835256/event_3_x9xaeq.jpg',
    tag: 'Concerts',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    tag: 'Live Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    tag: 'Corporate',
  },
]

// ─── Count-up hook ───────────────────────────────────────────────
function useCountUp(target, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let t0 = null
    const tick = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / 1800, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return count
}

// ─── Fade-up on scroll ───────────────────────────────────────────
function useFadeUp() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Stat item ───────────────────────────────────────────────────
function Stat({ value, label, active }) {
  const num = parseInt(value)
  const suffix = value.replace(/\d/g, '')
  const count = useCountUp(num, active)
  return (
    <div className="stat">
      <span className="stat__num">{count}{suffix}</span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

// ─── Arrow icon ──────────────────────────────────────────────────
function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ─── Chevron icon (for expand toggle) ────────────────────────────
function Chevron({ size = 14, open }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s ease',
        display: 'inline-block',
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── Service Card with accordion expand ──────────────────────────
function ServiceCard({ s, index, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!contentRef.current) return
    setHeight(isOpen ? contentRef.current.scrollHeight : 0)
  }, [isOpen])

  return (
    // alignSelf: 'start' is the critical fix — prevents CSS grid from
    // stretching ALL cards to match the tallest one when one expands.
    <div
      className={`service-card fade-up d${index + 1}${isOpen ? ' service-card--open' : ''}`}
      style={{ alignSelf: 'start' }}
    >
      <div className="service-card__num">0{index + 1}</div>
      <span className="service-card__icon">{s.icon}</span>
      <div className="service-card__title">{s.title}</div>
      <p className="service-card__desc">{s.desc}</p>

      {/* Animated expand panel */}
      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={contentRef}>
          <ul className="service-card__points">
            {s.points.map((pt, i) => (
              <li key={i} className="service-card__point">
                {/* Solid bullet using • character — always visible */}
                <span className="service-card__point-bullet">•</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Explore / Close toggle */}
      <span
        className="service-card__link"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      >
        {isOpen ? 'Close' : 'Explore'} <Chevron size={11} open={isOpen} />
      </span>
    </div>
  )
}

// ─── Home page ───────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()
  const [statsOn, setStatsOn] = useState(false)
  const statsRef = useRef(null)
  const [openCard, setOpenCard] = useState(null) // index of open service card

  useFadeUp()

  useEffect(() => {
    if (!statsRef.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true) },
      { threshold: 0.5 }
    )
    io.observe(statsRef.current)
    return () => io.disconnect()
  }, [])

  const handleCardToggle = (index) => {
    // If same card clicked again → close it; else open the new one (closes previous)
    setOpenCard((prev) => (prev === index ? null : index))
  }

  return (
    <main className="home">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero__atmo" />
        <div className="hero__atmo2" />
        <div className="hero__grid" />

        {/* ── Left: Text ── */}
        <div className="hero__text">

          <div className="hero__eyebrow fade-up">
            <span className="hero__eyebrow-line" />
            Event Management &amp; Production
          </div>

          <h1 className="hero__title fade-up d1">
            Bonded by<br />
            <em>Work,</em><br />
            <span className="ghost">Growing Like</span><br />
            A Family.
          </h1>

          <p className="hero__desc fade-up d2">
            A collective of passionate professionals who come together like family —
            to support, manage, and bring extraordinary events to life.
          </p>

          <div className="hero__actions fade-up d3">
            <button className="btn-primary" onClick={() => navigate('/services')}>
              Explore Services <Arrow />
            </button>
            <button className="btn-outline" onClick={() => navigate('/gallery')}>
              View Portfolio
            </button>
          </div>

          <div className="hero__stats fade-up d4" ref={statsRef}>
            <Stat value="2+" label="Years of Excellence" active={statsOn} />
            <Stat value="50+" label="Events Delivered" active={statsOn} />
            <Stat value="100+" label="Happy Clients" active={statsOn} />
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className="hero__visual fade-up d2">
          <div className="hero__img-wrap">
            <div className="hero__frame-back" />
            <div className="hero__img-glow" />
            <div className="hero__img-frame">
              <div className="hero__img-inner">
                <img
                  src="https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776624050/Pic_0_fhnppk.jpg"
                  alt="Event Crew Team"
                />
                <div className="hero__img-shimmer" />
              </div>
            </div>
            <div className="corner-tl" />
            <div className="corner-br" />
            <div className="hero__badge">
              <span className="badge-dot" />
              <span className="badge-text">Est. 2022</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider">
        <span className="section-divider__dot" />
        <span className="section-divider__dot" style={{ opacity: 0.4 }} />
        <span className="section-divider__dot" style={{ opacity: 0.2 }} />
      </div>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="section">
        <div className="services-header">
          <div>
            <div className="section-eyebrow fade-up">What We Do</div>
            <h2 className="section-title fade-up d1">
              Comprehensive<br /><em>Capabilities</em>
            </h2>
          </div>
          <p className="services-sub fade-up d2">
            Everything your event needs, handled with dedication, precision, and unwavering trust.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              s={s}
              index={i}
              isOpen={openCard === i}
              onToggle={() => handleCardToggle(i)}
            />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider">
        <span className="section-divider__dot" />
      </div>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section className="section">
        <div className="gallery-header">
          <div>
            <div className="section-eyebrow fade-up">Our Work</div>
            <h2 className="section-title fade-up d1">Featured <em>Portfolio</em></h2>
          </div>
          <button className="btn-outline fade-up d2" onClick={() => navigate('/gallery')}>
            Full Gallery <Arrow />
          </button>
        </div>

        <div className="gallery-grid">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`gallery-item fade-up d${i + 1}`}
              onClick={() => navigate('/gallery')}
            >
              <img src={img.src} alt={img.tag} loading="lazy" />
              <span className="gallery-item__tag">{img.tag}</span>
              <span className="gallery-item__view">View <Arrow size={10} /></span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════════ */}
      <section className="testimonial">
        <blockquote className="t-quote fade-up">
          At Event Crew, our strength lies in our unity. We turn every gathering
          into a legacy — every moment into a memory that endures.
        </blockquote>
        <p className="t-source fade-up d1">— The Event Crew</p>
      </section>

    </main>
  )
}