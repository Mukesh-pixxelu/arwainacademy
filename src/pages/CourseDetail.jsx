import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../cart/CartContext.jsx'
import { courses, getCourse, formatPrice } from '../data/courses.js'
import './CourseDetail.css'

export default function CourseDetail() {
  const { slug } = useParams()
  const course = getCourse(slug)
  const { addItem, items } = useCart()
  const navigate = useNavigate()

  if (!course) {
    return (
      <main className="page">
        <h1>Course not found</h1>
        <Link to="/courses">Back to courses</Link>
      </main>
    )
  }

  const inCart = items.some((item) => item.slug === course.slug)

  function addToCart() {
    addItem(course)
    navigate('/cart')
  }

  const monthly3 = course.price > 0 ? Math.ceil(course.price / 3) : 0
  const monthly6 = course.price > 0 ? Math.ceil(course.price / 6) : 0
  const monthly12 = course.price > 0 ? Math.ceil(course.price / 12) : 0

  const related = courses
    .filter((item) => item.slug !== course.slug && item.category === course.category)
    .slice(0, 3)

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{course.category}</p>
          <h1>{course.title}</h1>
          <p>{course.excerpt}</p>
        </div>
      </section>

      <div className="page course-layout">
        <article className="course-copy">
          <img className="course-photo" src={course.image} alt="" />
          <h2>Overview</h2>
          <p>{course.overview}</p>

          <h2>Duration</h2>
          <p>{course.duration}</p>

          <h2>Entry requirements</h2>
          <p>
            No formal qualifications required. You should be comfortable
            studying in English and ready to apply learning at work.
          </p>

          <h2>Payment options</h2>
          <ul className="pay-list">
            <li>Pay in full — {formatPrice(course.price)}</li>
            {course.price > 0 ? (
              <>
                <li>3 months — £{monthly3}/month</li>
                <li>6 months — £{monthly6}/month</li>
                <li>12 months — £{monthly12}/month</li>
              </>
            ) : (
              <li>Free to book</li>
            )}
          </ul>

          <h2>Related courses</h2>
          <ul className="related">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={'/courses/' + item.slug}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </article>

        <aside className="price-box">
          {course.oldPrice ? <p className="old">Was £{course.oldPrice}</p> : null}
          <p className="price">{formatPrice(course.price)}</p>
          {monthly12 > 0 ? (
            <p className="monthly">From £{monthly12}/month, interest-free</p>
          ) : null}
          {course.price === 0 ? (
            <Link to="/contact" className="btn">
              Enquire now
            </Link>
          ) : inCart ? (
            <Link to="/cart" className="btn">
              In cart
            </Link>
          ) : (
            <button type="button" className="btn" onClick={addToCart}>
              Add to cart
            </button>
          )}
          <Link to="/courses" className="back">
            ← All courses
          </Link>
        </aside>
      </div>
    </main>
  )
}
