import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Privacy.css'

const sections = [
  {
    title: '1. Information We Collect',
    content: `When you interact with Event Crew through our website, contact form, or services, we may collect the following types of information:

- Personal Identification: Your first name, last name, email address, and phone number submitted via our contact form.
- Event Details: Information about your event such as type, date, location, and service requirements.
- Usage Data: Pages visited, time spent on site, browser type, and device information collected automatically via analytics tools.
- Communications: Any messages, emails, or inquiries you send to us directly.

We only collect information that is necessary to deliver our services and respond to your inquiries effectively.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `Event Crew uses the information we collect for the following purposes:

- To respond to your inquiries and provide event planning, media production, logistics, and marketing services.
- To send service-related communications such as booking confirmations, updates, and follow-ups.
- To improve our website experience and understand how visitors interact with our content.
- To comply with legal obligations and resolve any disputes that may arise.
- To send occasional promotional updates about our services — you may opt out at any time.

We do not use your data for automated decision-making or profiling.`,
  },
  {
    title: '3. How We Share Your Information',
    content: `Event Crew does not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:

- Service Providers: Trusted third-party vendors who assist in operating our website or delivering services (e.g., email delivery via EmailJS), bound by confidentiality obligations.
- Legal Requirements: When required by law, court order, or government authority.
- Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred with appropriate notice.

All third parties we work with are required to maintain the confidentiality and security of your data.`,
  },
  {
    title: '4. Cookies & Tracking',
    content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience:

- Essential Cookies: Required for the website to function correctly — these cannot be disabled.
- Analytics Cookies: Help us understand visitor behaviour and improve our content (e.g., page views, session duration).
- Preference Cookies: Remember your settings and preferences for future visits.

You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of the website.`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your personal information only as long as necessary to fulfil the purposes outlined in this policy:

- Contact form submissions are retained for up to 12 months from the date of submission.
- Event-related records may be retained for up to 3 years for operational and legal purposes.
- Analytics data is retained in anonymised form for up to 26 months.

After the applicable retention period, your data is securely deleted or anonymised.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the following rights regarding your personal data:

- Access: Request a copy of the personal data we hold about you.
- Correction: Request correction of inaccurate or incomplete data.
- Deletion: Request that we delete your personal data, subject to legal obligations.
- Objection: Object to the processing of your data for marketing purposes.
- Portability: Request your data in a structured, machine-readable format.

To exercise any of these rights, please contact us at eventcrewofficial@gmail.com. We will respond within 30 days.`,
  },
  {
    title: '7. Data Security',
    content: `Event Crew takes the security of your information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction.

These measures include:
- Secure HTTPS encryption on all website communications.
- Restricted access to personal data on a need-to-know basis.
- Regular review of our data collection and storage practices.

While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to contact us immediately if you suspect any unauthorised use of your data.`,
  },
  {
    title: '8. Third-Party Links',
    content: `Our website may contain links to third-party websites such as our social media profiles (Instagram, LinkedIn, YouTube). These sites have their own privacy policies, and we are not responsible for their practices.

We encourage you to review the privacy policies of any third-party sites you visit through links on our website.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Event Crew's services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has submitted personal data to us, please contact us immediately and we will take steps to delete that information promptly.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this page.

We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: '11. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to us:

Event Crew
Email: eventcrewofficial@gmail.com
LinkedIn: linkedin.com/company/eventcrew-official

We are committed to resolving any privacy-related concerns promptly and transparently.`,
  },
]

// ── Helper: formats index as 01–09, then 10, 11… ──
const formatNum = (i) => (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`)

export default function Privacy() {
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
          <h1 className="lp-hero__title">Privacy <span>Policy</span></h1>
          <div className="lp-hero__divider">
            <span className="lp-divider-line" />
            <span className="lp-divider-diamond" />
            <span className="lp-divider-line" />
          </div>
          <p className="lp-hero__meta">Last Updated: June 2025 &nbsp;·&nbsp; Event Crew</p>
          <p className="lp-hero__desc">
            Your privacy matters to us. This policy explains what data we collect, how we use it,
            and the rights you hold over your information when interacting with Event Crew.
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
              <Link to="/terms" className="lp-back__link">View Terms of Service →</Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}