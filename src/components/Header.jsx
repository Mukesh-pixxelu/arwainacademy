import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import './Header.css'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 9.5H4V20h2.5V9.5zM5.25 4A1.75 1.75 0 1 0 5.26 7.5 1.75 1.75 0 0 0 5.25 4zM20 20h-2.5v-5.6c0-1.9-.7-3.2-2.4-3.2-1.3 0-2 0.9-2.3 1.7-.1.3-.1.7-.1 1.1V20H10.2s.1-8.4 0-10.5H12.7v1.5c.4-.7 1.6-1.8 3.8-1.8 2.8 0 4.7 1.8 4.7 5.7V20z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 20v-7.2h2.4l.4-2.8h-2.8V8.3c0-.8.2-1.4 1.4-1.4H17.5V4.4c-.2 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8h2.5V20h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm8 1.7H8A2.3 2.3 0 0 0 5.7 8v8A2.3 2.3 0 0 0 8 18.3h8A2.3 2.3 0 0 0 18.3 16V8A2.3 2.3 0 0 0 16 5.7zM12 8.6A3.4 3.4 0 1 1 8.6 12 3.4 3.4 0 0 1 12 8.6zm0 1.6A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM16.7 7.2a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.6 4h2.3l-5 5.7L21 20h-4.7l-3.7-4.8L8.2 20H5.8l5.4-6.1L3.4 4h4.8l3.3 4.4L17.6 4zm-.8 14.4h1.3L7.3 5.5H6L16.8 18.4z" />
      </svg>
    ),
  },
]

function TopbarItems({ copy }) {
  return (
    <div className="header-top-group">
      <p>Leadership training & 1-to-1 coaching</p>
      <span className="ticker-dot" aria-hidden="true" />
      <Link to="/contact" className="header-consult">
        Free consultation
      </Link>
      <span className="ticker-dot" aria-hidden="true" />
      <div className="header-social">
        {socials.map((item) => (
          <a
            key={item.name + copy}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.name}
          >
            {item.icon}
          </a>
        ))}
      </div>
      <span className="ticker-dot" aria-hidden="true" />
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const {count} = useCart()

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-inner header-top-desktop">
          <p>Leadership training & 1-to-1 coaching</p>
          <div className="header-social">
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
          <Link to="/contact" className="header-consult">
            Free consultation
          </Link>
        </div>
        <div className="header-top-ticker">
          <div className="header-top-track">
            <TopbarItems copy="a" />
            <TopbarItems copy="b" />
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="header-inner">
          <Link to="/" className="logo" onClick={() => setOpen(false)}>
            <span className="logo-mark">AA</span>
            <span className="logo-text">
              Arwain
              <small>Academy</small>
            </span>
          </Link>

          <nav
            id="site-menu"
            className={open ? 'nav nav-open' : 'nav'}
          >
            <div className="nav-drawer-top">
              <Link
                to="/"
                className="nav-drawer-brand"
                onClick={() => setOpen(false)}
              >
                <span className="logo-mark">AA</span>
                <span className="logo-text">
                  Arwain
                  <small>Academy</small>
                </span>
              </Link>
              <button
                type="button"
                className="nav-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <NavLink to="/" end onClick={() => setOpen(false)}>
              <span>01</span>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              <span>02</span>
              About
            </NavLink>
            <NavLink to="/courses" onClick={() => setOpen(false)}>
              <span>03</span>
              Courses
            </NavLink>
            <NavLink to="/testimonials" onClick={() => setOpen(false)}>
              <span>04</span>
              Testimonials
            </NavLink>
            <NavLink to="/faq" onClick={() => setOpen(false)}>
              <span>05</span>
              FAQ
            </NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)}>
<<<<<<< HEAD
              <span>06</span>
              Cart
=======
              Cart ({count})
>>>>>>> e3989e9e8fb1dd40e0a59175ffcece18a3e8cd68
            </NavLink>
            <div className="nav-drawer-actions">
              <Link
                to="/contact"
                className="btn-ghost"
                onClick={() => setOpen(false)}
              >
                Enquire
              </Link>
              <Link
                to="/courses"
                className="btn-solid"
                onClick={() => setOpen(false)}
              >
                Browse courses
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </div>

      <div
        className={open ? 'nav-overlay is-open' : 'nav-overlay'}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </header>
  )
}
