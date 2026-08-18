import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { asset } from '../utils/asset.js'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <PageBanner
        title="We’re passionate about helping you grow and make an impact."
        text="The Human Approach to leadership — connect with your team and lead with confidence."
        image="/images/about.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />

      <div className="page about-body">
        <section className="about-approach">
          <div className="about-media">
            <img
              src={asset('images/about.jpg')}
              alt="A mentor connecting with professionals in a leadership session"
            />
            <aside>
              <strong>Human first</strong>
              Teams don’t need the perfect leader — they need a human one.
            </aside>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Our story</p>
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
          </div>
        </section>
      </div>

      <section className="aa-band">
        <div className="wrap aa-band-inner">
          <div className="aa-badge" aria-hidden="true">
            AA*
          </div>
          <div className="aa-copy">
            <p className="eyebrow">Recognition</p>
            <h2>Become an AA* Leader</h2>
            <p>
              Your management recognised as the gold standard — a badge you can
              take with you for the rest of your career, without a monthly
              membership fee.
            </p>
            <Link to="/courses" className="btn btn-highlight">
              Start your pathway
            </Link>
          </div>
        </div>
      </section>

      <div className="page">
        <section className="about-help">
          <div className="about-help-head">
            <p className="eyebrow">How we work</p>
            <h2>We can help</h2>
          </div>

          <article className="help-row">
            <img
              src={asset('images/qualifications.jpg')}
              alt="Professionals in a leadership classroom"
            />
            <div>
              <span>01</span>
              <h3>Bring your ideas to life</h3>
              <p>
                Launch a business, turn a hobby into something more, or take the
                next step in your career with a recognised course.
              </p>
            </div>
          </article>

          <article className="help-row is-reverse">
            <img
              src={asset('images/coaching.jpg')}
              alt="One-to-one coaching conversation"
            />
            <div>
              <span>02</span>
              <h3>Build your confidence</h3>
              <p>
                Learn to lead with confidence and present yourself and your
                concepts with precision through 1-to-1 coaching.
              </p>
            </div>
          </article>

          <article className="help-row">
            <img
              src={asset('images/leadership.jpg')}
              alt="Leaders collaborating in a training room"
            />
            <div>
              <span>03</span>
              <h3>Expand your potential</h3>
              <p>
                Whether you’re building a business or taking your career higher,
                we help you meet your maximum potential.
              </p>
            </div>
          </article>

          <Link to="/courses" className="btn">
            Explore your options
          </Link>
        </section>
      </div>
    </main>
  )
}
