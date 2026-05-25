import { useState, useEffect, useRef } from 'react'
import { FiX, FiZoomIn, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import '../styles/Gallery.css'

const allImages = [
  {
    src: 'https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1777835256/event_2_accuow.jpg',
    title: 'Esports Championship',
    category: 'Esports',
    span: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1777835256/event_3_x9xaeq.jpg',
    title: 'Main Stage Concert',
    category: 'Concerts',
    span: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dodouazko/image/upload/q_auto/f_auto/v1777835255/event_1_vlez1u.jpg',
    title: 'Arena Setup Production',
    category: 'Production',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    title: 'Live Sound Mechanics',
    category: 'Production',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    title: 'Neon Lounge Experience',
    category: 'Concerts',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    title: 'Corporate Keynote Stage',
    category: 'Corporate',
    span: 'tall',
  },
]

const CATEGORIES = ['All', 'Concerts', 'Esports', 'Corporate', 'Production']

// ── Fullscreen lightbox ─────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index]

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox" onClick={onClose}>
      {/* Backdrop */}
      <div className="lightbox__backdrop" />

      {/* Content */}
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>

        {/* Image */}
        <div className="lightbox__img-wrap">
          <img key={img.src} src={img.src} alt={img.title} className="lightbox__img" />
          <div className="lightbox__img-shimmer" />
        </div>

        {/* Info bar */}
        <div className="lightbox__info">
          <div className="lightbox__info-left">
            <span className="lightbox__tag">{img.category}</span>
            <span className="lightbox__title">{img.title}</span>
          </div>
          <div className="lightbox__counter">
            {index + 1} <span>/ {images.length}</span>
          </div>
        </div>

        {/* Prev / Next */}
        <button className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Previous">
          <FiArrowLeft />
        </button>
        <button className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Next">
          <FiArrowRight />
        </button>

        {/* Close */}
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        {/* Corner accents */}
        <div className="lightbox__corner lightbox__corner--tl" />
        <div className="lightbox__corner lightbox__corner--br" />
      </div>
    </div>
  )
}

// ── Main gallery page ───────────────────────────────────────────
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [animating, setAnimating] = useState(false)
  const gridRef = useRef(null)

  const filtered = activeCategory === 'All'
    ? allImages
    : allImages.filter((img) => img.category === activeCategory)

  // Fade-up on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('show')
      }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Re-trigger fade-ups after filter change
  useEffect(() => {
    setAnimating(true)
    const t = setTimeout(() => {
      setAnimating(false)
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('show')
        }),
        { threshold: 0.05 }
      )
      document.querySelectorAll('.gallery-item:not(.show)').forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 50)
    return () => clearTimeout(t)
  }, [activeCategory])

  // Body scroll lock during lightbox
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % filtered.length)

  return (
    <main className="gallery-page">

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section className="gallery-hero">
        <div className="gallery-hero__atmo" />
        <div className="gallery-hero__atmo2" />
        <div className="gallery-hero__grid" />
        <div className="gallery-hero__noise" />

        <div className="gallery-hero__inner">

          {/* Vertical side label */}
          <div className="gallery-hero__side-label">
            <span className="gallery-hero__side-line" />
            <span>Event Crew — Portfolio</span>
          </div>

          <div className="gallery-hero__eyebrow fade-up">
            <span className="eyebrow-dash" />
            Our Work
          </div>

          <h1 className="gallery-hero__title fade-up delay-1">
            Events We've<br />
            <span className="gallery-hero__title--red">Brought to Life</span>
          </h1>

          <div className="gallery-hero__divider fade-up delay-2">
            <span className="gdivider-line" />
            <span className="gdivider-diamond" />
            <span className="gdivider-line" />
          </div>

          <p className="gallery-hero__desc fade-up delay-3">
            Moments captured from physical productions and high-octane live environments —
            every frame a testament to the crew's dedication.
          </p>

          {/* Stats row */}
          <div className="gallery-hero__stats fade-up delay-4">
            <div className="gallery-hero__stat">
              <span className="gallery-hero__stat-num">50<sup>+</sup></span>
              <span className="gallery-hero__stat-label">Events</span>
            </div>
            <div className="gallery-hero__stat-sep" />
            <div className="gallery-hero__stat">
              <span className="gallery-hero__stat-num">4</span>
              <span className="gallery-hero__stat-label">Verticals</span>
            </div>
            <div className="gallery-hero__stat-sep" />
            <div className="gallery-hero__stat">
              <span className="gallery-hero__stat-num">100<sup>+</sup></span>
              <span className="gallery-hero__stat-label">Clients</span>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════
          FILTER BAR
      ══════════════════════════ */}
      <div className="gallery-filter fade-up">
        <div className="gallery-filter__inner">
          <span className="gallery-filter__label">
            <span className="eyebrow-dash" />
            Filter by
          </span>
          <div className="gallery-filter__tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter__tab${activeCategory === cat ? ' gallery-filter__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {activeCategory === cat && <span className="gallery-filter__tab-dot" />}
              </button>
            ))}
          </div>
          <span className="gallery-filter__count">
            {filtered.length} {filtered.length === 1 ? 'Shot' : 'Shots'}
          </span>
        </div>
      </div>


      {/* ══════════════════════════
          MASONRY GRID
      ══════════════════════════ */}
      <section className="gallery-grid-section">
        <div
          className={`gallery-masonry${animating ? ' gallery-masonry--exit' : ''}`}
          ref={gridRef}
        >
          {filtered.map((img, i) => (
            <div
              key={img.src}
              className={`gallery-item gallery-item--${img.span} fade-up`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              onClick={() => openLightbox(i)}
            >
              <div className="gallery-item__img-wrap">
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gallery-item__img-overlay" />
              </div>

              {/* Hover overlay */}
              <div className="gallery-item__hover">
                <div className="gallery-item__hover-blur" />
                <div className="gallery-item__hover-content">
                  <div className="gallery-item__zoom">
                    <FiZoomIn />
                  </div>
                  <div className="gallery-item__info">
                    <span className="gallery-item__category">{img.category}</span>
                    <span className="gallery-item__title">{img.title}</span>
                  </div>
                </div>
              </div>

              {/* Always-visible bottom tag */}
              <div className="gallery-item__tag">
                <span className="gallery-item__tag-dot" />
                {img.title}
              </div>

              {/* Corner red accents */}
              <div className="gallery-item__corner gallery-item__corner--tl" />
              <div className="gallery-item__corner gallery-item__corner--br" />
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════
          CLOSING BAND
      ══════════════════════════ */}
      <section className="gallery-cta fade-up">
        <div className="gallery-cta__glow" />
        <div className="gallery-cta__inner">
          <div className="gallery-cta__eyebrow">
            <span className="eyebrow-dash" />
            Want to be next?
            <span className="eyebrow-dash" />
          </div>
          <h2 className="gallery-cta__title">
            Your Event Deserves{' '}
            <span className="gallery-cta__title--red">This Treatment</span>
          </h2>
          <a href="/contact" className="gallery-cta__btn">
            Work With Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>


      {/* ══════════════════════════
          LIGHTBOX
      ══════════════════════════ */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

    </main>
  )
}