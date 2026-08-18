import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BannerSlider.css'

const slides = [
  {
    id: 'lead',
    eyebrow: 'Leadership training',
    title: 'Take control of your future',
    lead: 'We’re here to help you thrive.',
    text: 'At Arwain Academy we develop the next generation of leaders — with courses and coaching that make your goals real.',
    cta: 'Explore courses',
    to: '/courses',
    image: '/banner/leadership.jpg',
    alt: 'Leadership workshop with a trainer guiding a professional team',
  },
  {
    id: 'qualify',
    eyebrow: 'Recognised qualifications',
    title: 'Lead with a qualification that lasts',
    lead: 'Level 3 and Level 5 leadership pathways.',
    text: 'From first-line managers to middle managers — build recognised skills with tutor support and a badge you can take through your career.',
    cta: 'Browse courses',
    to: '/courses',
    image: '/banner/qualifications.jpg',
    alt: 'Professionals studying a leadership and management qualification',
  },
  {
    id: 'coach',
    eyebrow: '1-to-1 coaching',
    title: 'Build confidence. Make an impact.',
    lead: 'Career, business and executive coaching.',
    text: 'A human approach to leadership — connect with your team, stand out in your career, and follow through with accountability.',
    cta: 'Book a free call',
    to: '/contact',
    image: '/banner/coaching.jpg',
    alt: 'One-to-one coaching conversation between professionals',
  },
]

export default function BannerSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((next) => {
    setIndex((next + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const timer = setTimeout(() => goTo(index + 1), 6500)
    return () => clearTimeout(timer)
  }, [index, paused, goTo])

  const slide = slides[index]

  return (
    <section
      className="banner"
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
            src={item.image}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="banner-veil" />

      <div className="wrap banner-inner">
        <article className="banner-copy" key={slide.id}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="lead">{slide.lead}</p>
          <p>{slide.text}</p>
          <Link to={slide.to} className="btn btn-highlight">
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
          ‹
        </button>
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
        <button
          type="button"
          className="banner-arrow"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="banner-progress" aria-hidden="true">
        <span key={index} className={paused ? 'is-paused' : ''} />
      </div>
    </section>
  )
}
