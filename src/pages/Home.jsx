import { Link } from 'react-router-dom'
import BannerSlider from '../components/BannerSlider.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Faq from '../components/Faq.jsx'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <BannerSlider />

      <section className="home-about">
        <div className="wrap home-about-inner">
          <div className="home-about-media">
            <img
              src="/images/about.jpg"
              alt="A mentor connecting with professionals in a leadership session"
            />
          </div>
          <div className="home-about-copy">
            <p className="eyebrow">About Arwain Academy</p>
            <h2>The Human Approach</h2>
            <p>
              We spent years trying to become the perfect leaders, then we
              realised something. Teams don’t need the perfect leader — they
              need a human one.
            </p>
            <p>
              At Arwain Academy we don’t just teach leadership. We teach how to
              really connect with your team, so your results look after
              themselves.
            </p>
            <Link to="/about" className="btn">
              Read more
            </Link>
          </div>
        </div>
      </section>

      <section className="obstacles">
        <div className="wrap">
          <div className="obstacles-head">
            <div>
              <p className="eyebrow">Your pathway</p>
              <h2>Overcome your obstacles</h2>
            </div>
            <p>
              Whether you are new to leadership or already managing a team, we
              help you find the right starting point — then stay with you
              through qualifications, coaching and ongoing development.
            </p>
          </div>

          <div className="obstacles-grid">
            <article className="obstacles-card">
              <span className="obstacles-step">01</span>
              <span className="obstacles-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <h3>Identify your starting point</h3>
              <p>
                Where are you now, and where do you want to be? A free
                consultation maps first-line, middle-management or coaching
                options so you begin on the right Level 3 or Level 5 pathway.
              </p>
            </article>

            <article className="obstacles-card">
              <span className="obstacles-step">02</span>
              <span className="obstacles-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 19V5h10l6 6v8H4z" />
                  <path d="M14 5v6h6" />
                </svg>
              </span>
              <h3>Bring your ideas to life</h3>
              <p>
                Turn a career goal, a new team or a business idea into a plan.
                Choose a recognised award, certificate or diploma with tutor
                support — and study around the work you already do.
              </p>
            </article>

            <article className="obstacles-card">
              <span className="obstacles-step">03</span>
              <span className="obstacles-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 19h16" />
                  <path d="M7 19V10h3v9" />
                  <path d="M14 19V6h3v13" />
                </svg>
              </span>
              <h3>Enhance your career</h3>
              <p>
                Build confidence, lead with a human touch and stand out. 1-to-1
                career, business and executive coaching gives you a clear plan
                and the accountability to follow it through.
              </p>
            </article>

            <article className="obstacles-card">
              <span className="obstacles-step">04</span>
              <span className="obstacles-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <h3>Continue your development</h3>
              <p>
                Keep progressing with our dedicated team. Work towards AA*
                recognition — a gold-standard badge you can take through your
                career, without a monthly membership fee.
              </p>
            </article>
          </div>

          <Link to="/courses" className="btn">
            Explore courses
          </Link>
        </div>
      </section>

      <Testimonials />

      <Faq />

      <section className="cta-band">
        <div className="wrap">
          <h2>Let’s kickstart your training</h2>
          <p>We’ll be with you every step of the way.</p>
          <Link to="/contact" className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}