import { useCallback, useEffect, useState } from 'react'
import { testimonials as quotes } from '../data/testimonials.js'
import { asset } from '../utils/asset.js'
import './Testimonials.css'

export default function Testimonials() {
  const [perView, setPerView] = useState(2)
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 800px)')
    function sync() {
      setPerView(query.matches ? 1 : 2)
      setIndex(0)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const track = [...quotes, ...quotes.slice(0, perView)]

  const goNext = useCallback(() => {
    setAnimate(true)
    setIndex((current) => (current >= quotes.length ? current : current + 1))
  }, [])

  const goPrev = useCallback(() => {
    setAnimate(true)
    setIndex((current) => (current > 0 ? current - 1 : quotes.length - 1))
  }, [])

  useEffect(() => {
    if (index !== quotes.length) return undefined
    const timer = window.setTimeout(() => {
      setAnimate(false)
      setIndex(0)
    }, 520)
    return () => window.clearTimeout(timer)
  }, [index])

  useEffect(() => {
    if (paused || index >= quotes.length) return undefined
    const timer = window.setTimeout(goNext, 4200)
    return () => window.clearTimeout(timer)
  }, [index, paused, goNext])

  const activeDot = index % quotes.length

  return (
    <section
      className="testimonials"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="testimonials-bg"
        style={{ '--testimonials-photo': `url("${asset('images/bg.jpg')}")` }}
        aria-hidden="true"
      />
      <div className="wrap testimonials-inner">
        <div className="testimonials-head">
          <p className="eyebrow">Testimonials</p>
          <h2>What our clients are saying</h2>
        </div>

        <div className="testimonials-viewport">
          <div
            className={animate ? 'testimonials-track' : 'testimonials-track is-instant'}
            style={{
              '--t-count': track.length,
              width: `${(track.length / perView) * 100}%`,
              transform: `translateX(-${index * (100 / track.length)}%)`,
            }}
          >
            {track.map((item, i) => (
              <div className="testimonials-slide" key={item.name + i}>
                <blockquote>
                  <span className="t-quote" aria-hidden="true">
                    “
                  </span>
                  <p>{item.text}</p>
                  <footer>
                    <span className="t-avatar" aria-hidden="true">
                      {item.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .replace('.', '')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <cite>
                      {item.name}
                      <span>{item.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-controls">
          <button type="button" onClick={goPrev} aria-label="Previous testimonials">
            ‹
          </button>
          <div className="testimonials-dots" role="tablist" aria-label="Testimonial slides">
            {quotes.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={activeDot === i}
                aria-label={`Show testimonial ${i + 1}`}
                className={activeDot === i ? 'is-active' : ''}
                onClick={() => {
                  setAnimate(true)
                  setIndex(i)
                }}
              />
            ))}
          </div>
          <button type="button" onClick={goNext} aria-label="Next testimonials">
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
