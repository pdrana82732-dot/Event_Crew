import { useState, useEffect, useRef } from 'react'
import { FiX, FiZoomIn, FiHeart, FiZap, FiShield, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'
import '../styles/Family.css'

const familyImages = [
  {
    src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg",
    caption: "Annual Crew Conclave",
    tag: "Events",
    size: "tall",
  },
  {
    src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg",
    caption: "Behind The Scenes Chaos",
    tag: "BTS",
    size: "wide",
  },
  // Placeholder slots — drop in more images as you expand
  {
    src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg",
    caption: "Production War Room",
    tag: "Studio",
    size: "square",
  },
  {
    src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg",
    caption: "Broadcast Night Live",
    tag: "Events",
    size: "tall",
  },
]

const TAGS = ['All', ...Array.from(new Set(familyImages.map(img => img.tag)))]

const pillars = [
  {
    icon: <FiHeart />,
    title: 'Radical Trust',
    desc: 'We operate transparently. In high-pressure live production rooms, knowing your team has your back handles every unexpected event layout curveball.',
  },
  {
    icon: <FiZap />,
    title: 'Shared Kinetic Energy',
    desc: 'From late-night venue setups to real-time marketing strategy shifts, our collective speed scales event timelines smoothly.',
  },
  {
    icon: <FiShield />,
    title: 'Vetted Synergy',
    desc: "We aren't just an ad-hoc freelancer pool. We are built with cross-trained creative engineers who move as a single, coordinated mechanism.",
  },
]

export default function Family() {
  const [modal, setModal] = useState(null)
  const [modalIndex, setModalIndex] = useState(0)
  const [activeTag, setActiveTag] = useState('All')
  const [entered, setEntered] = useState(false)
  const observerRef = useRef(null)

  const filtered = activeTag === 'All'
    ? familyImages
    : familyImages.filter(img => img.tag === activeTag)

  /* ── Intersection observer for staggered reveals ── */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observerRef.current.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observerRef.current.observe(el))
    return () => observerRef.current?.disconnect()
  }, [activeTag])

  /* ── Hero entrance ── */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  /* ── Keyboard navigation for lightbox ── */
  useEffect(() => {
    if (!modal) return
    const handler = (e) => {
      if (e.key === 'Escape') setModal(null)
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modal, modalIndex, filtered])

  const openModal = (img, index) => {
    setModal(img)
    setModalIndex(index)
  }

  const navigate = (dir) => {
    const next = (modalIndex + dir + filtered.length) % filtered.length
    setModal(filtered[next])
    setModalIndex(next)
  }

  return (
    <main className="page family-page">

      {/* ─── HERO ─── */}
      <section className="family-hero">
        <div className={`family-hero__container ${entered ? 'hero-entered' : ''}`}>

          {/* Decorative grid lines */}
          <div className="hero-grid-lines" aria-hidden="true">
            {[...Array(5)].map((_, i) => <span key={i} className="hero-grid-line" style={{ '--li': i }} />)}
          </div>

          {/* Royal blue top accent bar */}
          <div
            aria-hidden="true"
            style={{
              width: 56,
              height: 4,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #2356C8 0%, #4A90D9 100%)',
              margin: '0 auto 1.5rem',
              opacity: 0.9,
            }}
          />

          <div className="family-label">
            <span className="label-dot" />
            Our Core Sync
          </div>

          <h1 className="family-title">
            Meet <span className="family-title__accent">The Family</span>
          </h1>

          {/* Animated divider */}
          <div className="family-hero__line">
            <span className="line-fill" />
          </div>

          <p className="family-subtext">
            Behind every flawless frame, structural asset delivery, and high-octane esports broadcast sits a tightly synchronized, multi-talented unit.
          </p>

          {/* Royal blue stat strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2.5rem',
              marginTop: '3rem',
              padding: '1.5rem 2.5rem',
              borderRadius: 14,
              background: 'rgba(35,86,200,0.18)',
              border: '1px solid rgba(74,144,217,0.28)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {[
              { num: '50+', label: 'Events Produced' },
              { num: '12', label: 'Core Members' },
              { num: '3+', label: 'Years Together' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Syne', system-ui",
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {num}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(74,144,217,0.85)',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll-cue" aria-hidden="true">
            <span className="scroll-dot" />
          </div>
        </div>
      </section>

      {/* ─── VALUE PILLARS ─── */}
      <section className="family-values-section">
        {/* Royal blue section stripe */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            marginBottom: '1.25rem',
          }}
        >
          {[32, 12, 6].map((w, i) => (
            <span key={i} style={{
              display: 'block',
              width: w,
              height: 3,
              borderRadius: 2,
              background: i === 0
                ? 'linear-gradient(90deg,#1A3C8F,#2356C8)'
                : i === 1
                  ? '#4A90D9'
                  : 'rgba(74,144,217,0.35)',
            }} />
          ))}
        </div>

        <div className="values-eyebrow fade-up">What drives us</div>
        <div className="family-values-grid">
          {pillars.map((p, i) => (
            <div key={i} className="value-pillar fade-up" style={{ '--i': i + 1 }}>
              {/* Royal blue pillar index */}
              <div style={{
                position: 'absolute',
                top: 20,
                right: 24,
                fontFamily: "'Syne', system-ui",
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#2356C8',
                opacity: 0.35,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="value-pillar__icon-wrap">
                <div className="value-pillar__icon">{p.icon}</div>
                <div className="value-pillar__icon-ring" aria-hidden="true" />
              </div>

              {/* Royal blue underline on title */}
              <h3 style={{ position: 'relative', display: 'inline-block' }}>
                {p.title}
                <span style={{
                  display: 'block',
                  marginTop: 6,
                  height: 2,
                  width: 32,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg,#1A3C8F,#4A90D9)',
                }} />
              </h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="family-grid-wrapper">

        {/* Section header */}
        <div className="gallery-header fade-up">
          <div>
            {/* Royal blue left border accent on section label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{
                display: 'block',
                width: 3,
                height: 18,
                borderRadius: 2,
                background: 'linear-gradient(180deg,#2356C8,#4A90D9)',
              }} />
              <div className="values-eyebrow" style={{ margin: 0 }}>The Archive</div>
            </div>
            <h2 className="gallery-title">Team in Motion</h2>
          </div>

          {/* Filter pills */}
          <div className="gallery-filters" role="group" aria-label="Filter gallery by tag">
            {TAGS.map(tag => (
              <button
                key={tag}
                className={`filter-pill ${activeTag === tag ? 'filter-pill--active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Count line */}
        <div className="gallery-count fade-up">
          <span className="gallery-count__num">{filtered.length}</span>
          <span className="gallery-count__label">
            {filtered.length === 1 ? 'moment captured' : 'moments captured'}
          </span>
        </div>

        {/* Masonry-style grid */}
        <div className="family-grid">
          {filtered.map((img, i) => (
            <div
              key={`${img.caption}-${i}`}
              className={`family-item family-item--${img.size} fade-up`}
              onClick={() => openModal(img, i)}
              style={{ '--i': i }}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.caption}`}
              onKeyDown={(e) => e.key === 'Enter' && openModal(img, i)}
            >
              {/* Tag badge */}
              <div className="item-tag">{img.tag}</div>

              <div className="family-item__img-wrap">
                <img src={img.src} alt={img.caption || 'Team photo'} loading="lazy" />
              </div>

              {/* Hover overlay */}
              <div className="family-overlay">
                <div className="family-overlay__gradient" aria-hidden="true" />
                <div className="family-overlay__content">
                  <div className="overlay-zoom-ring">
                    <FiMaximize2 className="overlay-icon" />
                  </div>
                  {img.caption && <p className="family-overlay__caption">{img.caption}</p>}
                </div>
              </div>

              {/* Royal blue bottom edge accent */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, #1A3C8F 0%, #2356C8 50%, #4A90D9 100%)',
                  zIndex: 4,
                  opacity: 0.7,
                }}
              />

              {/* Item number */}
              <div className="item-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="gallery-empty fade-up">
            <p>No moments found for <strong>{activeTag}</strong></p>
          </div>
        )}
      </section>

      {/* ─── CINEMATIC LIGHTBOX ─── */}
      {modal && (
        <div className="family-modal" role="dialog" aria-modal="true" aria-label="Image lightbox">

          {/* Blurred backdrop */}
          <div className="family-modal__backdrop" onClick={() => setModal(null)} />

          {/* Content panel */}
          <div className="family-modal__content">

            {/* Royal blue top progress bar */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: 3,
                width: `${((modalIndex + 1) / filtered.length) * 100}%`,
                background: 'linear-gradient(90deg,#1A3C8F,#2356C8,#4A90D9)',
                borderRadius: '16px 16px 0 0',
                transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                zIndex: 10,
              }}
            />

            {/* Navigation: prev */}
            {filtered.length > 1 && (
              <button
                className="modal-nav modal-nav--prev"
                onClick={() => navigate(-1)}
                aria-label="Previous image"
              >
                <FiChevronLeft />
              </button>
            )}

            <div className="modal-img-wrap">
              <img
                key={modal.src + modalIndex}
                src={modal.src}
                alt={modal.caption || 'Enlarged team snap'}
                className="modal-img"
              />
            </div>

            {/* Navigation: next */}
            {filtered.length > 1 && (
              <button
                className="modal-nav modal-nav--next"
                onClick={() => navigate(1)}
                aria-label="Next image"
              >
                <FiChevronRight />
              </button>
            )}

            {/* Caption bar with royal blue left stripe */}
            <div className="modal-caption-bar" style={{ borderLeft: '3px solid #2356C8', paddingLeft: 16 }}>
              <div className="modal-caption-bar__left">
                <span className="modal-caption-tag">{modal.tag}</span>
                <span className="modal-caption-text">{modal.caption}</span>
              </div>
              <span className="modal-caption-counter">
                {modalIndex + 1} / {filtered.length}
              </span>
            </div>

            {/* Close */}
            <button
              className="family-modal__close"
              onClick={() => setModal(null)}
              aria-label="Close lightbox"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}