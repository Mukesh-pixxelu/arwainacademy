import { Link } from 'react-router-dom'
import { courses, formatPrice } from '../data/courses.js'
import './Courses.css'

export default function Courses() {
  return (
    <main className="page">
      <h1>Courses</h1>
      <p>Choose your starting point. Qualifications and 1-to-1 coaching.</p>

      <div className="course-grid">
        {courses.map((course) => (
          <article key={course.slug} className="course-card">
            <span className="tag">{course.category}</span>
            <h2>{course.title}</h2>
            <p>{course.excerpt}</p>
            <p className="price">
              {course.oldPrice ? (
                <s>£{course.oldPrice}</s>
              ) : null}{' '}
              {formatPrice(course.price)}
            </p>
            <Link to={'/courses/' + course.slug} className="btn">
              View course
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}