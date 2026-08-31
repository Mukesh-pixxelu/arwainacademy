import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { useCart } from '../cart/CartContext.jsx'
import { courseImage, formatPrice } from '../data/courses.js'
import { useCourses } from '../courses/CourseContext.jsx'
import './Cart.css'

export default function Cart() {
  const { items, removeItem, total } = useCart()
  const { getCourse } = useCourses()
  const { user } = useAuth()
  const checkoutTo = user ? '/checkout' : '/user/login'
  const checkoutState = user ? undefined : { from: '/checkout' }
  const countLabel =
    items.length === 1 ? '1 course selected' : `${items.length} courses selected`

  return (
    <main className="cart-sheet">
      <section className="cart-hero" data-aos="fade-in">
        <div className="wrap">
          <p className="eyebrow">Checkout</p>
          <h1>Your basket</h1>
          <p>{items.length === 0 ? 'No courses added yet.' : countLabel}</p>
        </div>
      </section>

      <div className="wrap cart-layout">
        {items.length === 0 ? (
          <div className="cart-empty" data-aos="fade-up">
            <p>Your basket is empty. Choose a course to get started.</p>
            <Link to="/courses" className="btn">
              Browse courses
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item, index) => {
                const course = getCourse(item.slug)
                return (
                  <li
                    key={item.slug}
                    className="cart-item"
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                  >
                    <img src={courseImage(item)} alt="" />
                    <div className="cart-item-copy">
                      {course?.category ? <span>{course.category}</span> : null}
                      <Link to={'/courses/' + item.slug}>{item.title}</Link>
                    </div>
                    <strong>{formatPrice(item.price)}</strong>
                    <button type="button" onClick={() => removeItem(item.slug)}>
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>

            <aside className="cart-summary" data-aos="fade-up">
              <p className="eyebrow">Order summary</p>
              <h2>Ready to enrol</h2>
              <ul>
                <li>
                  <span>Courses</span>
                  <strong>{items.length}</strong>
                </li>
                <li>
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </li>
              </ul>
              <Link to={checkoutTo} className="btn" state={checkoutState}>
                Continue to checkout
              </Link>
              <Link to="/courses" className="cart-keep">
                Keep shopping
              </Link>
            </aside>
          </>
        )}
      </div>
    </main>
  )
}
