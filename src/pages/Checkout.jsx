import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/CartContext.jsx'
import { courseImage, formatPrice } from '../data/courses.js'
import './Checkout.css'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [plan, setPlan] = useState('full')
  const [method, setMethod] = useState('stripe')
  const [done, setDone] = useState(false)

  const months = plan === 'full' ? 1 : Number(plan)
  const perMonth = months === 1 ? total : Math.ceil(total / months)

  function placeOrder(e) {
    e.preventDefault()
    console.log('Order:', {
      name,
      email,
      phone,
      method,
      items,
      plan,
      total,
      perMonth,
    })
    clearCart()
    setDone(true)
  }

  if (items.length === 0 && !done) {
    return (
      <main className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/courses" className="btn">
          Browse courses
        </Link>
      </main>
    )
  }

  if (done) {
    return (
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Done</p>
            <h1>Thank you</h1>
            <p>Your order is recorded. Live Stripe / PayPal will be connected next.</p>
          </div>
        </section>
        <div className="page">
          <Link to="/courses" className="btn">
            Back to courses
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Payment</p>
          <h1>Checkout</h1>
          <p>Your details on the left. Order summary on the right.</p>
        </div>
      </section>

      <div className="page checkout-layout">
        <form className="card checkout-form" onSubmit={placeOrder}>
          <h2>Your details</h2>

          <label className="field">
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="field">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field">
            Phone (optional)
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <h2>Payment plan</h2>

          <label className="choice">
            <input
              type="radio"
              name="plan"
              value="full"
              checked={plan === 'full'}
              onChange={(e) => setPlan(e.target.value)}
            />
            Pay in full — {formatPrice(total)}
          </label>

          <label className="choice">
            <input
              type="radio"
              name="plan"
              value="3"
              checked={plan === '3'}
              onChange={(e) => setPlan(e.target.value)}
            />
            3 months — £{Math.ceil(total / 3)}/month
          </label>

          <label className="choice">
            <input
              type="radio"
              name="plan"
              value="6"
              checked={plan === '6'}
              onChange={(e) => setPlan(e.target.value)}
            />
            6 months — £{Math.ceil(total / 6)}/month
          </label>

          <label className="choice">
            <input
              type="radio"
              name="plan"
              value="12"
              checked={plan === '12'}
              onChange={(e) => setPlan(e.target.value)}
            />
            12 months — £{Math.ceil(total / 12)}/month
          </label>

          <h2>Pay with</h2>

          <label className="choice">
            <input
              type="radio"
              name="method"
              value="stripe"
              checked={method === 'stripe'}
              onChange={(e) => setMethod(e.target.value)}
            />
            Stripe (card)
          </label>

          <label className="choice">
            <input
              type="radio"
              name="method"
              value="paypal"
              checked={method === 'paypal'}
              onChange={(e) => setMethod(e.target.value)}
            />
            PayPal
          </label>

          <p className="checkout-pay">
            You pay:{' '}
            {plan === 'full'
              ? formatPrice(total)
              : '£' + perMonth + ' / month'}{' '}
            via {method === 'stripe' ? 'Stripe' : 'PayPal'}
          </p>

          <button type="submit" className="btn">
            Place order
          </button>
        </form>

        <aside className="card checkout-summary">
          <h2>Your cart</h2>
          <ul className="checkout-items">
            {items.map((item) => (
              <li key={item.slug}>
                <img src={courseImage(item)} alt="" />
                <span>{item.title}</span>
                <strong>{formatPrice(item.price)}</strong>
              </li>
            ))}
          </ul>
          <p className="checkout-pay">Total: {formatPrice(total)}</p>
          <Link to="/cart" className="back">
            ← Edit cart
          </Link>
        </aside>
      </div>
    </main>
  )
}
