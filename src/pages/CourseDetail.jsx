import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../cart/CartContext.jsx'
import { useCourses } from '../courses/CourseContext.jsx'
import { formatPrice, courseImage } from '../data/courses.js'
import './CourseDetail.css'

export default function CourseDetail() {
  const { slug } = useParams()
  const { courses, getCourse, loading } = useCourses()
  const course = getCourse(slug)
  const { addItem, items } = useCart()
  const navigate = useNavigate()

  if (!course && loading) {
    return (
      <main className="page">
        <h1>Loading course…</h1>
      </main>
    )
  }

  if (!course) {
    return (
      <main className="page">
        <h1>Course not found</h1>
        <Link to="/courses">Back to courses</Link>
      </main>
    )
  }

  const inCart = items.some((item) => item.slug === course.slug)
  const monthly3 = course.price > 0 ? Math.ceil(course.price / 3) : 0
  const monthly6 = course.price > 0 ? Math.ceil(course.price / 6) : 0
  const monthly12 = course.price > 0 ? Math.ceil(course.price / 12) : 0
  const monthly24 = course.price > 0 ? Math.ceil(course.price / 24) : 0
  const mark = String(courses.findIndex((item) => item.slug === course.slug) + 1).padStart(2, '0')

  const related = [
    ...courses.filter((item) => item.slug !== course.slug && item.category === course.category),
    ...courses.filter((item) => item.slug !== course.slug && item.category !== course.category),
  ].slice(0, 3)

  function addToCart() {
    addItem(course)
    navigate('/cart')
  }

  return (
    <main className="course-sheet">
      <div className="course-crumb-bar">
        <div className="wrap">
          <nav className="course-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true" />
            <Link to="/courses">Courses</Link>
            <span aria-hidden="true" />
            <em>{course.title}</em>
          </nav>
        </div>
      </div>

      <div className="course-spread">
        <figure className="course-portrait">
          <img src={courseImage(course)} alt="" />
          <span className="course-mark" aria-hidden="true">
            {mark}
          </span>
        </figure>

        <div className="course-editorial">
          <div className="course-editorial-copy" data-aos="fade-down">
            <p className="eyebrow">{course.category}</p>
            <h1>{course.title}</h1>
            <p className="lead">{course.excerpt}</p>
            <p className="course-meta">
              {course.duration ? (
                <>
                  {course.duration}
                  <i />
                </>
              ) : null}
              {course.category}
              <i />
              {course.price === 0 ? 'Free to book' : 'Interest-free plans'}
            </p>
          </div>

          <aside className="course-ticket" data-aos="fade-up">
            <div className="course-fare">
              {course.oldPrice ? <p className="old">Was £{course.oldPrice}</p> : null}
              <p className="price">{formatPrice(course.price)}</p>
            </div>
            <div className="course-action">
              {monthly24 > 0 ? (
                <p className="monthly">From £{monthly24}/month, interest-free</p>
              ) : (
                <p className="monthly">Book a free call with the academy</p>
              )}

              {course.price === 0 ? (
                <Link to="/contact" className="btn">
                  Enquire now
                </Link>
              ) : inCart ? (
                <Link to="/cart" className="btn">
                  In basket
                </Link>
              ) : (
                <button type="button" className="btn" onClick={addToCart}>
                  Add to Basket
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>

      <section className="course-band">
        <div className="wrap course-body">
          <article className="course-copy" data-aos="fade-up">
            {(course.sections || []).map((section, index) => (
              <section key={section.title}>
                <h2>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {section.details?.length ? (
                  <dl className="course-facts">
                    {section.details.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items?.length ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.after?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>

          <aside className="course-plans" data-aos="fade-up">
            <p className="eyebrow">Pay your way</p>
            <h2>Payment options</h2>
            <ul>
              <li>
                <strong>Pay in full</strong>
                <span>{formatPrice(course.price)}</span>
              </li>
              {course.price > 0 ? (
                <>
                  <li>
                    <strong>3 months</strong>
                    <span>£{monthly3}/month</span>
                  </li>
                  <li>
                    <strong>6 months</strong>
                    <span>£{monthly6}/month</span>
                  </li>
                  <li>
                    <strong>12 months</strong>
                    <span>£{monthly12}/month</span>
                  </li>
                  <li>
                    <strong>24 months</strong>
                    <span>£{monthly24}/month</span>
                  </li>
                </>
              ) : (
                <li>
                  <strong>Free</strong>
                  <span>No payment needed</span>
                </li>
              )}
            </ul>
          </aside>
        </div>
      </section>

      <div className="wrap">
        {related.length > 0 ? (
          <section className="course-related" data-aos="fade-up">
            <div className="course-related-head">
              <p className="eyebrow">Keep exploring</p>
              <h2>Related courses</h2>
            </div>
            <div className="course-related-list">
              {related.map((item, i) => (
                <Link key={item.slug} to={'/courses/' + item.slug} className="course-related-row">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <img src={courseImage(item)} alt="" />
                  <div>
                    <em>{item.category}</em>
                    <h3>{item.title}</h3>
                  </div>
                  <strong>{formatPrice(item.price)}</strong>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
