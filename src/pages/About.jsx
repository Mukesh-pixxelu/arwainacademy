import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About Arwain Academy</p>
          <h1>We’re passionate about helping you grow and make an impact.</h1>
        </div>
      </section>

      <div className="page">
        <section className="about-copy">
          <h2>The Human Approach</h2>
          <p>
            We have spent years trying to become the perfect leaders, then we
            realised something.
          </p>
          <p>
            Our teams don’t need the perfect leader, they need a human one.
            Many leaders work hard, care for their teams and meet deadlines —
            only to lose the human touch along the way.
          </p>
          <p>
            At Arwain Academy, we don’t just teach leadership. We teach how to
            really connect with your team. When you can truly lead, your
            results will look after themselves.
          </p>
        </section>

        <section className="aa-box">
          <p className="eyebrow">Recognition</p>
          <h2>Become an AA* Leader</h2>
          <p>
            Your management recognised as the gold standard — a badge you can
            take with you for the rest of your career, without a monthly
            membership fee.
          </p>
        </section>

        <h2>We can help</h2>
        <div className="about-grid">
          <article className="card">
            <h3>Bring your ideas to life</h3>
            <p>
              Launch a business, turn a hobby into something more, or take the
              next step in your career.
            </p>
          </article>
          <article className="card">
            <h3>Build your confidence</h3>
            <p>
              Learn to lead with confidence and present yourself and your
              concepts with precision.
            </p>
          </article>
          <article className="card">
            <h3>Expand your potential</h3>
            <p>
              Whether you’re building a business or taking your career higher,
              we help you meet your maximum potential.
            </p>
          </article>
        </div>

        <Link to="/courses" className="btn">
          Explore your options
        </Link>
      </div>
    </main>
  )
}