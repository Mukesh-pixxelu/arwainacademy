import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/asset.js'
import './BannerSlider.css'

const slides = [
  {
    id: 'lead',
    eyebrow: 'Leadership training',
    title: 'Lead with clarity. Inspire with',
    accent: 'impact.',
    text: 'Recognised leadership qualifications and 1-2-1 coaching, so you can connect with your team and make your goals real.',
    cta: 'Explore courses',
    to: '/courses',
    image: '/images/leadership.jpg',
    alt: 'Leadership workshop with a trainer guiding a professional team',
  },
  {
    id: 'qualify',
    eyebrow: 'Recognised qualifications',
    title: 'Lead with a qualification that',
    accent: 'lasts.',
    text: 'From first-line managers to senior leaders, build recognised Level 3, Level 5 and Level 7 skills with tutor support.',
    cta: 'Browse courses',
    to: '/courses',
    image: '/images/qualifications.jpg',
    alt: 'Professionals studying a leadership and management qualification',
  },
  {
    id: 'coach',
    eyebrow: '1-2-1 coaching',
    title: 'Build confidence. Make an',
    accent: 'impact.',
    text: 'Career, business and executive coaching with a human approach, with a clear plan and the accountability to follow it through.',
    cta: 'Book a free call',
    to: '/contact',
    image: '/images/coaching.jpg',
    alt: 'One-to-one coaching conversation between professionals',
  },
]

export default function BannerSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  const goTo = useCallback((next) => {
    setIndex((next + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setIntroDone(true)
      return undefined
    }
    const timer = window.setTimeout(() => setIntroDone(true), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!introDone) return undefined
    if (paused) return undefined
    const timer = setTimeout(() => goTo(index + 1), 6500)
    return () => clearTimeout(timer)
  }, [index, paused, introDone, goTo])

  const slide = slides[index]

  return (
    <section
      className={introDone ? 'banner' : 'banner is-intro'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Arwain Academy highlights"
    >
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={i === index ? 'banner-slide is-active' : 'banner-slide'}
          aria-hidden={i !== index}
        >
          <img
            src={asset(item.image)}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="banner-veil" />

      <div className="wrap banner-inner">
        <article className="banner-copy" key={slide.id}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>
            {slide.title}{' '}
            {slide.accent ? <em>{slide.accent}</em> : null}
          </h1>
          <p>{slide.text}</p>
          <Link to={slide.to} className="btn">
            {slide.cta}
          </Link>
        </article>
      </div>

      <div className="banner-controls">
        <button
          type="button"
          className="banner-arrow"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <div className="banner-pager">
          <p className="banner-count">
            {String(index + 1).padStart(2, '0')}
            <span>/</span>
            {String(slides.length).padStart(2, '0')}
          </p>
          <div className="banner-dots" role="tablist" aria-label="Choose slide">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}: ${item.eyebrow}`}
                className={i === index ? 'is-active' : ''}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="banner-arrow"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <a className="banner-next" href="#about">
        Scroll
        <span aria-hidden="true" />
      </a>

      <div className="banner-progress" aria-hidden="true">
        <span
          key={index}
          className={paused || !introDone ? 'is-paused' : ''}
        />
      </div>
    </section>
  )
}
