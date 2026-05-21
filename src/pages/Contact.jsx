import { useState, useEffect } from 'react'
import { FiSend, FiMail, FiMapPin } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const [status, setStatus] = useState(null)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await emailjs.send(
        'service_tnyevop',          // your service ID
        'template_ldqf5ya',          // your template ID
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        },
        'bZyPvqrUgdbsxBstn'
      )

      setStatus('success')
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })

    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="page contact-page">

      {/* ─── PAGE HERO ─── */}
      <section className="contact-hero">
        <div className="contact-hero__container fade-up">
          <div className="section-label">Get In Touch</div>
          <h1 className="section-title">Let's Build <span>Together</span></h1>
          <div className="contact-hero__line" />
        </div>
      </section>

      {/* ─── DOUBLE COLUMN HUB INTERFACE ─── */}
      <section className="contact-layout-wrapper">
        <div className="contact-layout">

          {/* Left Side: Brand Data Info Cards */}
          <div className="contact-info fade-up">
            <h2 className="contact-info__title">
              Ready to Build<br />
              <span className="red">Memories Together?</span>
            </h2>
            <p className="contact-info__desc">
              Have an upcoming event or project in mind? Reach out to us, and our team will get back to you with an execution strategy.
            </p>

            <div className="contact-detail">
              <div className="contact-detail__item">
                <div className="contact-detail__icon"><FiMail /></div>
                <div className="contact-detail__text">
                  <span className="contact-detail__label">Email Us</span>
                  <a href="mailto:eventcrewofficial@gmail.com" className="contact-detail__value">
                    eventcrewofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail__item">
                <div className="contact-detail__icon"><FiMapPin /></div>
                <div className="contact-detail__text">
                  <span className="contact-detail__label">Headquarters</span>
                  <span className="contact-detail__value">Chandigarh University</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: High-End Contact Form Input Panel */}
          <form className="contact-form fade-up" onSubmit={handleSubmit}>
            <h3 className="contact-form__title">Send Us a Message</h3>

            <div className="form-row">
              <div className="input-group">
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
              </div>
              <div className="input-group">
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
              </div>
            </div>

            <div className="input-group">
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />
            </div>

            <div className="input-group">
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number (optional)" />
            </div>

            <div className="input-group">
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="" disabled hidden>Select a service...</option>
                <option value="Event Support">Event Support</option>
                <option value="Media Production">Media Production</option>
                <option value="Logistics">Logistics</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="input-group">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message details..."
                required
              />
            </div>

            <button
              type="submit"
              className={`contact-submit-btn ${status === 'loading' ? 'loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <div className="submit-spinner" />
              ) : (
                <>
                  <span>Send Message</span>
                  <FiSend className="submit-icon" />
                </>
              )}
            </button>

            {/* Verification Status Feedback Nodes */}
            {status === 'success' && <p className="form-feedback success">✅ Message encrypted & transmitted successfully!</p>}
            {status === 'error' && <p className="form-feedback error">❌ Server error. Please try again directly via email.</p>}
          </form>

        </div>
      </section>
    </main>
  )
}