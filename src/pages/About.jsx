import { useEffect, useRef, useState } from 'react'
import { FiUsers, FiTarget, FiAward, FiZap } from 'react-icons/fi'
import '../styles/About.css'

// ── Reusable count-up hook ──────────────────────────────────────
function useCountUp(target, active) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!active) return
        let t0 = null
        const tick = (ts) => {
            if (!t0) t0 = ts
            const p = Math.min((ts - t0) / 2000, 1)
            setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target))
            if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [active, target])
    return count
}

// ── Animated stat ───────────────────────────────────────────────
function StatCounter({ value, label, active }) {
    const num = parseInt(value)
    const suffix = value.replace(/[0-9]/g, '')
    const count = useCountUp(num, active)
    return (
        <div className="about-stat">
            <span className="about-stat__num">{count}{suffix}</span>
            <span className="about-stat__label">{label}</span>
        </div>
    )
}

export default function About() {
    const [statsActive, setStatsActive] = useState(false)
    const statsRef = useRef(null)

    useEffect(() => {
        const fadeObserver = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add('show')
            }),
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        )
        document.querySelectorAll('.fade-up').forEach((el) => fadeObserver.observe(el))

        const statsObserver = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStatsActive(true) },
            { threshold: 0.5 }
        )
        if (statsRef.current) statsObserver.observe(statsRef.current)

        return () => {
            fadeObserver.disconnect()
            statsObserver.disconnect()
        }
    }, [])

    return (
        <main className="about-page">

            {/* ══════════════════════════
                HERO
            ══════════════════════════ */}
            <section className="about-hero">
                <div className="about-hero__atmo" />
                <div className="about-hero__atmo2" />
                <div className="about-hero__grid" />
                <div className="about-hero__noise" />

                <div className="about-hero__inner">

                    <div className="about-hero__side-label">
                        <span className="about-hero__side-line" />
                        <span>Event Crew — Est. 2022</span>
                    </div>

                    <div className="about-hero__content">
                        <div className="about-hero__eyebrow fade-up">
                            <span className="eyebrow-dash" />
                            Who We Are
                        </div>

                        {/* italic removed: was <em>Built Like</em> */}
                        <h1 className="about-hero__title fade-up delay-1">
                            Driven by Passion,<br />
                            <span className="text-accent">Built Like</span><br />
                            <span className="title-ghost">A Family.</span>
                        </h1>

                        <div className="about-hero__divider fade-up delay-2">
                            <span className="divider-line" />
                            <span className="divider-diamond" />
                            <span className="divider-line" />
                        </div>

                        <p className="about-hero__desc fade-up delay-3">
                            A collective of dedicated professionals united under one banner — pushing the
                            boundaries of media creation, technical operations, and event management. We don't
                            just execute events. We craft legacies.
                        </p>
                    </div>

                    <div className="about-hero__badge fade-up delay-4">
                        <span className="badge-ring" />
                        <span className="badge-inner">
                            <span className="badge-num">100<sup>+</sup></span>
                            <span className="badge-sub">Events Executed</span>
                        </span>
                    </div>

                </div>
            </section>


            {/* ══════════════════════════
                STORY
            ══════════════════════════ */}
            <section className="about-story">
                <div className="about-story__grid">

                    <div className="about-story__visual fade-up">
                        <div className="story-img-wrap">
                            <div className="story-img-frame-back" />
                            <div className="story-img-glow" />
                            <div className="story-img-border">
                                <img
                                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
                                    alt="Event Crew in action"
                                />
                                <div className="story-img-overlay" />
                                <div className="story-img-shimmer" />
                            </div>
                            <div className="story-corner story-corner--tl" />
                            <div className="story-corner story-corner--br" />
                            <div className="story-img-tag">
                                <span className="story-tag-dot" />
                                <span>Since 2022</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-story__text">
                        <div className="section-eyebrow fade-up">
                            <span className="eyebrow-dash" />
                            Our Story
                        </div>

                        {/* italic removed: was <em>Experiences</em> */}
                        <h2 className="section-heading fade-up delay-1">
                            Engineering<br />
                            Exceptional <span className="text-accent">Experiences</span>
                        </h2>

                        <p className="story-body fade-up delay-2">
                            Founded with a bold vision to disrupt traditional event management frameworks,
                            Event Crew operates on a deeply collaborative mindset. We bridge premium technical
                            capabilities with real-world execution strategies that actually deliver.
                        </p>
                        <p className="story-body fade-up delay-3">
                            Whether managing esports arenas, multi-camera live broadcasts, or navigating complex
                            asset logistics across cities — our crew works with unmatched discipline and heart.
                            Every campaign is an opportunity to craft an unforgettable milestone.
                        </p>

                        {/* italic removed from blockquote */}
                        <blockquote className="story-quote fade-up delay-4">
                            <span className="story-quote__mark">"</span>
                            Every event is a blank canvas. We bring the colour, the structure, and the soul.
                        </blockquote>
                    </div>

                </div>
            </section>


            {/* ══════════════════════════
                STATS BAR
            ══════════════════════════ */}
            <div className="about-stats-bar fade-up" ref={statsRef}>
                <StatCounter value="2+" label="Years of Excellence" active={statsActive} />
                <div className="stats-bar__divider" />
                <StatCounter value="50+" label="Events Delivered" active={statsActive} />
                <div className="stats-bar__divider" />
                <StatCounter value="100+" label="Happy Clients" active={statsActive} />
                <div className="stats-bar__divider" />
                <StatCounter value="4" label="Core Verticals" active={statsActive} />
            </div>


            {/* ══════════════════════════
                VALUE PILLARS
            ══════════════════════════ */}
            <section className="about-pillars">
                <div className="about-pillars__header">
                    <div className="section-eyebrow fade-up">
                        <span className="eyebrow-dash" />
                        What We Stand For
                    </div>
                    {/* italic removed: was <em>Our Craft</em> */}
                    <h2 className="section-heading fade-up delay-1">
                        The Pillars of <span className="text-accent">Our Craft</span>
                    </h2>
                </div>

                <div className="pillars-grid">

                    <div className="pillar-card fade-up delay-1">
                        <div className="pillar-card__num">01</div>
                        <div className="pillar-card__icon"><FiTarget /></div>
                        <div className="pillar-card__top-line" />
                        <h3 className="pillar-card__title">Our Mission</h3>
                        <p className="pillar-card__desc">
                            To deliver flawless execution frameworks for corporate, creative, and digital
                            hybrid environments — with unwavering technical precision at every step.
                        </p>
                        <div className="pillar-card__footer">
                            <span className="pillar-card__tag">Strategy</span>
                            <span className="pillar-card__tag">Execution</span>
                        </div>
                    </div>

                    <div className="pillar-card fade-up delay-2">
                        <div className="pillar-card__num">02</div>
                        <div className="pillar-card__icon"><FiUsers /></div>
                        <div className="pillar-card__top-line" />
                        <h3 className="pillar-card__title">Crew Unity</h3>
                        <p className="pillar-card__desc">
                            We operate as one tightly synchronized unit — each member's verified talent
                            channelled into navigating the most high-pressure event timelines.
                        </p>
                        <div className="pillar-card__footer">
                            <span className="pillar-card__tag">Teamwork</span>
                            <span className="pillar-card__tag">Trust</span>
                        </div>
                    </div>

                    <div className="pillar-card fade-up delay-3">
                        <div className="pillar-card__num">03</div>
                        <div className="pillar-card__icon"><FiAward /></div>
                        <div className="pillar-card__top-line" />
                        <h3 className="pillar-card__title">Premium Standards</h3>
                        <p className="pillar-card__desc">
                            From 4K cinematic workflows to clean on-site vendor structures — we build
                            bespoke solutions that consistently maximise ROI and audience impact.
                        </p>
                        <div className="pillar-card__footer">
                            <span className="pillar-card__tag">Quality</span>
                            <span className="pillar-card__tag">Excellence</span>
                        </div>
                    </div>

                    <div className="pillar-card fade-up delay-4">
                        <div className="pillar-card__num">04</div>
                        <div className="pillar-card__icon"><FiZap /></div>
                        <div className="pillar-card__top-line" />
                        <h3 className="pillar-card__title">Rapid Adaptation</h3>
                        <p className="pillar-card__desc">
                            Live environments are unpredictable. Our crew is trained to pivot instantly,
                            ensuring zero disruption to the audience experience no matter what.
                        </p>
                        <div className="pillar-card__footer">
                            <span className="pillar-card__tag">Agility</span>
                            <span className="pillar-card__tag">Resilience</span>
                        </div>
                    </div>

                </div>
            </section>


            {/* ══════════════════════════
                MILESTONES
            ══════════════════════════ */}
            <section className="about-timeline">
                <div className="timeline-header">
                    <div className="section-eyebrow fade-up">
                        <span className="eyebrow-dash" />
                        Our Journey
                    </div>
                    {/* italic removed: was <em>Have Crossed</em> */}
                    <h2 className="section-heading fade-up delay-1">
                        Milestones We <span className="text-accent">Have Crossed</span>
                    </h2>
                </div>

                <div className="milestone-grid">
                    {[
                        {
                            year: '2022',
                            title: 'The Foundation',
                            desc: 'Event Crew launches officially as a technical support team, handling live infrastructure deployments and seamless coordination pipelines across regional events.',
                            tag: 'Origin',
                            index: '01',
                        },
                        {
                            year: '2023',
                            title: 'Growth & Recognition',
                            desc: 'Rapid expansion into media production and logistics verticals. Our crew doubles in size, delivering our 25th major event ahead of schedule.',
                            tag: 'Expansion',
                            index: '02',
                        },
                        {
                            year: '2024',
                            title: 'Expanding Dimensions',
                            desc: 'Introduced high-end digital marketing architectures alongside 4K cinematic multi-camera live streams, setting a new benchmark for hybrid events.',
                            tag: 'Innovation',
                            index: '03',
                        },
                        {
                            year: '2026',
                            title: 'The Future Framework',
                            desc: 'Now hosting complex esports tournaments and corporate activations globally — unified as a powerhouse team redefining what professional event management means.',
                            tag: 'Legacy',
                            index: '04',
                        },
                    ].map((item, i) => (
                        <div className={`milestone-card fade-up delay-${i + 1}`} key={item.year}>
                            <div className="milestone-card__topbar" />
                            <div className="milestone-card__year">{item.year}</div>
                            <div className="milestone-card__ghost">{item.index}</div>
                            <span className="milestone-card__tag">{item.tag}</span>
                            <h4 className="milestone-card__title">{item.title}</h4>
                            <div className="milestone-card__rule" />
                            <p className="milestone-card__desc">{item.desc}</p>
                            <div className="milestone-card__corner milestone-card__corner--tl" />
                            <div className="milestone-card__corner milestone-card__corner--br" />
                        </div>
                    ))}
                </div>
            </section>


            {/* ══════════════════════════
                CTA
            ══════════════════════════ */}
            <section className="about-cta">
                <div className="about-cta__glow" />
                <div className="about-cta__inner fade-up">
                    <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
                        <span className="eyebrow-dash" />
                        Ready to Begin
                        <span className="eyebrow-dash" />
                    </div>
                    {/* italic removed: was <em>Extraordinary</em> */}
                    <h2 className="about-cta__title">
                        Let's Build Something <span className="text-accent">Extraordinary</span>
                    </h2>
                    <p className="about-cta__sub">
                        Your next event deserves more than management — it deserves a crew that treats it like family.
                    </p>
                    <a href="/contact" className="about-cta__btn">
                        Work With Us
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>

        </main>
    )
}