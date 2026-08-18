import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const {count} = useCart()

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-inner">
          <p>Leadership training & 1-to-1 coaching</p>
          <Link to="/contact">Free consultation</Link>
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

          <nav className={open ? 'nav nav-open' : 'nav'}>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink to="/courses" onClick={() => setOpen(false)}>
              Courses
            </NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)}>
              Cart ({count})
            </NavLink>
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
          </nav>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  )
}