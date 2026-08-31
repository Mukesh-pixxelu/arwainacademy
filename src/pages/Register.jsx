import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { asset } from '../utils/asset.js'
import PasswordField from '../components/PasswordField.jsx'
import LogoMark from '../components/LogoMark.jsx'
import './Auth.css'

export default function Register() {
  const { user, register } = useAuth()
  const location = useLocation()
  const next = location.state?.from || '/dashboard'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  if (user) {
    return <Navigate to={next} replace />
  }

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await register(name, email, phone, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="auth-split">
      <aside className="auth-visual" data-aos="fade-right">
        <img src={asset('images/coaching.jpg')} alt="" />
        <div className="auth-visual-copy">
          <p>Join the academy</p>
          <h1>Create your student account, then start the course that fits you.</h1>
        </div>
      </aside>

      <section className="auth-panel" data-aos="fade-left">
        <Link to="/" className="auth-brand">
          <LogoMark className="auth-brand-mark" />
          Arwain Academy
        </Link>

        <form className="auth-form" onSubmit={submit}>
          <p className="auth-kicker">Students</p>
          <h2>Create an account</h2>
          <p className="auth-lead">Register first. You can purchase courses once you are signed in.</p>

          <label className="auth-field">
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </label>

          <label className="auth-field">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </label>

          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="auth-submit" disabled={sending}>
            {sending ? 'Creating account…' : 'Create account'}
          </button>

          <p className="auth-switch">
            Already registered?{' '}
            <Link to="/user/login" state={{ from: next }}>
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
