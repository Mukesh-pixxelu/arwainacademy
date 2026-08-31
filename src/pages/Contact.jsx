import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCourses } from '../courses/CourseContext.jsx'
import PageBanner from '../components/PageBanner.jsx'
import './Contact.css'

export default function Contact() {
  const { courses } = useCourses()
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

  return (
    <main className="contact">
      <PageBanner
        title={sent ? 'Thank you' : 'Questions? We’re here to help.'}
        text={
          sent
            ? 'We’ve received your enquiry and will be in touch shortly.'
            : 'Tell us your goals and we’ll recommend the right starting point.'
        }
        image="/images/coaching.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
      />

      <section className="contact-studio">
        <div className="wrap contact-studio-inner">
          <div className="contact-form-wrap" data-aos="fade-right">
            <span className="contact-index" aria-hidden="true">
              01
            </span>
            <span className="contact-frame" aria-hidden="true" />
            <form className="contact-form" onSubmit={submit}>

            {sent ? (
              <div className="contact-done">
                <p className="eyebrow">Enquiry sent</p>
                <h2>We’ll be in touch</h2>
                <p>
                  A member of the academy will reply within 1 to 2 working days
                  with a course match and, if you asked, a time for a free call.
                </p>
                <Link to="/courses" className="btn">
                  Browse courses
                </Link>
              </div>
            ) : (
              <>
                <div className="contact-form-head">
                  <p className="eyebrow">Write to us</p>
                  <h2>Send an enquiry</h2>
                  <p>Share a little context and we’ll point you to the right pathway.</p>
                </div>

                <div className="contact-grid">
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
                  <label className="is-full">
                    Message
                    <textarea
                      name="message"
                      rows="5"
                      value={form.message}
                      onChange={update}
                      required
                    />
                  </label>
                </div>

                <button type="submit" className="btn">
                  Send enquiry
                </button>
              </>
            )}
          </form>
          </div>

          <aside className="contact-reach" data-aos="fade-left">
            <p className="eyebrow">Prefer a call?</p>
            <h2>Book a free consultation</h2>
            <p>
              We’ll match you to the right course and payment plan. Typical
              reply within 1 to 2 working days.
            </p>

            <ul className="contact-reach-list">
              <li>
                <span>Email</span>
                <a href="mailto:hello@arwainacademy.co.uk">hello@arwainacademy.co.uk</a>
              </li>
              <li>
                <span>Call</span>
                <strong>Free consultation</strong>
              </li>
              <li>
                <span>Hours</span>
                <strong>Mon to Fri, 1 to 2 day reply</strong>
              </li>
            </ul>

            <ul className="contact-facts">
              <li>
                <b>01</b>
                No monthly membership
              </li>
              <li>
                <b>02</b>
                Interest-free plans
              </li>
              <li>
                <b>03</b>
                1-2-1 coaching
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  )
}
