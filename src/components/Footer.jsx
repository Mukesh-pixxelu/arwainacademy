import { Link } from 'react-router-dom'
import { formatPrice } from '../data/courses.js'
import { CONTACT_EMAIL } from '../data/contact.js'
import { useCourses } from '../courses/CourseContext.jsx'
import { socials } from '../data/socials.jsx'
import LogoMark from './LogoMark.jsx'
import './Footer.css'

const featuredSlugs = [
  'cmi-level-3-award-in-principles-of-management-and-leadership',
  'cmi-level-5-diploma-in-management-and-leadership',
  'cmi-level-7-award-in-strategic-management-and-leadership-practice',
]

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer() {
  const { courses, getCourse } = useCourses()
  const featured = featuredSlugs.map((slug) => getCourse(slug)).filter(Boolean)
  const list = featured.length ? featured : courses.slice(0, 3)

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <LogoMark className="footer-logo-mark" light />
            Arwain Academy
          </Link>
          <p>
            Leadership training and 1-2-1 coaching with recognised Level 3,
            Level 5 and Level 7 pathways, with no monthly membership fee.
          </p>
          <div className="footer-social">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h2>Quick links</h2>
          <ul className="footer-links">
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

        <div className="footer-col">
          <h2>Courses</h2>
          <ul className="footer-courses">
            {list.map((course) => (
              <li key={course.slug}>
                <Link to={'/courses/' + course.slug} className="footer-course">
                  <img src={course.image} alt="" />
                  <span>
                    <strong>{course.title}</strong>
                    <small>{formatPrice(course.price)}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
          <ul className="footer-contact">
            <li>
              <span className="footer-icon">
                <MailIcon />
              </span>
              <a href={'mailto:' + CONTACT_EMAIL}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <span className="footer-icon">
                <CallIcon />
              </span>
              <Link to="/contact">Book a free call</Link>
            </li>
            <li>
              <span className="footer-icon">
                <ClockIcon />
              </span>
              <span>Reply in 1 to 2 working days</span>
            </li>
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
