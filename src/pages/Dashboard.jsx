import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { courseImage, formatPrice } from '../data/courses.js'
import { useCourses } from '../courses/CourseContext.jsx'
import { apiRequest } from '../utils/api.js'
import { asset } from '../utils/asset.js'
import PasswordField from '../components/PasswordField.jsx'
import LogoMark from '../components/LogoMark.jsx'
import './Dashboard.css'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function hello() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function catalogItem(item, findCourse) {
  const info = findCourse(item)
  if (!info) return item
  return {
    ...item,
    image: item.image || info.image,
    category: item.category || info.category,
  }
}

function CourseThumb({ item }) {
  const fallback = asset('images/qualifications.jpg')
  const [src, setSrc] = useState(() => courseImage(item) || fallback)

  useEffect(() => {
    setSrc(courseImage(item) || fallback)
  }, [item, fallback])

  return (
    <img
      src={src}
      alt=""
      onError={() => {
        const local = courseImage({ title: item.title, slug: item.slug, category: item.category })
        if (local && local !== src) setSrc(local)
        else if (src !== fallback) setSrc(fallback)
      }}
    />
  )
}

export default function Dashboard() {
  const { user, token, ready, updateProfile, logout } = useAuth()
  const { findCourse } = useCourses()
  const [view, setView] = useState('overview')
  const [active, setActive] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPhone(user?.phone || '')
  }, [user])

  useEffect(() => {
    if (!token) return
    apiRequest('/api/purchases', { token })
      .then((data) => setPayments(data.payments || []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false))
  }, [token])

  const courses = useMemo(
    () =>
      payments.flatMap((payment) =>
        (payment.items || []).map((item) => ({
          ...item,
          status: payment.status,
          method: payment.method_label,
          plan: payment.plan_label,
          paidAt: payment.paid_at,
          paymentId: payment.id,
          key: payment.id + '-' + (item.slug || item.title),
        })),
      ),
    [payments],
  )

  const bought = courses.filter((item) => item.status === 'successful')
  const pending = courses.filter((item) => item.status !== 'successful')
  const spent = payments
    .filter((payment) => payment.status === 'successful')
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  const monthCount = bought.filter((item) => {
    const date = item.paidAt ? new Date(item.paidAt) : null
    if (!date) return false
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  const filtered = courses.filter((item) => {
    const course = findCourse(item)
    const hay = [item.title, item.slug, item.category, course?.category, item.status].join(' ').toLowerCase()
    return hay.includes(query.trim().toLowerCase())
  })

  if (ready && !user) {
    return <Navigate to="/user/login" replace state={{ from: '/dashboard' }} />
  }

  async function saveProfile(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      await updateProfile({ name, email, phone, password: password || undefined })
      setPassword('')
      setMessage('Profile updated.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function signOut() {
    await logout()
  }

  function openCourse(item) {
    setActive(item)
    setView('course')
  }

  const course = active ? findCourse(active) : null
  const unlocked = active?.status === 'successful'

  return (
    <div className="sd-shell">
      <aside className="sd-sidebar">
        <Link to="/" className="sd-brand">
          <LogoMark className="sd-mark" />
          <strong>Arwain</strong>
        </Link>

        <nav>
          <button
            type="button"
            className={view === 'overview' ? 'is-on' : ''}
            onClick={() => setView('overview')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Z" />
            </svg>
            Overview
          </button>
          <button
            type="button"
            className={view === 'courses' || view === 'course' ? 'is-on' : ''}
            onClick={() => setView('courses')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5V6.5Z" />
              <path d="M4 6.5h16" />
            </svg>
            My courses
          </button>
          <button
            type="button"
            className={view === 'profile' ? 'is-on' : ''}
            onClick={() => setView('profile')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 14a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
            Profile
          </button>
          <Link to="/courses">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 4v16M4 12h16" />
            </svg>
            Browse academy
          </Link>
        </nav>

        <div className="sd-foot">
          <button type="button" className="sd-logout" onClick={signOut}>
            Log out
          </button>
          <div className="sd-promo">
            <strong>Your pathway</strong>
            <p>Purchased courses and profile stay in one place.</p>
          </div>
        </div>
      </aside>

      <div className="sd-main">
        <header className="sd-top">
          <label className="sd-search">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                if (view === 'overview' || view === 'course') setView('courses')
              }}
              placeholder="Search your courses..."
            />
          </label>
          <button type="button" className="sd-chip" onClick={() => setView('profile')}>
            <span>{(user?.name || 'S').charAt(0).toUpperCase()}</span>
            {user?.name}
          </button>
        </header>

        {view === 'overview' || view === 'courses' ? (
          <>
            {view === 'overview' ? (
              <>
                <section className="sd-hello">
                  <h1>
                    {hello()}, {user?.name}
                  </h1>
                  <time>
                    {new Date().toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </time>
                </section>

                <ul className="sd-meters">
                  <li>
                    <span className="sd-ico is-purple" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M4 19V7l8-3 8 3v12l-8 3-8-3Z" />
                        <path d="M12 4v15" />
                      </svg>
                    </span>
                    <div>
                      <strong>{bought.length}</strong>
                      <span>Purchased</span>
                    </div>
                  </li>
                  <li>
                    <span className="sd-ico is-teal" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v4l3 2" />
                      </svg>
                    </span>
                    <div>
                      <strong>{pending.length}</strong>
                      <span>Pending</span>
                    </div>
                  </li>
                  <li>
                    <span className="sd-ico is-coral" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 3v18M16 8H9.5a2.5 2.5 0 0 0 0 5H14a2.5 2.5 0 0 1 0 5H8" />
                      </svg>
                    </span>
                    <div>
                      <strong>{formatPrice(spent)}</strong>
                      <span>Spent</span>
                    </div>
                  </li>
                  <li>
                    <span className="sd-ico is-pink" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <rect x="4" y="5" width="16" height="15" rx="2" />
                        <path d="M8 3v4M16 3v4M4 10h16" />
                      </svg>
                    </span>
                    <div>
                      <strong>{monthCount}</strong>
                      <span>This month</span>
                    </div>
                  </li>
                </ul>

                {loading ? (
                  <p className="sd-muted">Loading your courses…</p>
                ) : filtered[0] ? (
                  <button
                    type="button"
                    className="sd-feature"
                    onClick={() => openCourse(filtered[0])}
                  >
                    <CourseThumb item={catalogItem(filtered[0], findCourse)} />
                    <div>
                      <small>{filtered[0].category || findCourse(filtered[0])?.category || 'Course'}</small>
                      <h2>{filtered[0].title}</h2>
                      <p>
                        {filtered[0].plan} · {formatDate(filtered[0].paidAt)}
                      </p>
                      <span className={filtered[0].status === 'successful' ? 'is-ok' : 'is-wait'}>
                        {filtered[0].status === 'successful' ? 'Open course' : 'Complete payment'}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="sd-empty sd-feature-empty">
                    <p>No purchased courses yet.</p>
                    <Link to="/courses" className="sd-btn">
                      Browse courses
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="sd-pagehead">
                <h1>My courses</h1>
                <p>
                  {bought.length} purchased · {pending.length} pending
                </p>
              </div>
            )}

            {(view === 'courses' || filtered.length > 1) && (
              <section className="sd-board">
                <div className="sd-card-head">
                  <h2>{view === 'overview' ? 'More enrolments' : 'All enrolments'}</h2>
                  <span>{view === 'overview' ? Math.max(filtered.length - 1, 0) : filtered.length}</span>
                </div>
                {loading ? (
                  <p className="sd-muted">Loading your courses…</p>
                ) : (view === 'overview' ? filtered.slice(1) : filtered).length === 0 ? (
                  <div className="sd-empty">
                    <p>No purchased courses yet.</p>
                    <Link to="/courses" className="sd-btn">
                      Browse courses
                    </Link>
                  </div>
                ) : (
                  <ul className="sd-rows">
                    {(view === 'overview' ? filtered.slice(1) : filtered).map((item) => {
                      const info = findCourse(item)
                      return (
                        <li key={item.key}>
                          <button type="button" onClick={() => openCourse(item)}>
                            <CourseThumb item={catalogItem(item, findCourse)} />
                            <div>
                              <small>{item.category || info?.category || 'Course'}</small>
                              <h3>{item.title}</h3>
                            </div>
                            <p>
                              {item.plan} · {formatDate(item.paidAt)}
                            </p>
                            <em className={item.status === 'successful' ? 'is-ok' : 'is-wait'}>
                              {item.status === 'successful' ? 'Purchased' : 'Pending'}
                            </em>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>
            )}
          </>
        ) : null}

        {view === 'course' && active ? (
          <article className="sd-learn">
            <button type="button" className="sd-back" onClick={() => setView('courses')}>
              ← Back to courses
            </button>
            <div className="sd-learn-hero">
              <CourseThumb item={catalogItem(active, findCourse)} />
              <div>
                <small>{course?.category || 'Course'}</small>
                <h1>{active.title}</h1>
                <p>
                  {active.plan} · {active.method} · {formatDate(active.paidAt)} ·{' '}
                  {formatPrice(active.price)}
                </p>
                <em className={unlocked ? 'is-ok' : 'is-wait'}>
                  {unlocked ? 'Enrolled' : 'Payment pending'}
                </em>
              </div>
            </div>

            {unlocked ? (
              <div className="sd-learn-body">
                <section>
                  <h2>
                    <span>01</span>
                    Overview
                  </h2>
                  <p>{course?.overview || active.title}</p>
                </section>
                <section>
                  <h2>
                    <span>02</span>
                    CMI learning platform
                  </h2>
                  <p>
                    After enrolment, the academy will register you with CMI and
                    send your login details. You will then access your course
                    materials on the CMI platform.
                  </p>
                </section>
                <section>
                  <h2>
                    <span>03</span>
                    What happens next
                  </h2>
                  <p>
                    Keep this enrolment on your dashboard. We will be in touch
                    with your CMI access details. Extra study resources can be
                    added here later.
                  </p>
                </section>
              </div>
            ) : (
              <div className="sd-lock">
                <p>Finish payment to unlock this course content.</p>
                <Link to="/checkout" className="sd-btn">
                  Complete payment
                </Link>
              </div>
            )}
          </article>
        ) : null}

        {view === 'profile' ? (
          <section className="sd-card sd-profile">
            <div className="sd-id">
              <span>{(user?.name || 'S').charAt(0).toUpperCase()}</span>
              <div>
                <small>Account</small>
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
              </div>
            </div>
            <form onSubmit={saveProfile}>
              <label>
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </label>
              <PasswordField
                className="sd-pass"
                label="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                autoComplete="new-password"
              />
              {error ? <p className="sd-error">{error}</p> : null}
              {message ? <p className="sd-ok">{message}</p> : null}
              <button type="submit" className="sd-btn" disabled={saving}>
                {saving ? 'Saving…' : 'Save profile'}
              </button>
            </form>
          </section>
        ) : null}
      </div>
    </div>
  )
}
