import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Leadership training</p>
          <h1>Take control of your future</h1>
          <p className="lead">We’re here to help you thrive.</p>
          <p>
            At Arwain Academy we develop the next generation of leaders —
            with courses and coaching that make your goals real.
          </p>
          <Link to="/courses" className="btn btn-highlight">
            Explore courses
          </Link>
        </div>
      </section>

      <section className="page">
        <h2>Overcome your obstacles</h2>
        <div className="grid">
          <article className="card">
            <h3>Identify your starting point</h3>
            <p>Where are you now and where do you want to be?</p>
          </article>
          <article className="card">
            <h3>Bring your ideas to life</h3>
            <p>Make those goals real with a personalised course.</p>
          </article>
          <article className="card">
            <h3>Enhance your career</h3>
            <p>Take the next step and realise your full potential.</p>
          </article>
          <article className="card">
            <h3>Continue your development</h3>
            <p>Keep progressing with our dedicated team.</p>
          </article>
        </div>

        <h2>What our clients are saying</h2>
        <div className="quotes">
          <blockquote>
            “It made starting my own business make sense and much easier than I
            expected.”
            <cite>Shirley L. — Small Business Owner</cite>
          </blockquote>
          <blockquote>
            “A flexible course gave me the tools to manage my schedule and come
            back with a qualification.”
            <cite>Molly S. — Executive</cite>
          </blockquote>
          <blockquote>
            “My biggest barrier was confidence. I realised I do have what it
            takes.”
            <cite>Maddie — Accountant</cite>
          </blockquote>
        </div>
      </section>

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