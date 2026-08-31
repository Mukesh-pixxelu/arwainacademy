import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../utils/api.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'arwain-auth'

function loadAuth() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { user: null, token: null }
  } catch {
    return { user: null, token: null }
  }
}

export function AuthProvider({ children }) {
  const [{ user, token }, setAuth] = useState(loadAuth)
  const [ready, setReady] = useState(!loadAuth().token)

  function persist(next) {
    setAuth(next)
    if (next.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  useEffect(() => {
    if (!token) {
      setReady(true)
      return
    }

    apiRequest('/api/me', { token })
      .then((data) => persist({ user: data.user, token }))
      .catch((err) => {
        if (err.status === 401) {
          persist({ user: null, token: null })
        }
      })
      .finally(() => setReady(true))
  }, [token])

  async function login(email, password) {
    const data = await apiRequest('/api/login', {
      method: 'POST',
      body: { email, password },
    })
    persist({ user: data.user, token: data.token })
    return data.user
  }

  async function register(name, email, phone, password) {
    const data = await apiRequest('/api/register', {
      method: 'POST',
      body: { name, email, phone, password },
    })
    persist({ user: data.user, token: data.token })
    return data.user
  }

  async function logout() {
    try {
      if (token) await apiRequest('/api/logout', { method: 'POST', token })
    } catch {
      // still clear local session
    }
    persist({ user: null, token: null })
  }

  async function updateProfile(payload) {
    const data = await apiRequest('/api/profile', {
      method: 'PATCH',
      token,
      body: payload,
    })
    persist({ user: data.user, token })
    return data.user
  }

  const value = useMemo(
    () => ({ user, token, ready, login, register, logout, updateProfile }),
    [user, token, ready],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth must be inside AuthProvider')
  return auth
}
