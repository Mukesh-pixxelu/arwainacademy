import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  courses as localCourses,
  listedCourseSlugs,
  findCourse as findInList,
  getCourse as getFromList,
  hydrateFromApi,
} from '../data/courses.js'
import { apiRequest } from '../utils/api.js'

const CourseContext = createContext(null)

export function CourseProvider({ children }) {
  const [catalog, setCatalog] = useState(localCourses)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    apiRequest('/api/courses')
      .then((data) => {
        if (cancelled) return
        const rows = Array.isArray(data.courses) ? data.courses : []
        if (rows.length) {
          const allowed = new Set(listedCourseSlugs)
          setCatalog(rows.map(hydrateFromApi).filter((course) => allowed.has(course.slug)))
        }
      })
      .catch(() => {
        // Keep the local catalogue if the API is unavailable.
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({
      courses: catalog,
      loading,
      getCourse: (slug) => getFromList(slug, catalog) || getFromList(slug, localCourses),
      findCourse: (item) => findInList(item, catalog) || findInList(item, localCourses),
    }),
    [catalog, loading],
  )

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
}

export function useCourses() {
  const ctx = useContext(CourseContext)
  if (!ctx) {
    throw new Error('useCourses must be used within CourseProvider')
  }
  return ctx
}
