import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiX, FiMaximize2, FiHeart, FiZap, FiShield, FiChevronLeft, FiChevronRight, FiUsers } from 'react-icons/fi'
import '../styles/Family.css'

// ── Data ─────────────────────────────────────────────────────────
const familyImages = [
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg", caption: "Annual Crew Conclave", tag: "Events", cls: "gi-a" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg", caption: "Behind The Scenes Chaos", tag: "BTS", cls: "gi-b" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg", caption: "Production War Room", tag: "Studio", cls: "gi-c" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg", caption: "Broadcast Night Live", tag: "Events", cls: "gi-d" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg", caption: "Late Night Setup", tag: "BTS", cls: "gi-e" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg", caption: "Crew In Action", tag: "Studio", cls: "gi-f" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg", caption: "Main Stage Prep", tag: "Events", cls: "gi-g" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg", caption: "Post-Show Debrief", tag: "BTS", cls: "gi-h" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626743/pic_6_fbny2y.jpg", caption: "Sound Check Hours", tag: "Studio", cls: "gi-i" },
  { src: "https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1776626745/pic_5_jdor0w.jpg", caption: "The Full Crew Together", tag: "Events", cls: "gi-j" },
]

const TAGS = ['All', ...Array.from(new Set(familyImages.map(img => img.tag)))]

const marqueeItems = [
  "TEAM CULTURE", "LIVE EVENTS", "BEHIND THE SCENES", "STUDIO SESSIONS",
  "CREW VIBES", "BROADCAST NIGHTS", "PRODUCTION CREW", "PURE ENERGY",
]

const pillars = [
  {
    icon: <FiHeart />,
    title: 'Radical Trust',
    desc: 'We operate transparently. In high-pressure live production rooms, knowing your team has your back handles every unexpected event curveball with calm.',
  },
  {
    icon: <FiZap />,
    title: 'Shared Kinetic Energy',
    desc: 'From late-night venue setups to real-time strategy shifts, our collective speed scales event timelines without missing a single beat.',
  },
  {
    icon: <FiShield />,
    title: 'Vetted Synergy',
    desc: "We aren't an ad-hoc freelancer pool. We are cross-trained creative engineers who move as one coordinated, battle-tested mechanism.",
  },
  {
    icon: <FiUsers />,
    title: 'Built as One',
    desc: "Every show carries the fingerprints of the whole crew. No siloed roles — every member owns the outcome from first call-sheet to final bow.",
  },
]

const stats = [
  { num: '50+', label: 'Events Produced' },
  { num: '12', label: 'Core Members' },
  { num: '3+', label: 'Years Together' },
]

// ── Component ─────────────────────────────────────────────────────
export default function Family() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [modalIndex, setModalIndex] = useState(0)
  const [activeTag, setActiveTag] = useState('All')
  const [entered, setEntered] = useState(false)
  const observerRef = useRef(null)

  const filtered = activeTag === 'All'
    ? familyImages
    : familyImages.filter(img => img.tag === activeTag)

  // Scroll-reveal
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); observerRef.current.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach(el => observerRef.current.observe(el))
    return () => observerRef.current?.disconnect()
  }, [activeTag])

  // Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  // Keyboard nav
  useEffect(() => {
    if (!modal) return
    const handler = e => {
      if (e.key === 'Escape') setModal(null)
      if (e.key === 'ArrowRight') navModal(1)
      if (e.key === 'ArrowLeft') navModal(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modal, modalIndex, filtered])

  const openModal = (img, i) => { setModal(img); setModalIndex(i) }
  const navModal = dir => {
    const next = (modalIndex + dir + filtered.length) % filtered.length
    setModal(filtered[next]); setModalIndex(next)
  }

  return (
    <main className="page family-page">

      {/* ─── HERO ─── */}
      <section className="family-hero">
        <div className="family-hero__noise" aria-hidden="true" />

        {/* Grid lines */}
        <div className="hero-grid-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="hero-grid-line" style={{ '--li': i }} />
          ))}
        </div>

        {/* Ambient glow */}
        <div className="hero-glow hero-glow--1" aria-hidden="true" />
        <div className="hero-glow hero-glow--2" aria-hidden="true" />

        {/* ── Top-left contrast corner accent ── */}
        <div className="hero-corner-accent" aria-hidden="true">
          <div className="hero-corner-accent__block" />
          <div className="hero-corner-accent__lines">
            <span className="corner-line corner-line-1" />
            <span className="corner-line corner-line-2" />
            <span className="corner-line corner-line-3" />
            <span className="corner-line corner-line-4" />
            <span className="corner-line corner-line-5" />
          </div>
          <div className="hero-corner-accent__diamond" />
          <span className="hero-corner-accent__label">Event Crew</span>
        </div>

        <div className={`family-hero__container ${entered ? 'hero-entered' : ''}`}>
          <div className="family-label">
            <span className="label-dot" />
            Our Core Sync
          </div>

          <h1 className="family-title">
            Meet <span className="family-title__accent">The Family</span>
          </h1>

          <div className="hero-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>

          <p className="family-subtext">
            Behind every flawless frame, structural asset delivery, and high-octane
            broadcast sits a tightly synchronized, multi-talented unit — forged in gold.
          </p>

          <div className="hero-stats">
            {stats.map(({ num, label }, i) => (
              <div key={label} className="hero-stat">
                {i > 0 && <div className="hero-stat__sep" />}
                <div className="hero-stat__num">{num}</div>
                <div className="hero-stat__label">{label}</div>
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate('/contact')}>Join The Crew</button>
            <button className="btn-outline" onClick={() => navigate('/gallery')}>Our Work</button>
          </div>

          <div className="hero-scroll-cue" aria-hidden="true">
            <span className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── VALUE PILLARS ─── */}
      <section className="family-values-section">
        <div className="section-eyebrow fade-up">
          <span className="eyebrow-dash" />
          What drives us
          <span className="eyebrow-dash" />
        </div>
        <div className="family-values-grid">
          {pillars.map((p, i) => (
            <div key={i} className="value-pillar fade-up" style={{ '--i': i + 1 }}>
              <div className="value-pillar__index">0{i + 1}</div>
              <div className="value-pillar__icon">{p.icon}</div>
              <h3 className="value-pillar__title">
                {p.title}
                <span className="value-pillar__underline" />
              </h3>
              <p className="value-pillar__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="family-gallery-section">
        <div className="gallery-header fade-up">
          <div>
            <div className="section-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="eyebrow-dash" />
              The Archive
            </div>
            <h2 className="gallery-title">
              Team in <span>Motion</span>
            </h2>
          </div>
          <div className="gallery-filters filter-scroll" role="group" aria-label="Filter by tag">
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

        <div className="gallery-count fade-up">
          <span className="gallery-count__num">{filtered.length}</span>
          <span className="gallery-count__label">
            {filtered.length === 1 ? 'moment captured' : 'moments captured'}
          </span>
        </div>

        <div className="family-grid">
          {filtered.map((img, i) => (
            <div
              key={`${img.caption}-${i}`}
              className={`family-item ${img.cls || 'gi-default'} fade-up`}
              style={{ '--i': i }}
              onClick={() => openModal(img, i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.caption}`}
              onKeyDown={e => e.key === 'Enter' && openModal(img, i)}
            >
              <span className="item-tag">{img.tag}</span>
              <img src={img.src} alt={img.caption || 'Team photo'} className="family-item__img" loading="lazy" />
              <div className="family-overlay">
                <div className="family-overlay__gradient" aria-hidden="true" />
                <div className="family-overlay__content">
                  <div className="overlay-zoom-ring"><FiMaximize2 /></div>
                  {img.caption && <p className="overlay-caption">{img.caption}</p>}
                </div>
              </div>
              <span className="item-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="item-corner item-corner--tl" />
              <span className="item-corner item-corner--br" />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="gallery-empty fade-up">
            <p>No moments found for <strong>{activeTag}</strong></p>
          </div>
        )}
      </section>

      {/* ─── LIGHTBOX ─── */}
      {modal && (
        <div className="family-modal" role="dialog" aria-modal="true" aria-label="Image lightbox">
          <div className="family-modal__backdrop" onClick={() => setModal(null)} />
          <div className="family-modal__content">
            <div
              className="modal-progress"
              style={{ width: `${((modalIndex + 1) / filtered.length) * 100}%` }}
              aria-hidden="true"
            />
            {filtered.length > 1 && (
              <button className="modal-nav modal-nav--prev" onClick={() => navModal(-1)} aria-label="Previous">
                <FiChevronLeft />
              </button>
            )}
            <div className="modal-img-wrap">
              <img
                key={modal.src + modalIndex}
                src={modal.src}
                alt={modal.caption || 'Team snap'}
                className="modal-img"
              />
            </div>
            {filtered.length > 1 && (
              <button className="modal-nav modal-nav--next" onClick={() => navModal(1)} aria-label="Next">
                <FiChevronRight />
              </button>
            )}
            <div className="modal-caption-bar">
              <div className="modal-caption-bar__left">
                <span className="modal-caption-tag">{modal.tag}</span>
                <span className="modal-caption-text">{modal.caption}</span>
              </div>
              <span className="modal-caption-counter">{modalIndex + 1} / {filtered.length}</span>
            </div>
            <button className="family-modal__close" onClick={() => setModal(null)} aria-label="Close">
              <FiX />
            </button>
          </div>
        </div>
      )}

    </main>
  )
}