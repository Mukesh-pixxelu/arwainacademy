import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { useCart } from '../cart/CartContext.jsx'
import { courseImage, formatPrice } from '../data/courses.js'
import { useCourses } from '../courses/CourseContext.jsx'
import { apiRequest } from '../utils/api.js'
import './Checkout.css'

function checkoutReturnUrl() {
  const base = String(import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${window.location.origin}${base}/checkout`
}

function WalletArt() {
  return (
    <svg className="checkout-art" viewBox="0 0 180 120" aria-hidden="true">
      <rect x="18" y="38" width="108" height="70" rx="14" fill="#0e1442" />
      <rect x="18" y="38" width="108" height="18" rx="6" fill="#1a2460" />
      <rect x="48" y="22" width="92" height="56" rx="10" fill="#e2c44a" transform="rotate(-12 94 50)" />
      <rect x="56" y="30" width="76" height="40" rx="8" fill="#fff" transform="rotate(-12 94 50)" />
      <rect x="64" y="48" width="28" height="8" rx="2" fill="#0e1442" transform="rotate(-12 94 50)" />
      <circle cx="148" cy="36" r="26" fill="#e2c44a" />
      <path
        d="M148 22c-8 0-14 6-14 14 0 10 14 20 14 20s14-10 14-20c0-8-6-14-14-14zm-1 20-6-6 2-2 4 4 8-8 2 2-10 10z"
        fill="#0e1442"
      />
    </svg>
  )
}

function Board({ children, className = '' }) {
  return (
    <main className="checkout-sheet">
      <div className="wrap">
        <div className={'checkout-board' + (className ? ' ' + className : '')}>{children}</div>
      </div>
    </main>
  )
}

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { getCourse } = useCourses()
  const { user, token, ready } = useAuth()
  const location = useLocation()
  const handledReturn = useRef(false)
  const [phone, setPhone] = useState(user?.phone || '')
  const [plan, setPlan] = useState('full')
  const [method, setMethod] = useState('stripe')
  const [gateways, setGateways] = useState({ stripe: false, paypal: false })
  const [payment, setPayment] = useState(null)
  const [sending, setSending] = useState(false)
  const [settling, setSettling] = useState(false)
  const [error, setError] = useState('')

  const months = plan === 'full' ? 1 : Number(plan)
  const perMonth = months === 1 ? total : Math.ceil(total / months)
  const awaiting = payment?.status === 'pending'
  const done = payment?.status === 'successful'
  const methodLabel = payment?.method_label || (method === 'paypal' ? 'PayPal' : 'Stripe')
  const payLabel = plan === 'full' ? formatPrice(total) : '£' + perMonth + ' / month'
  const savings = items.reduce((sum, item) => {
    const course = getCourse(item.slug)
    if (course?.oldPrice && course.oldPrice > item.price) {
      return sum + (course.oldPrice - item.price)
    }
    return sum
  }, 0)
  const subtotal = total + savings
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const returning = Boolean(params.get('session_id') || params.get('paypal') || params.get('canceled'))

  useEffect(() => {
    apiRequest('/api/checkout-config')
      .then((data) => {
        const next = {
          stripe: Boolean(data.stripe),
          paypal: Boolean(data.paypal),
        }
        setGateways(next)
        if (!next.stripe && next.paypal) setMethod('paypal')
        if (next.stripe && !next.paypal) setMethod('stripe')
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (user?.phone) {
      setPhone((current) => current || user.phone)
    }
  }, [user])

  useEffect(() => {
    if (!ready || !token || handledReturn.current) return

    const sessionId = params.get('session_id')
    const paymentId = params.get('payment')
    const paypal = params.get('paypal')
    const canceled = params.get('canceled')

    if (canceled) {
      handledReturn.current = true
      setError('Payment was cancelled. You can try again when you are ready.')
      window.history.replaceState({}, '', checkoutReturnUrl())
      return
    }

    if (!paymentId) return

    handledReturn.current = true
    setSettling(true)
    setError('')

    const body = sessionId
      ? apiRequest(`/api/purchases/${paymentId}/verify`, {
          method: 'POST',
          token,
          body: { session_id: sessionId },
        })
      : paypal
        ? apiRequest(`/api/purchases/${paymentId}/paypal-return`, {
            method: 'POST',
            token,
            body: {
              tx: params.get('tx'),
              st: params.get('st'),
              amt: params.get('amt'),
            },
          })
        : apiRequest(`/api/purchases/${paymentId}`, { token })

    body
      .then((data) => {
        const next = data.payment
        setPayment(next)
        if (next?.status === 'successful') clearCart()
        window.history.replaceState({}, '', checkoutReturnUrl())
      })
      .catch((err) => {
        setError(err.message || 'Payment could not be confirmed yet.')
        window.history.replaceState({}, '', checkoutReturnUrl())
      })
      .finally(() => setSettling(false))
  }, [ready, token, params, clearCart])

  if (ready && !user) {
    return <Navigate to="/user/login" replace state={{ from: location.pathname }} />
  }

  async function startPay(nextPayment) {
    if (!nextPayment?.id) return
    if (nextPayment.status === 'successful') {
      setPayment(nextPayment)
      clearCart()
      return
    }

    const data = await apiRequest(`/api/purchases/${nextPayment.id}/pay`, {
      method: 'POST',
      token,
      body: { return_url: checkoutReturnUrl() },
    })

    if (data.redirect_url) {
      window.location.assign(data.redirect_url)
      return
    }

    setPayment(data.payment)
    if (data.payment?.status === 'successful') clearCart()
  }

  async function placeOrder(e) {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const data = await apiRequest('/api/purchases', {
        method: 'POST',
        token,
        body: {
          phone,
          method,
          plan,
          items: items.map((item) => ({
            title: item.title,
            slug: item.slug,
            price: item.price,
          })),
          return_url: checkoutReturnUrl(),
        },
      })

      const next = data.payment
      setPayment(next)

      if (data.redirect_url) {
        window.location.assign(data.redirect_url)
        return
      }

      if (next?.status === 'successful') {
        clearCart()
      }
    } catch (err) {
      setError(err.message || 'Could not start payment. Please try again.')
    } finally {
      setSending(false)
    }
  }

  async function continuePayment() {
    if (!payment?.id) return
    setSending(true)
    setError('')
    try {
      await startPay(payment)
    } catch (err) {
      setError(err.message || 'Could not open PayPal or Stripe. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (!ready || settling) {
    return (
      <Board>
        <div className="checkout-head">
          <div>
            <p className="eyebrow">Payment</p>
            <h1>{settling ? 'Confirming payment' : 'Checkout'}</h1>
            <p>{settling ? 'Checking Stripe / PayPal…' : 'Checking your login…'}</p>
          </div>
        </div>
      </Board>
    )
  }

  if (items.length === 0 && !done && !awaiting && !returning) {
    return (
      <Board>
        <div className="checkout-head">
          <div>
            <p className="eyebrow">Payment</p>
            <h1>Checkout</h1>
            <p>Your basket is empty.</p>
          </div>
        </div>
        <Link to="/courses" className="btn">
          Browse courses
        </Link>
      </Board>
    )
  }

  if (done) {
    return (
      <Board>
        <div className="checkout-head">
          <div>
            <p className="eyebrow">Done</p>
            <h1>Payment successful</h1>
            <p>
              {payment.courses?.join(', ') || 'Your course'} is confirmed via {methodLabel}.
              The academy has been notified.
            </p>
          </div>
          <WalletArt />
        </div>
        <Link to="/dashboard" className="btn">
          Go to dashboard
        </Link>
      </Board>
    )
  }

  if (awaiting) {
    return (
      <Board className="is-pending">
        <div className="checkout-pending">
          <div className="checkout-pending-copy" data-aos="fade-down">
            <p className="eyebrow">Checkout</p>
            <h1>Complete payment</h1>
            <p>Finish on {methodLabel} to unlock your course. You will come back here afterwards.</p>
            <span className="checkout-status">Pending</span>
            <div className="checkout-receipt">
              <em>Pay with {methodLabel}</em>
              <strong>{(payment.courses || []).join(', ') || 'Your course'}</strong>
              <b>{formatPrice(payment.amount)}</b>
            </div>
            {error ? <p className="error">{error}</p> : null}
            <button type="button" className="checkout-cta" disabled={sending} onClick={continuePayment}>
              {sending ? 'Opening…' : `Continue to ${methodLabel}`}
            </button>
          </div>
          <div data-aos="fade-up">
            <WalletArt />
          </div>
        </div>
      </Board>
    )
  }

  const noGateway = !gateways.stripe && !gateways.paypal

  return (
    <Board>
      <div className="checkout-head">
        <div data-aos="fade-down">
          <p className="eyebrow">Payment</p>
          <h1>Checkout</h1>
          <p>Signed in as {user.name}. Choose a plan, then pay with Stripe or PayPal.</p>
        </div>
        <WalletArt />
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder} data-aos="fade-down">
          <section>
            <h2>
              <span>01</span>
              Your details
            </h2>
            <label className="field">
              Full name
              <input value={user.name} readOnly />
            </label>
            <label className="field">
              Email
              <input type="email" value={user.email} readOnly />
            </label>
            <label className="field">
              Phone (optional)
              <input
                value={phone}
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </section>

          <section>
            <h2>
              <span>02</span>
              Choose your plan
            </h2>
            <div className="checkout-picks">
              {[
                { value: 'full', label: 'Pay in full', note: formatPrice(total) },
                { value: '3', label: '3 months', note: '£' + Math.ceil(total / 3) + '/mo' },
                { value: '6', label: '6 months', note: '£' + Math.ceil(total / 6) + '/mo' },
                { value: '12', label: '12 months', note: '£' + Math.ceil(total / 12) + '/mo' },
                { value: '24', label: '24 months', note: '£' + Math.ceil(total / 24) + '/mo' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={plan === option.value ? 'checkout-pick is-on' : 'checkout-pick'}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={option.value}
                    checked={plan === option.value}
                    onChange={(e) => setPlan(e.target.value)}
                  />
                  <em>{option.label}</em>
                  <strong>{option.note}</strong>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2>
              <span>03</span>
              Payment method
            </h2>
            <div className="checkout-picks checkout-picks-2">
              <label
                className={
                  'checkout-pick' +
                  (method === 'stripe' ? ' is-on' : '') +
                  (!gateways.stripe ? ' is-off' : '')
                }
              >
                <input
                  type="radio"
                  name="method"
                  value="stripe"
                  checked={method === 'stripe'}
                  disabled={!gateways.stripe}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <em>Card</em>
                <strong>Stripe</strong>
                {!gateways.stripe ? <small>Not set up</small> : <small>Visa, Mastercard</small>}
              </label>
              <label
                className={
                  'checkout-pick' +
                  (method === 'paypal' ? ' is-on' : '') +
                  (!gateways.paypal ? ' is-off' : '')
                }
              >
                <input
                  type="radio"
                  name="method"
                  value="paypal"
                  checked={method === 'paypal'}
                  disabled={!gateways.paypal}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <em>PayPal</em>
                <strong>Wallet</strong>
                {!gateways.paypal ? <small>Not set up</small> : <small>PayPal checkout</small>}
              </label>
            </div>
          </section>

          {noGateway ? (
            <p className="error">
              Payments are not configured yet. Add Stripe keys or a PayPal email in the admin Payment setup
              page.
            </p>
          ) : null}
          {error ? <p className="error">{error}</p> : null}

          <button type="submit" className="checkout-cta" disabled={sending || noGateway}>
            {sending ? 'Opening payment…' : `Pay ${payLabel} with ${method === 'stripe' ? 'Stripe' : 'PayPal'}`}
          </button>
          <p className="checkout-ssl">You will be redirected to Stripe or PayPal to finish securely.</p>
        </form>

        <div className="checkout-side">
          <aside className="checkout-summary">
            <p className="eyebrow">Your order</p>
            <h2>Summary</h2>
            <ul className="checkout-items">
              {items.map((item) => (
                <li key={item.slug}>
                  <img src={courseImage(item)} alt="" />
                  <span>{item.title}</span>
                  <strong>{formatPrice(item.price)}</strong>
                </li>
              ))}
            </ul>
            <p className="checkout-due">
              <strong>{payLabel}</strong>
              <em>via {method === 'stripe' ? 'Stripe' : 'PayPal'}</em>
              <b>Secure</b>
            </p>
            <dl className="checkout-break">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Discount</dt>
                <dd>{savings > 0 ? '− ' + formatPrice(savings) : '£0'}</dd>
              </div>
              <div>
                <dt>Due now</dt>
                <dd>{payLabel}</dd>
              </div>
            </dl>
            <p className="checkout-guarantee">
              30-day money-back guarantee. Not satisfied? Get a full refund within 30 days.
            </p>
            <Link to="/cart" className="checkout-edit">
              ← Edit basket
            </Link>
          </aside>
          <ul className="checkout-trust">
            <li>Secure checkout</li>
            <li>Encrypted payment</li>
            <li>Trusted platform</li>
          </ul>
        </div>
      </div>
    </Board>
  )
}
