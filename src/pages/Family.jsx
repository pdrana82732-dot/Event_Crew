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

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

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
        {/* Subtle noise texture overlay */}
        <div className="family-hero__noise" aria-hidden="true" />
        {/* Architectural grid lines */}
        <div className="hero-grid-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => <span key={i} className="hero-grid-line" style={{ '--li': i }} />)}
        </div>
        {/* Ambient glow spots */}
        <div className="hero-glow hero-glow--1" aria-hidden="true" />
        <div className="hero-glow hero-glow--2" aria-hidden="true" />

        <div className={`family-hero__container ${entered ? 'hero-entered' : ''}`}>

          <div className="family-label">
            <span className="label-dot" />
            Our Core Sync
          </div>

          <h1 className="family-title">
            Meet <span className="family-title__accent">The Family</span>
          </h1>

          <div className="family-hero__divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>

          <p className="family-subtext">
            Behind every flawless frame, structural asset delivery, and high-octane esports broadcast sits a tightly synchronized, multi-talented unit.
          </p>

          {/* Stat strip */}
          <div className="hero-stats">
            {[
              { num: '50+', label: 'Events Produced' },
              { num: '12', label: 'Core Members' },
              { num: '3+', label: 'Years Together' },
            ].map(({ num, label }, i) => (
              <div key={label} className="hero-stat">
                {i > 0 && <div className="hero-stat__sep" />}
                <div className="hero-stat__num">{num}</div>
                <div className="hero-stat__label">{label}</div>
              </div>
            ))}
          </div>

          <div className="hero-scroll-cue" aria-hidden="true">
            <span className="scroll-line" />
          </div>
        </div>
      </section>

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
              <div className="value-pillar__icon-wrap">
                <div className="value-pillar__icon">{p.icon}</div>
              </div>
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
      <section className="family-grid-wrapper">
        <div className="gallery-header fade-up">
          <div>
            <div className="section-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="eyebrow-dash" />
              The Archive
            </div>
            <h2 className="gallery-title">Team in Motion</h2>
          </div>
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
              className={`family-item family-item--${img.size} fade-up`}
              onClick={() => openModal(img, i)}
              style={{ '--i': i }}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.caption}`}
              onKeyDown={(e) => e.key === 'Enter' && openModal(img, i)}
            >
              <div className="item-tag">{img.tag}</div>
              <div className="family-item__img-wrap">
                <img src={img.src} alt={img.caption || 'Team photo'} loading="lazy" />
              </div>
              <div className="family-overlay">
                <div className="family-overlay__gradient" aria-hidden="true" />
                <div className="family-overlay__content">
                  <div className="overlay-zoom-ring">
                    <FiMaximize2 className="overlay-icon" />
                  </div>
                  {img.caption && <p className="family-overlay__caption">{img.caption}</p>}
                </div>
              </div>
              <div className="item-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
              {/* Corner accents */}
              <div className="item-corner item-corner--tl" />
              <div className="item-corner item-corner--br" />
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
            {/* Progress bar */}
            <div
              className="modal-progress"
              style={{ width: `${((modalIndex + 1) / filtered.length) * 100}%` }}
              aria-hidden="true"
            />

            {filtered.length > 1 && (
              <button className="modal-nav modal-nav--prev" onClick={() => navigate(-1)} aria-label="Previous image">
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

            {filtered.length > 1 && (
              <button className="modal-nav modal-nav--next" onClick={() => navigate(1)} aria-label="Next image">
                <FiChevronRight />
              </button>
            )}

            <div className="modal-caption-bar">
              <div className="modal-caption-bar__left">
                <span className="modal-caption-tag">{modal.tag}</span>
                <span className="modal-caption-text">{modal.caption}</span>
              </div>
              <span className="modal-caption-counter">
                {modalIndex + 1} / {filtered.length}
              </span>
            </div>

            <button className="family-modal__close" onClick={() => setModal(null)} aria-label="Close lightbox">
              <FiX />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}