import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Privacy.css'

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: `By accessing or using the Event Crew website (eventcrew.com) and its associated services, you confirm that you have read, understood, and agree to be bound by these Terms of Service.

If you do not agree with any part of these terms, you must not use our website or services. These terms apply to all visitors, clients, and anyone who accesses or uses our services.

Event Crew reserves the right to update these terms at any time. Continued use of our services after changes are made constitutes acceptance of the revised terms.`,
    },
    {
        title: '2. Description of Services',
        content: `Event Crew provides professional event management and production services including:

- Event Support: End-to-end event planning, coordination, and on-ground execution.
- Media Production: Photography, videography, live streaming, and post-production services.
- Logistics: Venue scouting, vendor coordination, transportation, and equipment management.
- Marketing: Social media strategy, content creation, branding, and promotional campaigns.

All services are subject to availability, scope agreements, and pricing confirmed at the time of booking.`,
    },
    {
        title: '3. Booking & Payments',
        content: `Engaging Event Crew for any service is subject to the following conditions:

- A formal booking is confirmed only upon written agreement and receipt of the agreed deposit.
- Payment terms, milestones, and final amounts will be outlined in a separate service agreement or invoice.
- All quoted prices are subject to applicable taxes and additional charges agreed upon during consultation.
- Late payments may attract a penalty as specified in the individual service agreement.

Event Crew reserves the right to pause or terminate services in the event of non-payment.`,
    },
    {
        title: '4. Cancellation & Refund Policy',
        content: `We understand that circumstances change. Our cancellation policy is as follows:

- Cancellations made 30 or more days before the event date: Full refund of deposit minus administrative fees.
- Cancellations made 15–29 days before the event: 50% of the deposit is refundable.
- Cancellations made fewer than 14 days before the event: No refund on the deposit.
- If Event Crew cancels a confirmed booking due to unforeseen circumstances, a full refund of all amounts paid will be issued.

Refunds are processed within 10–14 business days of the cancellation confirmation.`,
    },
    {
        title: '5. Client Responsibilities',
        content: `As a client engaging Event Crew, you agree to:

- Provide accurate and complete information about your event requirements in a timely manner.
- Obtain all necessary permits, licenses, and approvals required for the event.
- Ensure a safe working environment for Event Crew staff and contractors at the venue.
- Notify Event Crew promptly of any changes to the event scope, date, or location.
- Respect the intellectual property, equipment, and personnel of Event Crew.

Failure to meet these responsibilities may result in additional charges or service termination.`,
    },
    {
        title: '6. Intellectual Property',
        content: `All content created by Event Crew — including photographs, videos, graphics, designs, written content, and social media assets — remains the intellectual property of Event Crew unless explicitly transferred in writing.

- Clients are granted a non-exclusive licence to use deliverables for their own personal or business purposes.
- Event Crew reserves the right to use project work in its portfolio, social media, and marketing materials unless the client requests confidentiality in writing prior to project commencement.
- Unauthorised reproduction, resale, or distribution of Event Crew's content is strictly prohibited.`,
    },
    {
        title: '7. Limitation of Liability',
        content: `Event Crew will not be liable for:

- Losses arising from circumstances beyond our reasonable control, including natural disasters, government restrictions, venue failures, or supplier defaults (force majeure events).
- Indirect, incidental, or consequential losses resulting from the use of our services.
- Technical failures of third-party platforms, equipment, or communication services.

Our total liability to any client for any claim shall not exceed the total amount paid by the client for the specific service giving rise to the claim.`,
    },
    {
        title: '8. Confidentiality',
        content: `Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. This includes but is not limited to:

- Event strategies, budgets, and business plans shared by the client.
- Internal processes, pricing structures, and vendor relationships of Event Crew.

This confidentiality obligation survives the termination of the service agreement for a period of 2 years.`,
    },
    {
        title: '9. Governing Law',
        content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or the use of our services shall be subject to the exclusive jurisdiction of the courts located in Chandigarh, India.

If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.`,
    },
    {
        title: '10. Website Use',
        content: `When using the Event Crew website, you agree not to:

- Use the site for any unlawful purpose or in a way that violates applicable laws.
- Attempt to gain unauthorised access to any part of the website or its underlying systems.
- Transmit any harmful, offensive, or disruptive content through our contact form or other channels.
- Reproduce, distribute, or modify any part of the website without written permission from Event Crew.

We reserve the right to restrict or terminate access to our website for any user who violates these conditions.`,
    },
    {
        title: '11. Contact & Disputes',
        content: `If you have any questions about these Terms of Service or wish to raise a dispute, please contact us first so we can work toward a resolution:

Event Crew
Email: eventcrewofficial@gmail.com
LinkedIn: linkedin.com/company/eventcrew-official

We aim to respond to all formal queries within 5 business days and resolve disputes amicably before any legal proceedings are considered.`,
    },
]

// ── Helper: formats index as 01–09, then 10, 11… ──
const formatNum = (i) => (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`)

export default function Terms() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('lp-show') }),
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        )
        document.querySelectorAll('.lp-fade').forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <main className="lp-page">

            {/* ── Hero ── */}
            <section className="lp-hero">
                <div className="lp-hero__glow lp-hero__glow--1" />
                <div className="lp-hero__glow lp-hero__glow--2" />
                <div className="lp-hero__grid">
                    {[...Array(6)].map((_, i) => <span key={i} className="lp-grid-line" style={{ '--li': i }} />)}
                </div>
                <div className="lp-hero__inner">
                    <span className="lp-eyebrow">Legal</span>
                    <h1 className="lp-hero__title">Terms of <span>Service</span></h1>
                    <div className="lp-hero__divider">
                        <span className="lp-divider-line" />
                        <span className="lp-divider-diamond" />
                        <span className="lp-divider-line" />
                    </div>
                    <p className="lp-hero__meta">Last Updated: June 2025 &nbsp;·&nbsp; Event Crew</p>
                    <p className="lp-hero__desc">
                        These terms govern your use of Event Crew's website and services. Please read them carefully
                        before engaging with us or booking any of our event management services.
                    </p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="lp-content">
                <div className="lp-content__inner">

                    {/* Quick nav */}
                    <aside className="lp-toc lp-fade">
                        <h3 className="lp-toc__heading">Contents</h3>
                        <ul>
                            {sections.map((s, i) => (
                                <li key={i}>
                                    <a href={`#section-${i}`} className="lp-toc__link">
                                        <span className="lp-toc__num">{formatNum(i)}</span>
                                        {s.title.replace(/^\d+\.\s/, '')}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Sections */}
                    <div className="lp-sections">
                        {sections.map((s, i) => (
                            <div key={i} id={`section-${i}`} className="lp-section lp-fade" style={{ '--i': i }}>
                                <div className="lp-section__header">
                                    <span className="lp-section__num">{formatNum(i)}</span>
                                    <h2 className="lp-section__title">{s.title}</h2>
                                </div>
                                <div className="lp-section__body">
                                    {s.content.split('\n').map((line, j) => (
                                        line.trim() === '' ? null :
                                            line.startsWith('•') ? (
                                                <p key={j} className="lp-bullet">{line}</p>
                                            ) : (
                                                <p key={j} className="lp-para">{line}</p>
                                            )
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Back link */}
                        <div className="lp-back lp-fade">
                            <Link to="/" className="lp-back__btn">← Back to Home</Link>
                            <Link to="/privacy" className="lp-back__link">View Privacy Policy →</Link>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    )
}