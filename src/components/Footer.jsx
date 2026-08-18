import { Link } from 'react-router-dom'
import { getCourse, formatPrice } from '../data/courses.js'
import './Footer.css'

const featuredSlugs = [
  'level-3-award-in-leadership-management',
  'level-5-certificate-in-leadership-management',
  'career-coaching',
]

export default function Footer() {
  const featured = featuredSlugs.map((slug) => getCourse(slug)).filter(Boolean)

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>AA</span>
            Arwain Academy
          </Link>
          <p>
            Leadership training and 1-to-1 coaching. We develop the next
            generation of leaders with a human approach — recognised Level 3
            and Level 5 pathways, without a monthly membership fee.
          </p>
        </div>

        <div>
          <h2>Courses</h2>
          <ul className="footer-courses">
            {featured.map((course) => (
              <li key={course.slug}>
                <Link to={'/courses/' + course.slug}>{course.title}</Link>
                <small>
                  {course.duration} · {formatPrice(course.price)}
                </small>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Quick links</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/courses">All courses</Link>
            </li>
            <li>
              <Link to="/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className="footer-contact">
            <li>
              <a href="mailto:hello@arwainacademy.co.uk">
                hello@arwainacademy.co.uk
              </a>
            </li>
            <li>
              <Link to="/contact">Book a free consultation</Link>
            </li>
            <li>Typical reply within 1–2 working days</li>
            <li>Leadership training & 1-to-1 coaching</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Arwain Academy. All rights reserved.</p>
        <nav>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/terms-and-conditions">Terms & conditions</Link>
        </nav>
      </div>
    </footer>
  )
}
