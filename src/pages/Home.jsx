import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BannerSlider from '../components/BannerSlider.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Faq from '../components/Faq.jsx'
import { asset } from '../utils/asset.js'
import './Home.css'

export default function Home() {
  useEffect(() => {
    const html = document.documentElement
    const header = document.querySelector('.header')
    const setHeaderHeight = () => {
      html.style.setProperty(
        '--header-h',
        `${header ? header.offsetHeight : 118}px`,
      )
    }

    html.classList.add('home-snap')
    setHeaderHeight()
    window.addEventListener('resize', setHeaderHeight)

    return () => {
      html.classList.remove('home-snap')
      html.style.removeProperty('--header-h')
      window.removeEventListener('resize', setHeaderHeight)
    }
  }, [])

  return (
    <main className="home">
      <BannerSlider />

      <section id="about" className="home-about">
        <div className="wrap home-about-inner">
          <div className="home-about-media" data-aos="fade-right">
            <span className="home-about-index" aria-hidden="true">
              01
            </span>
            <span className="home-about-frame" aria-hidden="true" />
            <div className="home-about-shot">
              <img
                src={asset('images/about.jpg')}
                alt="A mentor connecting with professionals in a leadership session"
              />
              <span className="home-about-veil" aria-hidden="true" />
            </div>
            <p className="home-about-note">
              <strong>Human first.</strong> Teams don’t need the perfect
              leader.
            </p>
          </div>
          <div className="home-about-copy" data-aos="fade-left">
            <p className="eyebrow">About Arwain Academy</p>
            <h2>The Human Approach to Leadership</h2>
            <p>
              We spent years trying to become the perfect leaders, then we
              realised something. Teams don’t need the perfect leader. They
              need a human one.
            </p>
            <p>
              At Arwain Academy we don’t just teach leadership. We teach how to
              really connect with your team, so your results look after
              themselves.
            </p>
            <ul className="home-about-facts">
              <li>
                <strong>Level 3</strong>
                First-line leaders
              </li>
              <li>
                <strong>Level 5</strong>
                Middle managers
              </li>
              <li>
                <strong>Level 7</strong>
                Senior leaders
              </li>
              <li>
                <strong>1-2-1</strong>
                Career coaching
              </li>
            </ul>
            <Link to="/about" className="btn">
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      <section className="obstacles">
        <div className="wrap">
          <div className="obstacles-head" data-aos="fade-up">
            <div>
              <p className="eyebrow">Your pathway</p>
              <h2>Overcome challenges. Unlock potential.</h2>
            </div>
            <p>
              Whether you are new to leadership or already managing a team, we
              help you find the right starting point, then stay with you
              through qualifications, coaching and ongoing development.
            </p>
          </div>

          <div className="obstacles-grid">
            <article className="obstacles-card is-start" data-aos="fade-up" data-aos-delay="0">
              <div className="obstacles-top">
                <span className="obstacles-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span className="obstacles-step">01</span>
              </div>
              <h3>Find your starting point</h3>
              <p>
                Discover where you are now and get a clear roadmap to grow from
                here.
              </p>
            </article>

            <article className="obstacles-card" data-aos="fade-up" data-aos-delay="100">
              <div className="obstacles-top">
                <span className="obstacles-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M9 18h6" />
                    <path d="M10 21h4" />
                    <path d="M12 3a6 6 0 0 1 4 10.5V15H8v-1.5A6 6 0 0 1 12 3z" />
                  </svg>
                </span>
                <span className="obstacles-step">02</span>
              </div>
              <h3>Bring your ideas to life</h3>
              <p>
                Turn ideas into action with proven frameworks and practical
                tools.
              </p>
            </article>

            <article className="obstacles-card" data-aos="fade-up" data-aos-delay="200">
              <div className="obstacles-top">
                <span className="obstacles-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M4 19h16" />
                    <path d="M7 19V11h3v8" />
                    <path d="M14 19V6h3v13" />
                  </svg>
                </span>
                <span className="obstacles-step">03</span>
              </div>
              <h3>Grow your career</h3>
              <p>
                Build confidence, visibility and influence to take the next
                step.
              </p>
            </article>

            <article className="obstacles-card" data-aos="fade-up" data-aos-delay="300">
              <div className="obstacles-top">
                <span className="obstacles-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                    <path d="M4 20a8 8 0 0 1 16 0" />
                  </svg>
                </span>
                <span className="obstacles-step">04</span>
              </div>
              <h3>Lead with impact</h3>
              <p>
                Inspire your team, drive results and create meaningful change.
              </p>
            </article>
          </div>

          <Link to="/courses" className="btn" data-aos="fade-up">
            View all courses
          </Link>
        </div>
      </section>

      <Testimonials />

      <Faq />

      <section className="cta-band" data-aos="fade-up">
        <div className="wrap">
          <h2>Ready to take the next step?</h2>
          <p>We’ll be with you every step of the way.</p>
          <Link to="/contact" className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}