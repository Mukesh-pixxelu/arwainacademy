import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import { courseImage, formatPrice } from '../data/courses.js'
import { useCourses } from '../courses/CourseContext.jsx'
import PageBanner from '../components/PageBanner.jsx'
import './Courses.css'

const preferredFilters = ['Level 3', 'Level 5', 'Level 7', 'Coaching']

export default function Courses() {
  const { courses, loading } = useCourses()
  const [filter, setFilter] = useState('All')
  const filters = useMemo(() => {
    const cats = [...new Set(courses.map((course) => course.category).filter(Boolean))]
    cats.sort((a, b) => {
      const ia = preferredFilters.indexOf(a)
      const ib = preferredFilters.indexOf(b)
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
    return ['All', ...cats]
  }, [courses])

  const list =
    filter === 'All'
      ? courses
      : courses.filter((course) => course.category === filter)

  useEffect(() => {
    if (!filters.includes(filter)) setFilter('All')
  }, [filter, filters])

  useEffect(() => {
    const timer = window.setTimeout(() => AOS.refresh(), 40)
    return () => window.clearTimeout(timer)
  }, [filter, list.length])

  return (
    <main>
      <PageBanner
        title="Courses"
        text="Choose your starting point. Recognised CMI Level 3, Level 5 and Level 7 qualifications."
        image="/images/qualifications.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Courses' },
        ]}
      />

      <div className="page">
        <nav className="pathway" aria-label="Course pathways" data-aos="fade-up">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-current={filter === item ? 'true' : undefined}
              className={filter === item ? 'pathway-item is-on' : 'pathway-item'}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {loading && courses.length === 0 ? (
          <p className="course-status">Loading courses…</p>
        ) : list.length === 0 ? (
          <p className="course-status">No courses in this pathway yet.</p>
        ) : null}

        <div className="course-grid">
          {list.map((course, index) => (
            <Link
              key={course.slug}
              to={'/courses/' + course.slug}
              className="course-card"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
            >
              <div className="course-card-media">
                <span className="course-card-frame" aria-hidden="true" />
                <img className="course-card-img" src={courseImage(course)} alt="" />
              </div>
              <div className="course-card-body">
                <span className="tag">{course.category}</span>
                <h2>{course.title}</h2>
                <p>{course.excerpt}</p>
                <div className="course-card-foot">
                  <p className="price">
                    {course.oldPrice ? <s>£{course.oldPrice}</s> : null}
                    {formatPrice(course.price)}
                  </p>
                  <span className="btn">View course</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
