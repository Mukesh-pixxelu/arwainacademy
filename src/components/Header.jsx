import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useCart } from '../cart/CartContext'
import { socials } from '../data/socials.jsx'
import LogoMark from './LogoMark.jsx'
import './Header.css'

function SocialLinks({ suffix = '' }) {
  return (
    <div className="header-social">
      {socials.map((item) => (
        <a
          key={item.name + suffix}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}

function TopbarItems({ copy }) {
  return (
    <div className="header-top-group">
      <p>Leadership training & 1-2-1 coaching</p>
      <span className="ticker-dot" aria-hidden="true" />
      <span className="header-follow">Follow us:</span>
      <SocialLinks suffix={copy} />
      <span className="ticker-dot" aria-hidden="true" />
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const { count } = useCart()
  const { user, logout } = useAuth()

  function close() {
    setOpen(false)
    setProfileOpen(false)
  }

  async function signOut() {
    await logout()
    close()
  }

  useEffect(() => {
    if (!profileOpen) return undefined

    function onPointer(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    function onKey(event) {
      if (event.key === 'Escape') setProfileOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [profileOpen])

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-inner header-top-desktop">
          <p>Leadership training & 1-2-1 coaching</p>
          <div className="header-top-end">
            <span className="header-follow">Follow us:</span>
            <SocialLinks />
          </div>
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
          <Link to="/" className="logo" onClick={close}>
            <LogoMark />
            <span className="logo-text">
              Arwain
              <small>Academy</small>
            </span>
          </Link>

          <nav id="site-menu" className={open ? 'nav nav-open' : 'nav'}>
            <div className="nav-drawer-top">
              <Link
                to="/"
                className="nav-drawer-brand"
                onClick={() => setOpen(false)}
              >
                <LogoMark light />
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
            <NavLink to="/cart" className="nav-cart" onClick={close}>
              <span>06</span>
              Basket ({count})
            </NavLink>
            {user ? (
              <NavLink to="/dashboard" className="nav-auth" onClick={close}>
                <span>07</span>
                My Account
              </NavLink>
            ) : (
              <NavLink to="/user/login" className="nav-auth" onClick={close}>
                <span>07</span>
                Login
              </NavLink>
            )}
            <div className="nav-drawer-actions">
              {user ? (
                <>
                  <Link to="/dashboard" className="nav-user" onClick={close}>
                    Hi, {user.name}
                  </Link>
                  <button type="button" className="header-login" onClick={signOut}>
                    Logout
                  </button>
                </>
              ) : null}
              <Link to="/contact" className="btn" onClick={close}>
                Enquire
              </Link>
            </div>
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="header-cart">
              Basket ({count})
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="header-user">
                  Hi, {user.name.split(' ')[0]}
                </Link>
                <div className="header-profile" ref={profileRef}>
                  <button
                    type="button"
                    className={
                      profileOpen
                        ? 'header-login header-profile-btn is-open'
                        : 'header-login header-profile-btn'
                    }
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    onClick={() => setProfileOpen((current) => !current)}
                  >
                    My Profile
                    <svg
                      className="header-profile-caret"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6.2 8 10l4-3.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {profileOpen ? (
                    <div className="header-profile-menu" role="menu">
                      <Link
                        to="/dashboard"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Account
                      </Link>
                      <button type="button" role="menuitem" onClick={signOut}>
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <Link to="/user/login" className="header-login">
                Login
              </Link>
            )}
            <Link to="/contact" className="btn">
              Enquire
            </Link>
          </div>

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
