import { useState } from 'react'
import { Link } from 'react-router-dom'
import { courses, formatPrice } from '../data/courses.js'
import './Courses.css'

const filters = ['All', 'Level 3', 'Level 5', 'Coaching']

export default function Courses() {
  const [filter, setFilter] = useState('All')

  const list =
    filter === 'All'
      ? courses
      : courses.filter((course) => course.category === filter)

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Training</p>
          <h1>Courses</h1>
          <p>Choose your starting point — qualifications and 1-to-1 coaching.</p>
        </div>
      </section>

      <div className="page">
        <div className="filters">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? 'filter active' : 'filter'}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="course-grid">
          {list.map((course) => (
            <article key={course.slug} className="course-card">
              <img
                className="course-card-img"
                src={course.image}
                alt=""
              />
              <div className="course-card-body">
                <span className="tag">{course.category}</span>
                <h2>{course.title}</h2>
                <p>{course.excerpt}</p>
                <p className="price">
                  {course.oldPrice ? <s>£{course.oldPrice}</s> : null}{' '}
                  {formatPrice(course.price)}
                </p>
                <Link to={'/courses/' + course.slug} className="btn">
                  View course
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}