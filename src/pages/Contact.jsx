import { useState } from 'react'
import { courses } from '../data/courses.js'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function submit(e) {
    e.preventDefault()
    console.log('Enquiry:', form)
    setSent(true)
  }

  if (sent) {
    return (
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Contact</p>
            <h1>Thank you</h1>
            <p>We’ve received your enquiry and will be in touch shortly.</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="contact">
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>Questions? We’re here to help.</h1>
          <p>Tell us your goals and we’ll recommend the right starting point.</p>
        </div>
      </section>

      <div className="page contact-layout">
        <form className="contact-form card" onSubmit={submit}>
          <label>
            Full name
            <input name="name" value={form.name} onChange={update} required />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              required
            />
          </label>

          <label>
            Phone (optional)
            <input name="phone" value={form.phone} onChange={update} />
          </label>

          <label>
            Course interest
            <select name="course" value={form.course} onChange={update}>
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={update}
              required
            />
          </label>

          <button type="submit" className="btn">
            Send enquiry
          </button>
        </form>

        <aside className="contact-aside card">
          <h2>Prefer a call?</h2>
          <p>
            Book a free consultation and we’ll match you to the right course
            and payment plan.
          </p>
          <p className="aside-note">Typical reply within 1–2 working days.</p>
        </aside>
      </div>
    </main>
  )
}