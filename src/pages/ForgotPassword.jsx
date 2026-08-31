import { useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/asset.js'
import { apiRequest } from '../utils/api.js'
import LogoMark from '../components/LogoMark.jsx'
import './Auth.css'

function resetUrl() {
  const base = String(import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${window.location.origin}${base}/user/reset-password`
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await apiRequest('/api/forgot-password', {
        method: 'POST',
        body: { email, reset_url: resetUrl() },
      })
      setDone(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="auth-split">
      <aside className="auth-visual">
        <img src={asset('images/leadership.jpg')} alt="" />
        <div className="auth-visual-copy">
          <p>Student access</p>
          <h1>Reset your password and get back to your pathway.</h1>
        </div>
      </aside>

      <section className="auth-panel">
        <Link to="/" className="auth-brand">
          <LogoMark className="auth-brand-mark" />
          Arwain Academy
        </Link>

        <form className="auth-form" onSubmit={submit}>
          <p className="auth-kicker">Students</p>
          <h2>Forgot password</h2>
          <p className="auth-lead">Enter your email and we will send a reset link if an account exists.</p>

          {done ? (
            <p className="auth-ok">If that email is on our records, we have sent a reset link.</p>
          ) : (
            <>
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
              {error ? <p className="auth-error">{error}</p> : null}
              <button type="submit" className="auth-submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send reset link'}
              </button>
            </>
          )}

          <p className="auth-switch">
            <Link to="/user/login">Back to sign in</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
