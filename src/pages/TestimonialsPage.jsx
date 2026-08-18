import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { testimonials } from '../data/testimonials.js'
import './TestimonialsPage.css'

export default function TestimonialsPage() {
  return (
    <main className="reviews-page">
      <PageBanner
        title="What our clients are saying"
        text="Leaders and managers share how coaching and qualifications helped them grow with confidence."
        image="/images/leadership.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Testimonials' },
        ]}
      />

      <section className="page reviews">
        <div className="reviews-head">
          <div>
            <p className="eyebrow">Client stories</p>
            <h2>Real people. Real progress.</h2>
          </div>
          <p>
            From first-line managers to business owners — here is what changed
            after a course or a coaching session with Arwain Academy.
          </p>
        </div>

        <div className="reviews-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="reviews-card">
              <span className="tag">{item.role}</span>
              <p>{item.text}</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Ready to write your own story?</h2>
          <p>We’ll be with you every step of the way.</p>
          <Link to="/contact" className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}
