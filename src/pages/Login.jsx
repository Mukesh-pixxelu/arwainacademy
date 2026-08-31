import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { asset } from '../utils/asset.js'
import PasswordField from '../components/PasswordField.jsx'
import LogoMark from '../components/LogoMark.jsx'
import './Auth.css'

const REMEMBER_KEY = 'arwain-remember-email'

export default function Login() {
  const { user, login } = useAuth()
  const location = useLocation()
  const next = location.state?.from || '/dashboard'
  const [email, setEmail] = useState(() => localStorage.getItem(REMEMBER_KEY) || '')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem(REMEMBER_KEY)))
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
      if (remember) localStorage.setItem(REMEMBER_KEY, email)
      else localStorage.removeItem(REMEMBER_KEY)
      await login(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="auth-split">
      <aside className="auth-visual" data-aos="fade-right">
        <img src={asset('images/leadership.jpg')} alt="" />
        <div className="auth-visual-copy">
          <p>Student access</p>
          <h1>Leadership training and coaching, built around your goals.</h1>
        </div>
      </aside>

      <section className="auth-panel" data-aos="fade-left">
        <Link to="/" className="auth-brand">
          <LogoMark className="auth-brand-mark" />
          Arwain Academy
        </Link>

        <form className="auth-form" onSubmit={submit}>
          <p className="auth-kicker">Students</p>
          <h2>Welcome back</h2>
          <p className="auth-lead">
            Sign in with your student email to purchase courses and continue
            your pathway. Admin accounts use the academy portal, not this page.
          </p>

          <label className="auth-field">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </label>

          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <div className="auth-toolbar">
            <label className="auth-check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/user/forgot-password" className="auth-forgot">
              Forgot password?
            </Link>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="auth-submit" disabled={sending}>
            {sending ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="auth-switch">
            New here?{' '}
            <Link to="/user/register" state={{ from: next }}>
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
