import { useMemo, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { asset } from '../utils/asset.js'
import { apiRequest } from '../utils/api.js'
import PasswordField from '../components/PasswordField.jsx'
import LogoMark from '../components/LogoMark.jsx'
import './Auth.css'

export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const missing = useMemo(() => !token || !email, [token, email])

  if (missing) {
    return <Navigate to="/user/forgot-password" replace />
  }

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await apiRequest('/api/reset-password', {
        method: 'POST',
        body: {
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
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
          <h1>Choose a new password for your academy account.</h1>
        </div>
      </aside>

      <section className="auth-panel">
        <Link to="/" className="auth-brand">
          <LogoMark className="auth-brand-mark" />
          Arwain Academy
        </Link>

        <form className="auth-form" onSubmit={submit}>
          <p className="auth-kicker">Students</p>
          <h2>New password</h2>
          <p className="auth-lead">Use at least 8 characters, then sign in with your new password.</p>

          {done ? (
            <p className="auth-ok">
              Password updated.{' '}
              <Link to="/user/login">Sign in</Link>
            </p>
          ) : (
            <>
              <PasswordField
                label="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
              />
              <PasswordField
                label="Confirm password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
              />
              {error ? <p className="auth-error">{error}</p> : null}
              <button type="submit" className="auth-submit" disabled={sending}>
                {sending ? 'Saving…' : 'Update password'}
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  )
}
