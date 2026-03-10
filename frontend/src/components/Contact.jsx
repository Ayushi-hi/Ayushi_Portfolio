import { useState } from 'react'

export default function Contact({ showToast, API }) {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (f, v) => {
    setForm(p => ({ ...p, [f]: v }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Please enter your name (min 2 chars).'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.subject.trim() || form.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters.'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async e => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res  = await fetch(API + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), subject: form.subject.trim(), message: form.message.trim() })
      })
      const data = await res.json()
      if (data.success) {
        showToast('Message sent! I will reply within 24 hours.', 'success')
        setForm({ name:'', email:'', subject:'', message:'' })
        setErrors({})
      } else {
        showToast(data.message || 'Something went wrong.', 'error')
      }
    } catch {
      showToast('Cannot reach server. Email: ayushisingh1457@gmail.com', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-eyebrow reveal">
        <div className="s-label"><div className="s-label-line"></div>Get In Touch<div className="s-label-line"></div></div>
      </div>
      <div className="contact-big reveal">
        Let's build<br />something <em>beautiful</em><br />together.
      </div>

      <div className="contact-form-wrap reveal">
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="cf-row">
            <div className="cf-field">
              <label className="cf-label">Your Name</label>
              <input className={`cf-input ${errors.name ? 'invalid' : ''}`} type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
              <span className="cf-error">{errors.name}</span>
            </div>
            <div className="cf-field">
              <label className="cf-label">Email Address</label>
              <input className={`cf-input ${errors.email ? 'invalid' : ''}`} type="email" placeholder="rahul@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
              <span className="cf-error">{errors.email}</span>
            </div>
          </div>
          <div className="cf-field">
            <label className="cf-label">Subject</label>
            <input className={`cf-input ${errors.subject ? 'invalid' : ''}`} type="text" placeholder="Collaboration / Internship / Just saying hi!" value={form.subject} onChange={e => set('subject', e.target.value)} />
            <span className="cf-error">{errors.subject}</span>
          </div>
          <div className="cf-field">
            <label className="cf-label">Message</label>
            <textarea className={`cf-input cf-textarea ${errors.message ? 'invalid' : ''}`} placeholder="Tell me what you have in mind..." rows={5} value={form.message} onChange={e => set('message', e.target.value)} />
            <span className="cf-error">{errors.message}</span>
          </div>
          <button type="submit" className="btn btn-gold cf-submit" disabled={loading}>
            <span>{loading ? 'Sending...' : 'Send Message'}</span>
            {!loading && <span>→</span>}
            {loading && <span className="cf-loader"></span>}
          </button>
        </form>
      </div>

      <div className="social-row reveal">
        <a href="https://linkedin.com/in/ayushi-singh-481035333" target="_blank" className="social-link">
          <div className="sl-label">LinkedIn</div><div className="sl-val">ayushi-singh-481035333</div>
        </a>
        <a href="https://github.com/Ayushi-hi" target="_blank" className="social-link">
          <div className="sl-label">GitHub</div><div className="sl-val">Ayushi-hi</div>
        </a>
        <a href="tel:+918081134794" className="social-link">
          <div className="sl-label">Phone</div><div className="sl-val">+91 8081134794</div>
        </a>
      </div>
    </section>
  )
}